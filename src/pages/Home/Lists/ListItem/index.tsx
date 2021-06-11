import React, {useCallback} from 'react';
import {Animated} from 'react-native';

import {useNavigation} from '@react-navigation/core';

import Swipe from '@components/Swipe';
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

const renderLeftActions = (
  _progress: Animated.AnimatedInterpolation,
  dragX: Animated.AnimatedInterpolation,
) => {
  const scale = dragX.interpolate({
    inputRange: [0, 40, 80, 240],
    outputRange: [0, 1, 1, 0],
    extrapolate: 'clamp',
  });

  return (
    <SwipeContainer
      style={[
        {
          opacity: scale,
        },
      ]}>
      <SwipeIcon />
    </SwipeContainer>
  );
};

const ListItem: React.FC<ListProps> = ({id, item}) => {
  const navigation = useNavigation();
  const {removeList, totalAmount} = useLists();
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

  return (
    <Swipe
      friction={2}
      leftThreshold={70}
      renderLeftActions={renderLeftActions}
      onSwipeableLeftOpen={handleDelete}
      enableTrackpadTwoFingerGesture={true}>
      <ItemTouchable onPress={handleOpen}>
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
    </Swipe>
  );
};

export default ListItem;
