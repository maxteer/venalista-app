import React from 'react';

import {useNavigation} from '@react-navigation/core';

import {useLists} from '@hooks/useLists';
import * as DateString from '@utils/DateString';

import {Container, TouchableHighlight, Text} from './styles';

interface ButtonProps {
  name: string;
  error: boolean;
}

const Button: React.FC<ButtonProps> = ({name, error}) => {
  const navigation = useNavigation();
  const {addNewList} = useLists();

  const handleCreate = () => {
    if (error) {
      return;
    }

    addNewList({
      name,
      date: DateString.getCurrent(),
      items: [],
    });
    navigation.navigate('Home');
  };

  return (
    <Container>
      <TouchableHighlight onPress={handleCreate}>
        <Text>Criar lista</Text>
      </TouchableHighlight>
    </Container>
  );
};

export default Button;
