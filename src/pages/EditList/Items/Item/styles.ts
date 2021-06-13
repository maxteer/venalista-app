import {Animated} from 'react-native';

import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

import CheckAnimation from '@assets/animations/check.json';
import DeleteAnimation from '@assets/animations/delete.json';
import RFontSize from '@utils/RFontSize';
import {withProps} from '@utils/withProps';

interface ItemProps {
  checked?: boolean;
  selected: boolean;
}

interface SwipeProps {
  type: 'delete' | 'check';
  checked?: boolean;
}

interface SwipeIconProps extends SwipeProps {
  source: object;
  autoPlay: boolean;
  loop: boolean;
  open: boolean;
  checked?: boolean;
}

export const SwipeContainer = withProps<SwipeProps>()(styled(Animated.View))`
  flex: 1;
  margin: 0px 0px 4px 0px;
  justify-content: ${props =>
    props.type === 'delete' ? 'flex-end' : 'flex-start'};
  align-items: center;
  flex-direction: row-reverse;
  background-color: ${props =>
    props.type === 'delete'
      ? props.theme.red
      : props.checked
      ? props.theme.green
      : props.theme.checked};
  border-radius: 4px;
`;

export const SwipeIcon = withProps<SwipeIconProps>()(styled(LottieView)).attrs(
  (props: SwipeIconProps) => ({
    source: props.type === 'delete' ? DeleteAnimation : CheckAnimation,
    autoPlay: false,
    loop: false,
  }),
)`
  margin: 0px 0px ${props => (props.type === 'check' ? '-8px' : '8px')} 0px;
  padding: 8px;
  width: ${props => (props.type === 'check' ? '64px' : '48px')};
  opacity: ${props =>
    props.checked ? 0 : props.type === 'check' ? 1 : props.open ? 0 : 1};
`;

export const ItemContainer = withProps<ItemProps>()(
  styled.TouchableOpacity,
).attrs({
  activeOpacity: 0.8,
})`
  padding: 16px;
  border-radius: 4px;
  margin: 0px 0px 4px 0px;
  background-color: ${props =>
    props.checked ? props.theme.checked : props.theme.green};
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
