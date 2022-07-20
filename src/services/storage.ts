import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadData() {
  const value = await AsyncStorage.getItem('@storage_lists');
  return JSON.parse(value || '[]');
}

export async function saveData(data: object) {
  await AsyncStorage.setItem('@storage_lists', JSON.stringify(data));
}
