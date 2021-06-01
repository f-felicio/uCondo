import AsyncStorage from '@react-native-async-storage/async-storage';

export const register = async (plan, storage) => {
  try {
    // ## VERIFICA SE JÁ EXISTE O CÓDIGO
    const findCode = storage.find(x => x.cod === plan.cod);
    if (findCode) {
      return {exist: true};
    }
    // ## VERIFICA CAMPOS VAZIOS
    if (
      plan.cod === '' ||
      plan.parent === '' ||
      plan.title === '' ||
      plan.type === '' ||
      plan.allowsAdd === ''
    ) {
      return {empty: true};
    }
    // ## VERIFICA SE O TIPO
    if (plan.parent.type !== plan.type) {
      return {type: true};
    }
    // ## VERIFICA SE A CONTA ACEITA FILHA
    if (!plan.parent.allowsAdd) {
      return {allows: true};
    }
    // ## SALVA O PLANO
    try {
      storage.push(plan);
      const jsonValue = JSON.stringify(storage);
      AsyncStorage.setItem('@storage', jsonValue);
      return {success: true};
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
};

export default register;
