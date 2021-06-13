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
  const swipeRef = useRef<Swipeable | null>(null);
  const deleteRef = useRef<AnimatedLottieView | null>(null);
  const checkRef = useRef<AnimatedLottieView | null>(null);

  const {updateItem, removeItem, checkItem} = useLists();

  const [open, setOpen] = useState(false);
  const [right, setRight] = useState(false);

  const [leftHeight, setLeftHeight] = useState(0);

  const [data, setData] = useState(initialData);

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

  const handleOpen = useCallback(
    evt => selectItem(id, evt.nativeEvent.locationX, evt.nativeEvent.locationY),
    [id, selectItem],
  );

  const handleAnimations = useCallback(() => {
    deleteRef.current?.play();
    checkRef.current?.play(
      initialData.checked ? 60 : 0,
      initialData.checked ? 0 : 60,
    );
  }, [deleteRef, checkRef, initialData]);

  const handleRemove = useCallback(() => {
    deselectItem();
    removeItem(listIndex, id);
  }, [id, listIndex, deselectItem, removeItem]);

  const handleCheck = useCallback(() => {
    setRight(true);
    swipeRef.current?.close();
    checkItem(listIndex, id);
  }, [id, listIndex, swipeRef, checkItem]);

  const renderLeftActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 40],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const transY = new Animated.Value(leftHeight);
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
        type="delete"
        onLayout={evt => setLeftHeight(evt.nativeEvent.layout.height)}
        style={[
          {
            transform: [
              {
                translateY: transY.interpolate({
                  inputRange: [0, leftHeight],
                  outputRange: [-leftHeight, 0],
                }),
              },
              {
                scaleY: transY.interpolate({
                  inputRange: [0, leftHeight],
                  outputRange: [0, 1],
                }),
              },
            ],
            opacity: scale,
          },
        ]}>
        <SwipeIcon type="delete" open={open} ref={deleteRef} />
      </SwipeContainer>
    );
  };

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-40, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <SwipeContainer
        type="check"
        checked={initialData.checked}
        style={[
          {
            opacity: scale,
          },
        ]}>
        <SwipeIcon
          type="check"
          checked={right}
          open={initialData.checked}
          ref={checkRef}
        />
      </SwipeContainer>
    );
  };

  const item = useMemo(
    () => (
      <ItemContainer
        checked={initialData.checked}
        disabled={selected || open}
        selected={selected}
        onPress={handleOpen}>
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
            <EditPrice price={data.price} changePrice={changePrice} />
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
      initialData,
      open,
      data,
      changeAmount,
      changePrice,
      changeMultiply,
      handleOpen,
      handleRemove,
      saveItem,
    ],
  );

  return selected ? (
    item
  ) : (
    <Swipeable
      ref={swipeRef}
      friction={2}
      leftThreshold={70}
      rightThreshold={70}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableStart={handleAnimations}
      onSwipeableLeftOpen={() => setOpen(true)}
      onSwipeableRightOpen={() => handleCheck()}
      onSwipeableRightClose={() => setRight(false)}
      enableTrackpadTwoFingerGesture>
      {item}
    </Swipeable>
  );
};

export default memo(Item);
