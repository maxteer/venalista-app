import React from 'react';

import {Container, Touchable, Text} from './styles';

const EditButton = ({onPress}) => (
  <Container>
    <Touchable onPress={onPress}>
      <Text>Finalizar</Text>
    </Touchable>
  </Container>
);

export default EditButton;
