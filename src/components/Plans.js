import React, {useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

// #COMPONENTS
import Modal from '../components/Modal';
// #SERVICES
import loadData from '../services/loadData';

export default function Plans({navigation}) {
  const [storage, setStorage] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedCod, setSelectedCod] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      load();
    }, []),
  );

  const load = async () => {
    const response = await loadData();
    if (response) {
      setStorage(response);
    } else {
      try {
        const jsonValue = JSON.stringify(storage);
        await AsyncStorage.setItem('@storage', jsonValue);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleRemove = item => {
    setModal(true);
    setSelectedTitle(item.title);
    setSelectedCod(item.cod);
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const remove = async cod => {
    const newList = storage.filter(value => {
      return value.cod !== cod;
    });
    try {
      const jsonValue = JSON.stringify(newList);
      await AsyncStorage.setItem('@storage', jsonValue);
      load();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {modal && (
        <Modal
          remove={remove}
          title={selectedTitle}
          cod={selectedCod}
          handleModal={handleModal}
        />
      )}
      <Row>
        <ListLabel>Listagem</ListLabel>
        <Counter>{storage.length} registros</Counter>
      </Row>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={storage}
        keyExtractor={item => String(item.cod)}
        renderItem={({item}) => (
          <PlanContainer
            onPress={() => navigation.navigate('Edit', {plan: item})}>
            <Title numberOfLines={1}>
              {item.cod} - {item.title}
            </Title>
            <BtnRemove onPress={() => handleRemove(item)}>
              <Label>
                <Icon name="delete" size={22} color="#C4C4D1" />
              </Label>
            </BtnRemove>
          </PlanContainer>
        )}
      />
    </>
  );
}

const PlanContainer = styled.TouchableOpacity`
  background: #fff;
  border-radius: 16px;
  flex-direction: row;
  height: 56px;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  margin-bottom: 13px;
`;

const Title = styled.Text`
  font-size: 15px;
  line-height: 22px;
  color: #1ba803;
  flex: 2;
`;

const BtnRemove = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
`;

const Label = styled.Text`
  color: #777;
  font-weight: bold;
  font-size: 22px;
`;
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;
const ListLabel = styled.Text`
  font-size: 20px;
  line-height: 24px;
  color: #3d3d4c;
`;
const Counter = styled.Text`
  font-size: 15px;
  line-height: 18px;
  text-align: right;
  color: #a0a0b2;
`;
