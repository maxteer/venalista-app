import {useContext} from 'react';

import {ListsContext} from '@contexts/ListsContext';

export function useLists() {
  const context = useContext(ListsContext);

  return context;
}
