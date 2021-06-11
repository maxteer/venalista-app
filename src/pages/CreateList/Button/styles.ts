import styled from 'styled-components/native';

import RFontSize from '@utils/RFontSize';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  max-height: 160px;
  position: absolute;
  bottom: 0;
`;

export const TouchableHighlight = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  z-index: 5;
  bottom: -82px;
  margin: 0px 16px;
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
