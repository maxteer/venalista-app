import React, {memo} from 'react';

import CurrencyInput from './CurrencyInput';
import {
  Container,
  Label,
  Group,
  CurrencyBox,
  Currency,
  PriceBox,
} from './styles';

interface EditPriceProps {
  price: number;
  changePrice(price: number): void;
}

const EditPrice: React.FC<EditPriceProps> = ({price, changePrice}) => {
  return (
    <Container>
      <Label>Preço</Label>
      <Group>
        <CurrencyBox>
          <Currency>R$</Currency>
        </CurrencyBox>
        <PriceBox>
          <CurrencyInput
            value={price}
            onChangeValue={changePrice}
            delimiter="."
            separator=","
            precision={2}
          />
        </PriceBox>
      </Group>
    </Container>
  );
};

export default memo(EditPrice);
