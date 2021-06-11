import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import {Animated} from 'react-native';

import AnimatedLottieView from 'lottie-react-native';

import Swipeable from '@components/Swipeable';
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

const Item: React.FC<ItemProps> = ({
  id,
  listIndex,
  selected,
  initialData,
  selectItem,
  deselectItem,
}) => {
  const animationRef = useRef<AnimatedLottieView | null>(null);
  const {updateItem, removeItem} = useLists();

  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const [data, setData] = useState(initialData);
  const initialPrice = useMemo(() => {
    return initialData.price;
  }, [initialData]);

  const changeAmount = useCallback(add => {
    setData(state => {
      const amount = state.amount + add;
      if (amount < 0 || amount > 99) {
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

  const handleStart = useCallback(
    () => animationRef.current?.play(),
    [animationRef],
  );

  const handleRemove = useCallback(() => {
    deselectItem();
    removeItem(listIndex, id);
  }, [id, listIndex, deselectItem, removeItem]);

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
          handleRemove();
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
        <SwipeIcon open={open} ref={animationRef} />
      </SwipeContainer>
    );
  };

  const item = useMemo(
    () => (
      <ItemContainer
        disabled={selected || open}
        selected={selected}
        onPress={evt =>
          selectItem(id, evt.nativeEvent.locationX, evt.nativeEvent.locationY)
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
    ),
    [
      id,
      selected,
      open,
      data,
      initialPrice,
      selectItem,
      changeAmount,
      changePrice,
      changeMultiply,
      handleRemove,
      saveItem,
    ],
  );

  return selected ? (
    item
  ) : (
    <Swipeable
      friction={2}
      leftThreshold={70}
      renderLeftActions={renderLeftActions}
      onSwipeableStart={handleStart}
      onSwipeableOpen={() => setOpen(true)}
      enableTrackpadTwoFingerGesture>
      {item}
    </Swipeable>
  );
};

export default memo(Item);
