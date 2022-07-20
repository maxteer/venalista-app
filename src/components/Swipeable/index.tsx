import React, {Component, ReactNode} from 'react';
import {Animated, LayoutChangeEvent, View} from 'react-native';
import {
  GestureEvent,
  HandlerStateChangeEvent,
  HandlerStateChangeEventPayload,
  PanGestureHandler,
  PanGestureHandlerProps,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

import {LeftAction, RightAction, Container} from './styles';

const DRAG_TOSS = 0.05;

type SwipeableExcludes = Exclude<
  keyof PanGestureHandlerProps,
  'onGestureEvent' | 'onHandlerStateChange'
>;

interface SwipeableProps
  extends Pick<PanGestureHandlerProps, SwipeableExcludes> {
  friction?: number;
  leftThreshold?: number;
  rightThreshold?: number;

  renderLeftActions?(
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ): ReactNode;
  renderRightActions?(
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ): ReactNode;

  onSwipeableStart?(): void;

  onSwipeableWillOpen?(): void;
  onSwipeableLeftWillOpen?(): void;
  onSwipeableRightWillOpen?(): void;

  onSwipeableOpen?(): void;
  onSwipeableLeftOpen?(): void;
  onSwipeableRightOpen?(): void;

  onSwipeableWillClose?(): void;

  onSwipeableClose?(): void;
  onSwipeableLeftClose?(): void;
  onSwipeableRightClose?(): void;

  enableTrackpadTwoFingerGesture?: boolean;
}

interface SwipeableState {
  dragX: Animated.Value;
  rowTranslation: Animated.Value;
  rowState: number;
  leftWidth?: number;
  rightOffset?: number;
  rowWidth?: number;
}

class Swipeable extends Component<SwipeableProps, SwipeableState> {
  static defaultProps = {
    friction: 1,
  };

  constructor(props: SwipeableProps) {
    super(props);
    const dragX = new Animated.Value(0);
    this.state = {
      dragX,
      rowTranslation: new Animated.Value(0),
      rowState: 0,
    };
    this.updateAnimatedEvent(props, this.state);

    this.onGestureEvent = Animated.event(
      [{nativeEvent: {translationX: dragX}}],
      {useNativeDriver: true},
    );
  }

  UNSAFE_componentWillUpdate(props: SwipeableProps, state: SwipeableState) {
    if (
      this.props.friction !== props.friction ||
      this.state.leftWidth !== state.leftWidth ||
      this.state.rightOffset !== state.rightOffset ||
      this.state.rowWidth !== state.rowWidth
    ) {
      this.updateAnimatedEvent(props, state);
    }
  }

  private onGestureEvent?: (
    event: GestureEvent<PanGestureHandlerEventPayload>,
  ) => void;
  private transX?: Animated.AnimatedInterpolation;
  private showLeftAction?: Animated.AnimatedInterpolation | Animated.Value;
  private leftActionTranslate?: Animated.AnimatedInterpolation;
  private showRightAction?: Animated.AnimatedInterpolation | Animated.Value;
  private rightActionTranslate?: Animated.AnimatedInterpolation;

  private updateAnimatedEvent = (
    props: SwipeableProps,
    state: SwipeableState,
  ) => {
    const {friction} = props;
    const {dragX, rowTranslation, leftWidth = 0, rowWidth = 0} = state;
    const {rightOffset = rowWidth} = state;
    const rightWidth = Math.max(0, rowWidth - rightOffset);

    const transX = Animated.add(
      rowTranslation,
      dragX.interpolate({
        inputRange: [0, friction!],
        outputRange: [0, 1],
      }),
    ).interpolate({
      inputRange: [-rightWidth - 1, -rightWidth, leftWidth, leftWidth + 1],
      outputRange: [
        this.props.renderRightActions ? -rightWidth - 1 : -0,
        -rightWidth,
        this.props.renderLeftActions ? leftWidth : 0,
        leftWidth + 1,
      ],
    });
    this.transX = transX;
    this.showLeftAction =
      leftWidth > 0
        ? transX.interpolate({
            inputRange: [-1, 0, leftWidth],
            outputRange: [0, 0, 1],
          })
        : new Animated.Value(0);
    this.leftActionTranslate = this.showLeftAction.interpolate({
      inputRange: [0, Number.MIN_VALUE],
      outputRange: [-10000, 0],
      extrapolate: 'clamp',
    });
    this.showRightAction =
      rightWidth > 0
        ? transX.interpolate({
            inputRange: [-rightWidth, 0, 1],
            outputRange: [1, 0, 0],
          })
        : new Animated.Value(0);
    this.rightActionTranslate = this.showRightAction.interpolate({
      inputRange: [0, Number.MIN_VALUE],
      outputRange: [-10000, 0],
      extrapolate: 'clamp',
    });
  };

  private onHandlerStateChange = ({
    nativeEvent,
  }: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (nativeEvent.state === 2) {
      // BEGAN
      this.props.onSwipeableStart?.();
    }
    if (nativeEvent.oldState === 4) {
      // ACTIVE
      this.handleRelease(nativeEvent);
    }
  };

  private handleRelease = (
    evt: Readonly<
      HandlerStateChangeEventPayload & PanGestureHandlerEventPayload
    >,
  ) => {
    const {velocityX, translationX: dragX} = evt;
    const {leftWidth = 0, rowWidth = 0, rowState} = this.state;
    const {rightOffset = rowWidth} = this.state;
    const rightWidth = rowWidth - rightOffset;

    const {
      friction,
      leftThreshold = leftWidth / 2,
      rightThreshold = rightWidth / 2,
    } = this.props;

    const startOffsetX = this.currentOffset() + dragX / friction!;
    const translationX = (dragX + DRAG_TOSS * velocityX) / friction!;

    let toValue = 0;
    if (rowState === 0) {
      if (translationX > leftThreshold) {
        toValue = leftWidth;
      } else if (translationX < -rightThreshold) {
        toValue = -rightWidth;
      }
    } else if (rowState === 1) {
      if (translationX > -leftThreshold) {
        toValue = leftWidth;
      }
    } else {
      if (translationX < rightThreshold) {
        toValue = -rightWidth;
      }
    }

    this.animateRow(startOffsetX, toValue, velocityX / friction!);
  };

  private animateRow = (
    fromValue: number,
    toValue: number,
    velocityX?: number | {x: number; y: number},
  ) => {
    const {dragX, rowTranslation} = this.state;
    dragX.setValue(0);
    rowTranslation.setValue(fromValue);

    this.setState({rowState: Math.sign(toValue)});
    Animated.spring(rowTranslation, {
      restSpeedThreshold: 1.7,
      restDisplacementThreshold: 0.4,
      velocity: velocityX,
      bounciness: 0,
      toValue,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        if (toValue > 0) {
          this.props.onSwipeableLeftOpen?.();
        } else if (toValue < 0) {
          this.props.onSwipeableRightOpen?.();
        }

        if (toValue === 0) {
          if (fromValue > 0) {
            this.props.onSwipeableLeftClose?.();
          } else if (fromValue < 0) {
            this.props.onSwipeableRightClose?.();
          }

          this.props.onSwipeableClose?.();
        } else {
          this.props.onSwipeableOpen?.();
        }
      }
    });

    if (toValue > 0) {
      this.props.onSwipeableWillOpen?.();
    } else if (toValue < 0) {
      this.props.onSwipeableRightWillOpen?.();
    }

    if (toValue === 0) {
      this.props.onSwipeableWillClose?.();
    } else {
      this.props.onSwipeableWillOpen?.();
    }
  };

  private onRowLayout = ({nativeEvent}: LayoutChangeEvent) => {
    this.setState({rowWidth: nativeEvent.layout.width});
  };

  private currentOffset = () => {
    const {leftWidth = 0, rowWidth = 0, rowState} = this.state;
    const {rightOffset = rowWidth} = this.state;
    const rightWidth = rowWidth - rightOffset;
    if (rowState === 1) {
      return leftWidth;
    } else if (rowState === -1) {
      return -rightWidth;
    }
    return 0;
  };

  public close = () => this.animateRow(this.currentOffset(), 0);

  render() {
    const {children, renderLeftActions, renderRightActions} = this.props;

    const left = renderLeftActions && (
      <LeftAction
        style={{
          transform: [{translateX: this.leftActionTranslate!}],
        }}>
        {renderLeftActions(this.showLeftAction!, this.transX!)}
        <View
          onLayout={({nativeEvent}) =>
            this.setState({leftWidth: nativeEvent.layout.x})
          }
        />
      </LeftAction>
    );

    const right = renderRightActions && (
      <RightAction
        style={{
          transform: [{translateX: this.rightActionTranslate!}],
        }}>
        {renderRightActions(this.showRightAction!, this.transX!)}
        <View
          onLayout={({nativeEvent}) => {
            this.setState({rightOffset: nativeEvent.layout.x});
          }}
        />
      </RightAction>
    );

    return (
      <PanGestureHandler
        activeOffsetX={[-10, 10]}
        {...this.props}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}>
        <Container onLayout={this.onRowLayout}>
          {left}
          {right}
          <Animated.View
            style={[
              {
                transform: [{translateX: this.transX!}],
              },
            ]}>
            {children}
          </Animated.View>
        </Container>
      </PanGestureHandler>
    );
  }
}

export default Swipeable;
