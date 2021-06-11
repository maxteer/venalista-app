import React, {memo, useCallback, useState} from 'react';
import {useRef} from 'react';
import {Animated} from 'react-native';

import {useNavigation} from '@react-navigation/core';
import AnimatedLottieView from 'lottie-react-native';

import Swipeable from '@components/Swipeable';
import {List} from '@contexts/ListsContext';
import {useLists} from '@hooks/useLists';

import {
  ItemTouchable,
  SwipeContainer,
  SwipeIcon,
  ItemContainer,
  ItemHeader,
  ItemTitle,
  ItemFooter,
  ItemTotal,
  ItemDollar,
  ItemAmount,
  ItemDate,
} from './styles';

interface ListProps {
  id: number;
  item: List;
}

const ListItem: React.FC<ListProps> = ({id, item}) => {
  const navigation = useNavigation();

  const animationRef = useRef<AnimatedLottieView | null>(null);
  const {removeList, totalAmount} = useLists();

  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);

  const handleStart = useCallback(
    () => animationRef.current?.play(),
    [animationRef],
  );

  const handleOpen = useCallback(
    () =>
      navigation.navigate('EditList', {
        listIndex: id,
      }),
    [id, navigation],
  );

  const handleDelete = useCallback(() => {
    removeList(id);
  }, [id, removeList]);

  const renderLeftActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 40],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const transY = new Animated.Value(height);
    if (open) {
      Animated.timing(transY, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          handleDelete();
        }
      });
    }

    return (
      <SwipeContainer
        onLayout={evt => setHeight(evt.nativeEvent.layout.height)}
        style={[
          {
            transform: [
              {
                translateY: transY.interpolate({
                  inputRange: [0, height],
                  outputRange: [-height, 0],
                }),
              },
              {
                scaleY: transY.interpolate({
                  inputRange: [0, height],
                  outputRange: [0, 1],
                }),
              },
            ],
            opacity: scale,
          },
        ]}>
        <SwipeIcon ref={animationRef} />
      </SwipeContainer>
    );
  };

  return (
    <Swipeable
      friction={2}
      leftThreshold={70}
      renderLeftActions={renderLeftActions}
      onSwipeableStart={handleStart}
      onSwipeableOpen={() => setOpen(true)}
      enableTrackpadTwoFingerGesture>
      <ItemTouchable disabled={open} onPress={handleOpen}>
        <ItemContainer>
          <ItemHeader>
            <ItemTitle>{item.name}</ItemTitle>
          </ItemHeader>
          <ItemFooter>
            <ItemTotal>
              <ItemDollar />
              <ItemAmount>R$ {totalAmount(id)}</ItemAmount>
            </ItemTotal>
            <ItemDate>{item.date}</ItemDate>
          </ItemFooter>
        </ItemContainer>
      </ItemTouchable>
    </Swipeable>
  );
};

export default memo(ListItem);
