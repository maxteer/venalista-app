import styled from 'styled-components/native';

import RFontSize from '@utils/RFontSize';

export const Price = styled.TextInput`
  width: 120%;
  padding: 6px 8px 8px 8px;
  color: ${props => props.theme.primary};
  font-size: ${RFontSize(14)}px;
  font-family: 'Satoshi-Bold';
  text-align: center;
`;
