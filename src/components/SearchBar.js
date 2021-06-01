import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Busca() {
  return (
    <SearchContainer>
      <SearchButton>
        <SearchBar>
          <Icon name="search1" size={22} color="#C4C4D1" />
          <SearchText>Pesquisar conta</SearchText>
        </SearchBar>
      </SearchButton>
    </SearchContainer>
  );
}

const SearchContainer = styled.View`
  width: 100%;
  height: 60px;
  padding: 10px 20px;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.View`
  width: 100%;
  height: 56px;
  padding: 10px 25px;
  align-items: center;
  background-color: #fff;
  border-radius: 100px;
  flex-direction: row;
`;

const SearchButton = styled.TouchableOpacity`
  width: 100%;
`;

const SearchText = styled.Text`
  margin-left: 10px;
  font-size: 15px;
  color: #c4c4d1;
`;
