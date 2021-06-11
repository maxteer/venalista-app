import {Animated} from 'react-native';

import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

import DeleteAnimation from '@assets/animations/delete.json';
import RFontSize from '@utils/RFontSize';
import {withProps} from '@utils/withProps';

interface ItemProps {
  selected: boolean;
}

export const SwipeContainer = styled(Animated.View)`
  margin: 0px 0px 4px 0px;
  flex: 1;
  background-color: red;
  border-radius: 4px;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row-reverse;
`;

export const SwipeIcon = styled(LottieView).attrs({
  source: DeleteAnimation,
  autoPlay: true,
})`
  padding: 8px;
  width: 48px;
`;

export const ItemContainer = withProps<ItemProps>()(
  styled.TouchableOpacity,
).attrs({
  activeOpacity: 0.8,
})`
  padding: 16px;
  border-radius: 4px;
  margin: 0px 0px 4px 0px;
  background-color: ${props => props.theme.green};
  ${props => (props.selected ? `border: 2px ${props.theme.secondary};` : '')}
`;

export const ItemTouchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})``;

export const ItemHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ItemName = withProps<ItemProps>()(styled.Text)`
  max-width: 80%;
  color: #000814;
  font-size: ${props => (props.selected ? RFontSize(20) : RFontSize(18))}px;
  font-family: ${props => (props.selected ? 'Satoshi-Bold' : 'Satoshi-Medium')};
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

export const EditContainer = styled.View`
  display: flex;
  flex-direction: column;
`;
