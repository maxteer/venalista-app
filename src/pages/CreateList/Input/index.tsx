import React from 'react';

import {Container, ListTitle, ListInput, ListError} from './styles';

interface InputProps {
  onChangeText(text: string): void;
  error: boolean;
}

const Input: React.FC<InputProps> = ({onChangeText, error}) => {
  return (
    <Container>
      <ListTitle>Insira o nome da lista:</ListTitle>
      <ListInput onChangeText={onChangeText} />
      {error && (
        <ListError>O nome precisa conter o mínimo de 4 caracteres.</ListError>
      )}
    </Container>
  );
};

export default Input;
