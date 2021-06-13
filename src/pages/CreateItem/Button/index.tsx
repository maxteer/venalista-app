import React from 'react';

import {Container, TouchableHighlight, Text} from './styles';

interface ButtonProps {
  handleCreate(): void;
}

const Button: React.FC<ButtonProps> = ({handleCreate}) => (
  <Container>
    <TouchableHighlight onPress={handleCreate}>
      <Text>Adicionar item</Text>
    </TouchableHighlight>
  </Container>
);

export default Button;
