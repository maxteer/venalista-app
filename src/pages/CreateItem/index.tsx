import React, {useCallback, useState} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components';

import Header from '@components/Header';
import StatusBar from '@components/StatusBar';
import {useLists} from '@hooks/useLists';
import {useTheme} from '@hooks/useTheme';

import Button from './Button';
import Input from './Input';
import {Container} from './styles';

interface CreateItemParams {
  listIndex: number;
}

const CreateItem: React.FC = () => {
  const {listIndex} = useRoute().params as CreateItemParams;
  const navigation = useNavigation();
  const {addNewItem} = useLists();

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

    addNewItem(listIndex, {
      name: info.name,
      amount: 0,
      price: 0.0,
      multiply: true,
      checked: false,
    });
    navigation.navigate('EditList', {
      params: {
        listIndex,
      },
    });
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

export default CreateItem;
