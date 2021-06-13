import React from 'react';

import {Container, TouchableHighlight, Text} from './styles';

interface ButtonProps {
  handleCreate(): void;
}

const Button: React.FC<ButtonProps> = ({handleCreate}) => (
  <Container>
    <TouchableHighlight onPress={handleCreate}>
      <Text>Criar lista</Text>
    </TouchableHighlight>
  </Container>
);

export default Button;
