import React from 'react';

import {useRoute} from '@react-navigation/core';
import {ThemeProvider} from 'styled-components';

import Header from '@components/Header';
import StatusBar from '@components/StatusBar';
import {useTheme} from '@hooks/useTheme';

import Items from './Items';
import {Container} from './styles';
import Total from './Total';

interface EditListParams {
  listIndex: number;
}

const EditList = () => {
  const {listIndex} = useRoute().params as EditListParams;

  return (
    <ThemeProvider theme={useTheme()}>
      <Container>
        <StatusBar />

        <Header settings={false} />

        <Items listIndex={listIndex} />

        <Total listIndex={listIndex} />
      </Container>
    </ThemeProvider>
  );
};

export default EditList;
