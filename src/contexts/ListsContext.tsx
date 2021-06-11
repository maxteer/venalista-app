import React, {useEffect} from 'react';
import {useCallback, useState, createContext} from 'react';

import {loadData, saveData} from '@services/storage';

import {generateHash} from '@utils/Hash';

export interface List {
  id?: string;
  name: string;
  date: string;
  items: ListItem[];
}

export interface ListItem {
  id?: string;
  name: string;
  amount: number;
  price: number;
  multiply: boolean;
}

export interface ContextType {
  lists: List[];
  addNewList(list: List): void;
  removeList(listId: number): void;
  addNewItem(listId: number, itemData: ListItem): void;
  removeItem(listId: number, itemId: number): void;
  updateItem(listId: number, itemId: number, itemData: ListItem): void;
  totalAmount(listId: number): string;
}

export const ListsContext = createContext<ContextType>({} as ContextType);

export const ListsProvider: React.FC = ({children}) => {
  const [lists, setLists] = useState([] as List[]);

  useEffect(() => {
    const fetchData = async () => setLists(await loadData());
    fetchData();
  }, []);

  const addNewList = useCallback(list => {
    setLists(state => {
      const result = [{id: generateHash(), ...list}, ...state];
      saveData(result);
      return result;
    });
  }, []);

  const removeList = useCallback(listId => {
    setLists(state => {
      state.splice(listId, 1);
      const result = [...state];
      saveData(result);
      return result;
    });
  }, []);

  const addNewItem = useCallback((listId, itemData) => {
    setLists(state => {
      state[listId] = {
        ...state[listId],
        items: [{id: generateHash(), ...itemData}, ...state[listId].items],
      };
      const result = [...state];
      saveData(result);
      return result;
    });
  }, []);

  const removeItem = useCallback((listId, itemId) => {
    setLists(state => {
      state[listId].items.splice(itemId, 1);
      state[listId] = {
        ...state[listId],
      };
      const result = [...state];
      saveData(result);
      return result;
    });
  }, []);

  const updateItem = useCallback((listId, itemId, itemData) => {
    setLists(state => {
      state[listId].items[itemId] = itemData;
      const result = [...state];
      saveData(result);
      return result;
    });
  }, []);

  const totalAmount = useCallback(
    listId => {
      return lists[listId].items
        .map(item => (item.multiply ? item.price * item.amount : item.price))
        .reduce((a, b) => a + b, 0)
        .toFixed(2)
        .replace('.', ',');
    },
    [lists],
  );

  return (
    <ListsContext.Provider
      value={{
        lists,
        addNewList,
        removeList,
        addNewItem,
        removeItem,
        updateItem,
        totalAmount,
      }}>
      {children}
    </ListsContext.Provider>
  );
};
