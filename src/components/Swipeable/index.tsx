import React, {Component, ReactNode} from 'react';
import {Animated, View} from 'react-native';
import {
  GestureEvent,
  HandlerStateChangeEvent,
  HandlerStateChangeEventPayload,
  PanGestureHandler,
  PanGestureHandlerProps,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

import {LeftAction, Container} from './styles';

const DRAG_TOSS = 0.05;

type SwipeableExcludes = Exclude<
  keyof PanGestureHandlerProps,
  'onGestureEvent' | 'onHandlerStateChange'
>;

interface SwipeableProps
  extends Pick<PanGestureHandlerProps, SwipeableExcludes> {
  friction?: number;
  leftThreshold?: number;
  renderLeftActions?(
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ): ReactNode;
  onSwipeableStart?(): void;
  onSwipeableWillOpen?(): void;
  onSwipeableOpen?(): void;
  onSwipeableWillClose?(): void;
  onSwipeableClose?(): void;
  enableTrackpadTwoFingerGesture?: boolean;
}

interface SwipeableState {
  dragX: Animated.Value;
  rowTranslation: Animated.Value;
  rowState: number;
  leftWidth?: number;
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
      leftWidth: undefined,
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
      this.state.leftWidth !== state.leftWidth
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

  private updateAnimatedEvent = (
    props: SwipeableProps,
    state: SwipeableState,
  ) => {
    const {friction} = props;
    const {dragX, rowTranslation, leftWidth = 0} = state;

    const transX = Animated.add(
      rowTranslation,
      dragX.interpolate({
        inputRange: [0, friction!],
        outputRange: [0, 1],
      }),
    ).interpolate({
      inputRange: [-0, leftWidth, leftWidth + 1],
      outputRange: [-0, leftWidth, leftWidth + 1],
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
    const {leftWidth = 0, rowState} = this.state;

    const {friction, leftThreshold = leftWidth / 2} = this.props;

    const startOffsetX = this.currentOffset() + dragX / friction!;
    const translationX = (dragX + DRAG_TOSS * velocityX) / friction!;

    let toValue = 0;
    if (rowState === 0) {
      if (translationX > leftThreshold) {
        toValue = leftWidth;
      }
    } else if (rowState === 1) {
      if (translationX > -leftThreshold) {
        toValue = leftWidth;
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
          this.props.onSwipeableOpen?.();
        }

        if (toValue === 0) {
          this.props.onSwipeableClose?.();
        }
      }
    });

    if (toValue > 0) {
      this.props.onSwipeableWillOpen?.();
    }

    if (toValue === 0) {
      this.props.onSwipeableWillClose?.();
    }
  };

  private currentOffset = () => {
    const {leftWidth = 0, rowState} = this.state;
    return rowState === 1 ? leftWidth : 0;
  };

  private close = () => this.animateRow(this.currentOffset(), 0);

  render() {
    const {children, renderLeftActions} = this.props;

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

    return (
      <PanGestureHandler
        activeOffsetX={[-10, 10]}
        {...this.props}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}>
        <Container>
          {left}
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
