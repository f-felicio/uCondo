import AsyncStorage from '@react-native-async-storage/async-storage';

export const update = async (plan, storage) => {
  try {
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
    // ## REMOVE O PLANO QUE VAI SER ATUALIZADO
    const newList = storage.filter(value => {
      return value.cod !== plan.cod;
    });
    // ## SALVA O PLANO
    try {
      newList.push(plan);
      const jsonValue2 = JSON.stringify(newList);
      AsyncStorage.setItem('@storage', jsonValue2);
      return {success: true};
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
};

export default update;
