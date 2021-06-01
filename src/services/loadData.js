import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage');
    if (jsonValue) {
      const list = JSON.parse(jsonValue);
      return list;
    }
  } catch (e) {
    console.log(e);
  }
};

export default loadData;
