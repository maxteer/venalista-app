import React, {useCallback, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components';

import Header from '@components/Header';
import StatusBar from '@components/StatusBar';
import {useLists} from '@hooks/useLists';
import {useTheme} from '@hooks/useTheme';
import * as DateString from '@utils/DateString';

import Button from './Button';
import Input from './Input';
import {Container} from './styles';

const CreateList: React.FC = () => {
  const navigation = useNavigation();
  const {addNewList} = useLists();
  const [info, setInfo] = useState({name: '', error: true});

  const handleTextChange = useCallback(text => {
    setInfo({
      name: text,
      error: text.length < 4,
    });
  }, []);

  const handleCreate = () => {
    if (info.error) {
      return;
    }

    addNewList({
      name: info.name,
      date: DateString.getCurrent(),
      items: [],
    });
    navigation.navigate('Home');
  };

  return (
    <ThemeProvider theme={useTheme()}>
      <Container>
        <StatusBar />

        <Header settings={false} />

        <Input
          error={info.error}
          onChangeText={handleTextChange}
          onSubmitEditing={handleCreate}
        />

        <Button handleCreate={handleCreate} />
      </Container>
    </ThemeProvider>
  );
};

export default CreateList;
