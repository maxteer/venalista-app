import Icon from 'react-native-vector-icons/Feather';

import styled from 'styled-components/native';

import RFontSize from '@utils/RFontSize';

export const Container = styled.View`
  position: absolute;
  bottom: 96px;
  right: 16px;
`;

export const Box = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  z-index: 6;
  padding: 12px;
  border-radius: ${RFontSize(28)}px;
  background-color: ${props => props.theme.secondary};
`;

export const Plus = styled(Icon).attrs({
  name: 'plus',
  size: RFontSize(32),
})`
  color: ${props => props.theme.primary};
`;
