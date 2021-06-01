import React, {useState} from 'react';
import styled from 'styled-components';
import RNPickerSelect from 'react-native-picker-select';
import {useFocusEffect} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';

// ## SERVICES
import loadData from '../services/loadData';
import update from '../services/update';

export default function Edit({route, navigation}) {
  const [storage, setStorage] = useState([]);
  const plan = route.params?.plan ?? null;
  const cod = plan.cod;
  const [parent, setParent] = useState(plan.parent);
  const [title, setTitle] = useState(plan.title);
  const [type, setType] = useState(plan.type);
  const [allowsAdd, setAllowsAdd] = useState(plan.allowsAdd);
  const [selectedParent, setSelectedParent] = useState(plan.parent);
  const parents = [
    {
      label: 'Receitas',
      cod: 1,
      value: 'Receitas',
      type: 'Receita',
      allowsAdd: false,
    },
    {
      label: 'Despesas',
      cod: 2,
      value: 'Despesas',
      type: 'Despesa',
      allowsAdd: true,
    },
    {
      label: 'Despesas Bancárias',
      cod: 3,
      value: 'Despesas Bancárias',
      type: 'Despesa',
      allowsAdd: true,
    },
    {
      label: 'Outras Receitas',
      cod: 4,
      value: 'Outras Receitas',
      type: 'Receita',
      allowsAdd: false,
    },
  ];
  const [errorMsg, setErrorMsg] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      load();
    }, []),
  );

  const handleParent = value => {
    console.log(value);
    setParent(value);
    const findParent = parents.find(x => x.value === value);
    setSelectedParent(findParent);
  };

  const load = async () => {
    const response = await loadData();
    setStorage(response);
  };

  const sendUpdate = async () => {
    const editedPlan = {
      cod,
      parent: selectedParent,
      title,
      type,
      allowsAdd,
    };
    const verify = await update(editedPlan, storage);
    if (verify.empty) {
      setErrorMsg('Preencha todos os campos.');
    }
    if (verify.type) {
      setErrorMsg('O tipo precisa ser o mesmo da conta pai.');
    }
    if (verify.allows) {
      setErrorMsg('Essa conta pai não permite contas filhas.');
    }
    if (verify.success) {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{backgroundColor: '#f0edf5'}}
      keyboardOpeningTime={0}
      enableOnAndroid
      enableAutoAutomaticScroll={true}>
      <MainContainer>
        <Header>
          <Label onPress={() => navigation.goBack()}>
            <Icon name="left" size={22} color="#fff" /> Editar Conta
          </Label>
          <BtnAdd onPress={sendUpdate}>
            <Label>
              <Icon name="check" size={28} color="#fff" />
            </Label>
          </BtnAdd>
        </Header>

        <ListContainer>
          <FormLabel>Conta pai</FormLabel>
          <InputContainer>
            <RNPickerSelect
              placeholder={{label: 'Escolher', color: '#999'}}
              onValueChange={value => handleParent(value)}
              items={parents}
              value={parent.value}
              style={{
                inputIOS: {
                  color: '#777',
                  width: 300,
                  fontSize: 15,
                  paddingTop: 2,
                },
                inputAndroid: {
                  color: '#777',
                  paddingTop: 25,
                  width: 320,
                },
              }}
            />
          </InputContainer>

          <FormLabel>Código</FormLabel>
          <InputContainer>
            <Input editable={false} value={cod} keyboardType={'decimal-pad'} />
          </InputContainer>

          <FormLabel>Nome</FormLabel>
          <InputContainer>
            <Input
              onChangeText={value => {
                setTitle(value);
              }}
              value={title}
            />
          </InputContainer>
          <FormLabel>Tipo</FormLabel>
          <InputContainer>
            <RNPickerSelect
              placeholder={{label: 'Escolher', color: '#999'}}
              onValueChange={value => setType(value)}
              items={[
                {label: 'Receita', value: 'Receita'},
                {label: 'Despesa', value: 'Despesa'},
              ]}
              value={type}
              style={{
                inputIOS: {
                  color: '#777',
                  width: 300,
                  fontSize: 15,
                  paddingTop: 2,
                },
                inputAndroid: {
                  color: '#777',
                  paddingTop: 25,
                  width: 320,
                },
              }}
            />
          </InputContainer>
          <FormLabel>Aceita lançamentos</FormLabel>
          <InputContainer>
            <RNPickerSelect
              placeholder={{label: 'Escolher', color: '#999'}}
              onValueChange={value => setAllowsAdd(value)}
              items={[
                {label: 'Sim', value: true},
                {label: 'Não', value: false},
              ]}
              value={allowsAdd}
              style={{
                inputIOS: {
                  color: '#777',
                  width: 300,
                  fontSize: 15,
                  paddingTop: 2,
                },
                inputAndroid: {
                  color: '#777',
                  paddingTop: 25,
                  width: 320,
                },
              }}
            />
          </InputContainer>
          <ErrorMsg>{errorMsg}</ErrorMsg>
        </ListContainer>
      </MainContainer>
    </KeyboardAwareScrollView>
  );
}

const MainContainer = styled.View`
  background: #622490;
  flex: 1;
  height: 100%;
`;
const Header = styled.View`
  margin: 55px 22px 25px;
  flex-direction: row;
  justify-content: space-between;
`;
const Label = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
`;
const BtnAdd = styled.TouchableOpacity``;

const ListContainer = styled.View`
  width: 100%;
  background: #f0edf5;
  border-radius: 24px;
  padding: 24px;
  flex: 1;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const FormLabel = styled.Text`
  font-size: 15px;
  line-height: 22px;
  color: #6a6a6a;
  font-weight: 500;
  margin: 10px 0 2px 0;
`;

const InputContainer = styled.View`
  width: 100%;
  height: 43px;
  padding: 10px 20px;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  flex-direction: row;
`;

const Input = styled.TextInput`
  font-size: 15px;
  color: #777;
  height: 50px;
  width: 100%;
`;

const ErrorMsg = styled.Text`
  color: #6c6c80;
  font-size: 15px;
  text-align: center;
  font-weight: bold;
  margin-top: 28px;
`;
