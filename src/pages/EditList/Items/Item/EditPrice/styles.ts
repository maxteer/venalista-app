import styled from 'styled-components/native';

import RFontSize from '@utils/RFontSize';

export const Container = styled.View`
  margin: 12px 0px 0px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.Text`
  color: #000814;
  font-size: ${RFontSize(18)}px;
  font-family: 'Satoshi-Medium';
`;

export const Group = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: ${props => props.theme.secondary};
`;

export const CurrencyBox = styled.View`
  margin: -4px -4px -6px 8px;
  border-radius: 4px;
`;

export const Currency = styled.Text`
  color: ${props => props.theme.primary};
  font-size: ${RFontSize(14)}px;
  font-family: 'Satoshi-Bold';
  text-align: right;
`;

export const PriceBox = styled.View`
  margin: -2px 8px -6px -4px;
  border-radius: 4px;
`;
