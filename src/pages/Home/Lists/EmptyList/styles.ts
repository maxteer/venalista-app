import Icon from 'react-native-vector-icons/Feather';

import styled from 'styled-components/native';

import RFontSize from '@utils/RFontSize';

export const Container = styled.View`
  flex: 0.75;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Bag = styled(Icon).attrs({
  name: 'shopping-bag',
  size: RFontSize(128),
})`
  color: ${props => props.theme.green};
`;

export const Text = styled.Text`
  z-index: 5;
  color: ${props => props.theme.secondary};
  margin: 24px 0px -32px 0px;
  text-align: center;
  font-size: ${RFontSize(16)}px;
  font-family: 'GeneralSans-Semibold';
`;

export const Arrow = styled(Icon).attrs({
  name: 'arrow-down-circle',
  size: RFontSize(64),
})`
  color: ${props => props.theme.green};
  opacity: 0.08;
`;
