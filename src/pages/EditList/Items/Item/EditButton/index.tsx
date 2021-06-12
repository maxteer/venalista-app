import React, {memo} from 'react';
import {GestureResponderEvent} from 'react-native';

import {Container, Touchable, Text} from './styles';

interface EditButtonProps {
  onPress(event: GestureResponderEvent): void;
}

const EditButton: React.FC<EditButtonProps> = ({onPress}) => (
  <Container>
    <Touchable onPress={onPress}>
      <Text>Finalizar</Text>
    </Touchable>
  </Container>
);

export default memo(EditButton);
