import React from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/AntDesign';

// #COMPONENTS
import SearchBar from '../components/SearchBar';
import Plans from '../components/Plans';

export default function Home({navigation}) {
  return (
    <MainContainer>
      <StatusBar
        translucent={true}
        barStyle={'light-content'}
        backgroundColor={'#622490'}
      />
      <Header>
        <Label>Plano de Contas</Label>
        <BtnAdd onPress={() => navigation.navigate('New')}>
          <Label>
            <Icon name="plus" size={28} color="#fff" />
          </Label>
        </BtnAdd>
      </Header>
      <SearchBar />
      <ListContainer>
        <Plans navigation={navigation} />
      </ListContainer>
    </MainContainer>
  );
}

const MainContainer = styled.View`
  background: #622490;
  flex: 1;
`;
const Header = styled.View`
  margin: 45px 22px 25px;
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
  margin-top: 32px;
  background: #f0edf5;
  border-radius: 24px;
  padding: 24px;
  flex: 1;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;
