import React, {memo, useCallback, useState} from 'react';
import {useMemo} from 'react';
import {Animated} from 'react-native';

import Swipe from '@components/Swipe';
import {ListItem} from '@contexts/ListsContext';
import {useLists} from '@hooks/useLists';
import {ItemTouchable} from '@pages/Home/Lists/ListItem/styles';

import EditAmount from './EditAmount';
import EditButton from './EditButton';
import EditMultiply from './EditMultiply';
import EditPrice from './EditPrice';
import {
  SwipeContainer,
  SwipeIcon,
  ItemContainer,
  ItemHeader,
  ItemName,
  ItemBox,
  ItemButton,
  EditContainer,
} from './styles';

interface ItemProps {
  id: number;
  listIndex: number;
  selected: boolean;
  initialData: ListItem;
  selectItem(id: number, x: number, y: number): void;
  deselectItem(): void;
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

const Item: React.FC<ItemProps> = ({
  id,
  listIndex,
  selected,
  initialData,
  selectItem,
  deselectItem,
}) => {
  const {updateItem, removeItem} = useLists();

  const [data, setData] = useState(initialData);
  const initialPrice = useMemo(() => {
    return initialData.price;
  }, [initialData]);

  const changeAmount = useCallback(add => {
    setData(state => {
      const amount = state.amount + add;
      if (amount <= 0 || amount >= 99) {
        return state;
      }

      return {...state, amount};
    });
  }, []);

  const changePrice = useCallback(price => {
    setData(state => ({...state, price}));
  }, []);

  const changeMultiply = useCallback(multiply => {
    setData(state => ({...state, multiply}));
  }, []);

  const saveItem = useCallback(
    (index, itemData) => {
      if (!Object.is(itemData, initialData)) {
        updateItem(listIndex, index, itemData);
      }
      deselectItem();
    },
    [initialData, deselectItem, listIndex, updateItem],
  );

  const handleRemove = useCallback(() => {
    deselectItem();
    removeItem(listIndex, id);
  }, [id, listIndex, deselectItem, removeItem]);

  const item = (
    <ItemContainer
      disabled={selected}
      selected={selected}
      onPress={evt =>
        selectItem(
          id,
          evt.nativeEvent.locationX,
          evt.nativeEvent.locationY + 100,
        )
      }>
      <ItemHeader>
        <ItemName selected={selected}>{data.name}</ItemName>
        {selected && (
          <ItemTouchable onPress={handleRemove}>
            <ItemBox>
              <ItemButton>Excluir</ItemButton>
            </ItemBox>
          </ItemTouchable>
        )}
      </ItemHeader>
      {selected && (
        <EditContainer>
          <EditAmount amount={data.amount} changeAmount={changeAmount} />
          <EditPrice price={initialPrice} changePrice={changePrice} />
          <EditMultiply
            multiply={data.multiply}
            changeMultiply={changeMultiply}
          />
          <EditButton onPress={() => saveItem(id, data)} />
        </EditContainer>
      )}
    </ItemContainer>
  );

  return selected ? (
    item
  ) : (
    <Swipe
      friction={2}
      leftThreshold={70}
      renderLeftActions={renderLeftActions}
      onSwipeableLeftOpen={handleRemove}
      enableTrackpadTwoFingerGesture={true}>
      {item}
    </Swipe>
  );
};

export default memo(Item);
