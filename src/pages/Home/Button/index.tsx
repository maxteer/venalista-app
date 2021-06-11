import React, {useContext} from 'react';

import {useNavigation} from '@react-navigation/core';

import {ThemeContext} from '@contexts/ThemeContext';

import {Container, Gradient, TouchableHighlight, Text} from './styles';

const Button = () => {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <Gradient colors={[`${theme.primary}00`, `${theme.primary}`]} />
      <TouchableHighlight onPress={() => navigation.navigate('CreateList')}>
        <Text>Criar nova lista</Text>
      </TouchableHighlight>
    </Container>
  );
};

export default Button;
