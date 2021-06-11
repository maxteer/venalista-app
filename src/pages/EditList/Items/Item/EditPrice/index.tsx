import React, {memo} from 'react';

import {
  Container,
  Label,
  Group,
  CurrencyBox,
  Currency,
  PriceBox,
  Price,
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
          <Price
            defaultValue={price.toFixed(2).replace(/\./g, ',')}
            onChangeText={text =>
              changePrice(Number(text.replace(/,/g, '.')) || 0.0)
            }
          />
        </PriceBox>
      </Group>
    </Container>
  );
};

export default memo(EditPrice);
