import Icon from 'react-native-vector-icons/Feather';

import styled from 'styled-components/native';

import RFontSize from '@utils/RFontSize';

export const Container = styled.View`
  margin: 32px 0px 0px 0px;
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
  background-color: ${props => props.theme.primary};
`;

export const TouchableMinus = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding: 10px;
  border-radius: 4px;
  background-color: ${props => props.theme.primary};
`;

export const Minus = styled(Icon).attrs({
  name: 'minus',
  size: RFontSize(16),
})`
  color: ${props => props.theme.secondary};
`;

export const AmountBox = styled.View`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${props => props.theme.primary};
`;

export const Amount = styled.Text`
  font-size: ${RFontSize(14)}px;
  font-family: 'Satoshi-Bold';
  color: ${props => props.theme.secondary};
`;

export const TouchablePlus = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding: 10px;
  border-radius: 4px;
  background-color: ${props => props.theme.secondary};
`;

export const Plus = styled(Icon).attrs({
  name: 'plus',
  size: RFontSize(16),
})`
  color: ${props => props.theme.primary};
`;
