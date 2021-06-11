import React, {useCallback, useState} from 'react';

import Empty from '@components/Empty';
import {useLists} from '@hooks/useLists';
import RFontSize from '@utils/RFontSize';

import EmptyList from './EmptyList';
import ListItem from './ListItem';
import {Container} from './styles';

const Lists: React.FC = () => {
  const {lists} = useLists();
  const [small, setSmall] = useState(false);
  const onLayoutContainer = useCallback(
    evt => {
      const {height} = evt.nativeEvent.layout;
      const itemsSize = 102 + RFontSize(14) + RFontSize(10);

      const calc = Math.round(height - itemsSize * lists.length);
      const emptySize = 60 + RFontSize(16) * 2 + RFontSize(72);
      if (small) {
        if (calc < emptySize) {
          setSmall(false);
        }
      } else {
        if (calc >= emptySize) {
          setSmall(true);
        }
      }
    },
    [small, setSmall, lists],
  );

  return (
    <>
      {lists.length > 0 ? (
        <Container onLayout={onLayoutContainer}>
          {lists.map((item, index) => (
            <ListItem key={item.id} id={index} item={item} />
          ))}

          {small && <Empty />}
        </Container>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Lists;
