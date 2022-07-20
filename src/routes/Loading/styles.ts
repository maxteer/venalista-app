import React from 'react';

import AnimatedLottieView from 'lottie-react-native';
import styled from 'styled-components/native';

import LoadingAnimationD from '@assets/animations/loadingd.json';
import LoadingAnimationW from '@assets/animations/loadingw.json';
import RFontSize from '@utils/RFontSize';

export const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.primary};
`;

export const LoadingIcon = React.memo(styled(AnimatedLottieView).attrs(
  props => ({
    source:
      props.theme.primary === '#000814' ? LoadingAnimationW : LoadingAnimationD,
    loop: true,
  }),
)`
  width: 256px;
`);

export const LoadingText = styled.Text`
  margin: 0px 0px 8px 0px;
  color: ${props => props.theme.secondary};
  font-size: ${RFontSize(16)}px;
  font-family: 'GeneralSans-Medium';
`;
