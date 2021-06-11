import React from 'react';
import {ReactNode} from 'react';
import {Animated} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface SwipeableProps {
  friction: number;
  leftThreshold: number;
  renderLeftActions(
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ): ReactNode;
  onSwipeableLeftOpen(): void;
  enableTrackpadTwoFingerGesture?: boolean;
}

const Swipe: React.FC<SwipeableProps> = ({
  children,
  friction,
  leftThreshold,
  renderLeftActions,
  onSwipeableLeftOpen,
  enableTrackpadTwoFingerGesture = false,
}) => {
  return (
    <Swipeable
      friction={friction}
      leftThreshold={leftThreshold}
      renderLeftActions={renderLeftActions}
      onSwipeableLeftOpen={onSwipeableLeftOpen}
      enableTrackpadTwoFingerGesture={enableTrackpadTwoFingerGesture}>
      {children}
    </Swipeable>
  );
};

export default Swipe;
