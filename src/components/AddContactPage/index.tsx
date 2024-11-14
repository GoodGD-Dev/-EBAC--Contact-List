import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addContact } from "../../store/contactsSlice";
import styled from "styled-components";
import { formatPhoneNumber } from "../../utils/phoneMask";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const AddContactPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (name && email && phone) {
      dispatch(addContact({ id: Date.now(), name, email, phone }));
      navigate("/");
    }
  };

  return (
    <Container>
      <Title>Adicionar Contato</Title>
      <Input
        type="text"
        placeholder="Nome Completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Telefone"
        value={phone}
        onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
      />
      <Button onClick={handleSubmit}>Adicionar</Button>
    </Container>
  );
};

export default AddContactPage;
