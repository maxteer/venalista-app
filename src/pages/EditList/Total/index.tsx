import React from 'react';

import {useLists} from '@hooks/useLists';
import {useTheme} from '@hooks/useTheme';

import {Container, Button, Text} from './styles';

interface TotalProps {
  listIndex: number;
}

const Total: React.FC<TotalProps> = ({listIndex}) => {
  const theme = useTheme();
  const {totalAmount} = useLists();

  return (
    <Container>
      <Button>
        <Text>Total: R$ {totalAmount(listIndex)}</Text>
      </Button>
    </Container>
  );
};

export default Total;
