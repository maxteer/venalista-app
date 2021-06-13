import React from 'react';

import {useNavigation, useRoute} from '@react-navigation/core';

import {useLists} from '@hooks/useLists';

import {Container, TouchableHighlight, Text} from './styles';

interface ButtonProps {
  name: string;
  error: boolean;
}

interface CreateItemParams {
  listIndex: number;
}

const Button: React.FC<ButtonProps> = ({name, error}) => {
  const {listIndex} = useRoute().params as CreateItemParams;
  const navigation = useNavigation();
  const {addNewItem} = useLists();

  const handleCreate = () => {
    if (error) {
      return;
    }

    addNewItem(listIndex, {
      name,
      amount: 0,
      price: 0.0,
      multiply: true,
      checked: false,
    });
    navigation.navigate('EditList', {
      params: {
        listIndex,
      },
    });
  };

  return (
    <Container>
      <TouchableHighlight onPress={handleCreate}>
        <Text>Adicionar item</Text>
      </TouchableHighlight>
    </Container>
  );
};

export default Button;
