import {Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

import DeleteAnimation from '@assets/animations/delete.json';
import RFontSize from '@utils/RFontSize';
import {withProps} from '@utils/withProps';

interface SwipeIconProps {
  source: object;
  autoPlay: boolean;
  loop: boolean;
  open: boolean;
}

export const ItemTouchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})``;

export const SwipeContainer = styled(Animated.View)`
  margin: 0px 0px 8px 0px;
  flex: 1;
  background-color: ${props => props.theme.red};
  border-radius: 4px;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row-reverse;
`;

export const SwipeIcon = withProps<SwipeIconProps>()(styled(LottieView)).attrs({
  source: DeleteAnimation,
  autoPlay: false,
  loop: false,
})`
  padding: 8px;
  width: 48px;
  opacity: ${props => (props.open ? 0 : 1)};
`;

export const ItemContainer = styled.View`
  background-color: ${props => props.theme.green};
  margin: 0px 0px 8px 0px;
  padding: 14px 16px 14px 16px;
  border-radius: 4px;
`;

export const ItemHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ItemTitle = styled.Text`
  max-width: 70%;
  color: #000814;
  font-size: ${RFontSize(14)}px;
  font-family: 'GeneralSans-Semibold';
`;

export const ItemBox = styled.View`
  padding: 6px 12px;
  background-color: #00081430;
`;

export const ItemButton = styled.Text`
  color: #000814;
  font-size: ${RFontSize(10)}px;
  font-family: 'GeneralSans-Semibold';
`;

export const ItemFooter = styled.View`
  margin: 32px 0px 0px 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
`;

export const ItemTotal = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  background-color: #fffdf740;
`;

export const ItemDollar = styled(Icon).attrs({
  name: 'dollar-sign',
  size: 16,
})`
  color: #000814;
  padding: 4px;
  background-color: #fffdf740;
`;

export const ItemAmount = styled.Text`
  color: #000814;
  margin: 0px 8px;
  font-size: ${RFontSize(10)}px;
  font-family: 'Satoshi-Bold';
`;

export const ItemDate = styled.Text`
  color: #000814;
  opacity: 0.6;
  font-size: ${RFontSize(10)}px;
  font-family: 'Satoshi-Medium';
`;
