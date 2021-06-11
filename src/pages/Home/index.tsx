import React from 'react';

import {ThemeProvider} from 'styled-components';

import Header from '@components/Header';
import StatusBar from '@components/StatusBar';
import {useTheme} from '@hooks/useTheme';

import Button from './Button';
import Lists from './Lists';
import {Container} from './styles';

const Home: React.FC = () => {
  return (
    <ThemeProvider theme={useTheme()}>
      <Container>
        <StatusBar />

        <Header settings={false} />

        <Lists />

        <Button />
      </Container>
    </ThemeProvider>
  );
};

export default Home;
