import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 48,
  },
  showsVerticalScrollIndicator: false,
})`
  display: flex;
  margin: 0px 20px 32px 20px;
`;
