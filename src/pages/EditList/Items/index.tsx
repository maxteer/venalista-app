import React, {useCallback, useRef, useState} from 'react';
import {ScrollView} from 'react-native';

import Empty from '@components/Empty';
import {useLists} from '@hooks/useLists';

import Create from './Create';
import Item from './Item';
import {Container, EmptyMargin, ListTitle} from './styles';

interface ItemsProps {
  listIndex: number;
}

const Items: React.FC<ItemsProps> = ({listIndex}) => {
  const ref = useRef<ScrollView | null>(null);
  const {lists} = useLists();
  const {name, items} = lists[listIndex];

  const [selected, setSelected] = useState<number | null>(null);

  const selectItem = useCallback(
    (itemId: number, x: number, y: number) => {
      setSelected(state => {
        if (state === null) {
          ref.current?.scrollTo({x, y, animated: true});
          return itemId;
        }
        return state;
      });
    },
    [ref],
  );

  const deselectItem = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <>
      <Container ref={ref} scrollEnabled={selected === null}>
        <ListTitle>{name}</ListTitle>
        {items.length > 0 ? (
          items.map((item, index) => (
            <Item
              key={item.id}
              id={index}
              listIndex={listIndex}
              initialData={item}
              selected={selected === index}
              selectItem={selectItem}
              deselectItem={deselectItem}
            />
          ))
        ) : (
          <EmptyMargin>
            <Empty />
          </EmptyMargin>
        )}
      </Container>
      <Create listIndex={listIndex} deselectItem={deselectItem} />
    </>
  );
};

export default Items;
