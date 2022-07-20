import {Animated} from 'react-native';

import styled from 'styled-components/native';

export const LeftAction = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  flex-direction: row;
`;

export const RightAction = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  flex-direction: row-reverse;
`;

export const Container = styled(Animated.View)`
  overflow: hidden;
`;
