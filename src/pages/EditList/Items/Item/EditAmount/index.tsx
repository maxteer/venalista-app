import React from 'react';

import {
  Container,
  Label,
  Group,
  TouchableMinus,
  Minus,
  AmountBox,
  Amount,
  TouchablePlus,
  Plus,
} from './styles';

interface EditAmountProps {
  amount: number;
  changeAmount(add: number): void;
}

const EditAmount: React.FC<EditAmountProps> = ({amount, changeAmount}) => (
  <Container>
    <Label>Quantidade</Label>
    <Group>
      <TouchableMinus onPress={() => changeAmount(-1)}>
        <Minus />
      </TouchableMinus>
      <AmountBox>
        <Amount>{amount}</Amount>
      </AmountBox>
      <TouchablePlus onPress={() => changeAmount(1)}>
        <Plus />
      </TouchablePlus>
    </Group>
  </Container>
);

export default EditAmount;
