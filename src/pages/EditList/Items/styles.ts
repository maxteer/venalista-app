import styled from 'styled-components/native';

import RFontSize from '@utils/RFontSize';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 48,
  },
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'handled',
})`
  display: flex;
  margin: 0px 20px 32px 20px;
`;

export const ListTitle = styled.Text`
  padding: 16px 0px 16px 16px;
  color: ${props => props.theme.secondary};
  font-size: ${RFontSize(20)}px;
  font-family: 'GeneralSans-Semibold';
`;

export const EmptyMargin = styled.View`
  margin: 20px 0px 0px 0px;
`;
