import React, {memo} from 'react';

import {Container, Label, MultiplyBox, Multiply} from './styles';

interface EditMultiplyProps {
  multiply: boolean;
  changeMultiply(multiply: boolean): void;
}

const EditMultiply: React.FC<EditMultiplyProps> = ({
  multiply = true,
  changeMultiply,
}) => {
  return (
    <Container>
      <Label>Multiplicar preço</Label>
      <MultiplyBox>
        <Multiply value={multiply} onValueChange={changeMultiply} />
      </MultiplyBox>
    </Container>
  );
};

export default memo(EditMultiply);
