import React, {useCallback, useState} from 'react';

import {ThemeProvider} from 'styled-components';

import Header from '@components/Header';
import StatusBar from '@components/StatusBar';
import {useTheme} from '@hooks/useTheme';

import Button from './Button';
import Input from './Input';
import {Container} from './styles';

const CreateItem: React.FC = () => {
  const [info, setInfo] = useState({name: '', error: true});

  const handleTextChange = useCallback(text => {
    setInfo({
      name: text,
      error: text.length < 4,
    });
  }, []);

  return (
    <ThemeProvider theme={useTheme()}>
      <Container>
        <StatusBar />

        <Header settings={false} />

        <Input onChangeText={handleTextChange} error={info.error} />

        <Button name={info.name} error={info.error} />
      </Container>
    </ThemeProvider>
  );
};

export default CreateItem;
