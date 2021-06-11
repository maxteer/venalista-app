import styled from 'styled-components/native';

export const StatusBar = styled.StatusBar.attrs(props => ({
  backgroundColor: props.theme.primary,
  barStyle: props.theme.barStyle,
}))``;
