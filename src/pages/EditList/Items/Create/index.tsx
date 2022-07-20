import React, {useCallback} from 'react';

import {useNavigation} from '@react-navigation/core';

import {Container, Box, Plus} from './styles';

interface CreateProps {
  listIndex: number;
  deselectItem(): void;
}

const Create: React.FC<CreateProps> = ({listIndex, deselectItem}) => {
  const navigation = useNavigation();

  const handleClick = useCallback(() => {
    deselectItem();
    navigation.navigate('CreateItem', {
      listIndex,
    });
  }, [deselectItem, navigation, listIndex]);

  return (
    <Container>
      <Box onPress={handleClick}>
        <Plus />
      </Box>
    </Container>
  );
};

export default Create;
