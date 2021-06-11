import styled from 'styled-components/native';

import RFontSize from '@utils/RFontSize';

export const Container = styled.View`
  display: flex;
  margin: 0px 20px 32px 20px;
`;

export const ListTitle = styled.Text`
  padding: 16px 0px 16px 16px;
  color: ${props => props.theme.secondary};
  font-size: ${RFontSize(20)}px;
  font-family: 'GeneralSans-Semibold';
`;

export const ListInput = styled.TextInput.attrs({
  maxLength: 64,
  placeholder: 'Compras para o bebê',
  placeholderTextColor: '#00081430',
})`
  padding: 16px;
  color: #000814;
  background-color: ${props => props.theme.green};
  font-size: ${RFontSize(14)}px;
  font-family: 'GeneralSans-Semibold';
  border: 2px ${props => props.theme.secondary};
`;

export const ListError = styled.Text`
  padding: 4px 0px 0px 0px;
  color: ${props => props.theme.secondary};
  font-size: ${RFontSize(10)}px;
  font-family: 'Satoshi-Medium';
`;
