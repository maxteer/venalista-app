import React from 'react';

import {EmptyContainer, EmptyIcon, EmptyText} from './styles';

const Empty: React.FC = () => (
  <EmptyContainer>
    <EmptyIcon />
    <EmptyText>Huh, tá meio vazio aqui,{'\n'}não acha?</EmptyText>
  </EmptyContainer>
);

export default Empty;
