import React from 'react';

import {Arrow, Bag, Container, Text} from './styles';

const EmptyList = () => {
  return (
    <Container>
      <Bag />
      <Text>Hmm, não há nada aqui ainda,{'\n'}Vamos criar algo novo?</Text>
      <Arrow />
    </Container>
  );
};

export default EmptyList;
