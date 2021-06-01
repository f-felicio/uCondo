import React from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ModalRatingApp({remove, title, cod, handleModal}) {
  const confirm = () => {
    remove(cod);
    handleModal();
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <Overlay>
        <ModalContainer>
          <Icon name="delete" size={50} color="#ff6680" />
          <Label>Deseja excluir a conta</Label>
          <Title>
            {cod} - {title} ?
          </Title>
          <Row>
            <BtnCancel onPress={handleModal}>
              <BtnCancelText>Não!</BtnCancelText>
            </BtnCancel>
            <BtnConfirm onPress={confirm}>
              <BtnConfirmText>Com certeza</BtnConfirmText>
            </BtnConfirm>
          </Row>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}

const Overlay = styled.View`
  background: rgba(0, 0, 0, 0.4);
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const ModalContainer = styled.View`
  width: 80%;
  align-self: center;
  background: #fff;
  border-radius: 10px;
  padding: 35px 20px 15px;
  min-height: 242px;
  align-items: center;
`;

const Row = styled.View`
  justify-content: space-evenly;
  flex-direction: row;
  margin-top: 25px;
`;

const BtnConfirm = styled.TouchableOpacity`
  background: #ff6680;
  border-radius: 100px;
  height: 40px;
  width: 150px;
  padding: 0 24px;
  align-items: center;
  justify-content: center;
`;

const BtnConfirmText = styled.Text`
  color: #fff;
  font-size: 15px;
`;

const BtnCancel = styled.TouchableOpacity`
  height: 40px;
  width: 80px;
  align-items: center;
  justify-content: center;
`;

const BtnCancelText = styled.Text`
  color: #ff6680;
  font-size: 15px;
`;

const Title = styled.Text`
  color: #6c6c80;
  font-size: 15px;
  text-align: center;
  font-weight: bold;
  margin-top: 8px;
`;

const Label = styled.Text`
  color: #6c6c80;
  font-size: 15px;
  text-align: center;
  font-weight: 500;
  margin-top: 20px;
`;
