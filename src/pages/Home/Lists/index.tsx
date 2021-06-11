import React from 'react';

import Empty from '@components/Empty';
import {useLists} from '@hooks/useLists';

import EmptyList from './EmptyList';
import ListItem from './ListItem';
import {Container} from './styles';

const Lists: React.FC = () => {
  const {lists} = useLists();

  return (
    <>
      {lists.length > 0 ? (
        <Container>
          {lists.map((item, index) => (
            <ListItem key={item.id} id={index} item={item} />
          ))}

          {lists.length < 3 && <Empty />}
        </Container>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Lists;
