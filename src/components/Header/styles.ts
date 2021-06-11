import Icon from 'react-native-vector-icons/Feather';

import styled from 'styled-components/native';

import RFontSize from '@utils/RFontSize';

export const Container = styled.View`
  padding: 24px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Brand = styled.View``;

export const Settings = styled(Icon).attrs({
  name: 'settings',
  size: RFontSize(24),
})`
  color: ${props => props.theme.secondary};
`;
