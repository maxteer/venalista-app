import styled from 'styled-components/native';

import RFontSize from '@utils/RFontSize';

export const Container = styled.View`
  display: flex;
`;

export const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  margin: 24px 0px 0px 0px;
  padding: 12px 16px;
  border-radius: 4px;
  align-items: center;
  background-color: ${props => props.theme.secondary};
`;

export const Text = styled.Text`
  color: ${props => props.theme.primary};
  font-size: ${RFontSize(20)}px;
  font-family: 'Satoshi-Bold';
`;
