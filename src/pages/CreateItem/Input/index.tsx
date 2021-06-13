import React from 'react';

import {Container, ListTitle, ListInput, ListError} from './styles';

interface InputProps {
  error: boolean;
  onChangeText(text: string): void;
  onSubmitEditing(): void;
}

const Input: React.FC<InputProps> = ({
  error,
  onChangeText,
  onSubmitEditing,
}) => (
  <Container>
    <ListTitle>Insira o nome do item:</ListTitle>
    <ListInput onChangeText={onChangeText} onSubmitEditing={onSubmitEditing} />
    {error && (
      <ListError>O nome precisa conter o mínimo de 4 caracteres.</ListError>
    )}
  </Container>
);

export default Input;
