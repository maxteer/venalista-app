import Icon from 'react-native-vector-icons/Feather';

import styled from 'styled-components/native';

import RFontSize from '@utils/RFontSize';

export const EmptyContainer = styled.View`
  display: flex;
  align-items: center;
  padding: 38px 26px 0px 26px;
`;

export const EmptyIcon = styled(Icon).attrs({
  name: 'wind',
  size: RFontSize(72),
})`
  color: ${props => props.theme.green};
  padding: 0px 0px 8px 0px;
`;

export const EmptyText = styled.Text`
  color: ${props => props.theme.secondary};
  text-align: center;
  font-size: ${RFontSize(16)}px;
  font-family: 'GeneralSans-Semibold';
`;
