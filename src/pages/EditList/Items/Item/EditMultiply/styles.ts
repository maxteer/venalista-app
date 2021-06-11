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

export const MultiplyBox = styled.View`
  margin: -4px 8px -6px 0px;
  border-radius: 4px;
`;

export const Multiply = styled.Switch.attrs(props => ({
  thumbColor: props.theme.primary,
  trackColor: {false: props.theme.secondary, true: props.theme.primary},
}))`
  transform: scaleX(${RFontSize(1)}) scaleY(${RFontSize(1)});
`;
