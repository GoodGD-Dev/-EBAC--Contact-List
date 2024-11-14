import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeContact, editContact, Contact } from "../../store/contactsSlice";
import { RootState } from "../../store/store";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #f7f8fc;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const ListContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
  transition: all 0.3s ease;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;

  strong {
    font-size: 16px;
    color: #333;
  }

  span {
    color: #666;
  }
`;

const Input = styled.input`
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  padding: 8px;
  margin: 5px 0;
  width: 100%;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button<{ variant?: string }>`
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  background-color: ${({ variant }) =>
    variant === "edit" ? "#4caf50" : "#f44336"};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ variant }) =>
      variant === "edit" ? "#45a049" : "#d32f2f"};
  }
`;

const AddButton = styled(Link)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  font-size: 24px;
  padding: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #45a049;
  }
`;

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch();
  const [editingContactId, setEditingContactId] = useState<number | null>(null);
  const [contactEdits, setContactEdits] = useState<{ [key: number]: Contact }>(
    {}
  );

  const handleEdit = (id: number, field: keyof Contact, value: string) => {
    setContactEdits({
      ...contactEdits,
      [id]: {
        ...contacts.find((contact) => contact.id === id),
        ...contactEdits[id],
        [field]: value,
      },
    });
  };

  const saveEdit = (id: number) => {
    const updatedContact = contactEdits[id];
    if (updatedContact) {
      dispatch(editContact(updatedContact));
      setEditingContactId(null);
      setContactEdits((prev) => {
        const updatedEdits = { ...prev };
        delete updatedEdits[id];
        return updatedEdits;
      });
    }
  };

  const cancelEdit = () => {
    setEditingContactId(null);
    setContactEdits({});
  };

  return (
    <Container>
      <Title>Lista de Contatos</Title>
      <ListContainer>
        {contacts.map((contact) => (
          <ListItem key={contact.id}>
            <ContactInfo>
              {editingContactId === contact.id ? (
                <>
                  <Input
                    type="text"
                    value={contactEdits[contact.id]?.name || contact.name}
                    onChange={(e) =>
                      handleEdit(contact.id, "name", e.target.value)
                    }
                  />
                  <Input
                    type="email"
                    value={contactEdits[contact.id]?.email || contact.email}
                    onChange={(e) =>
                      handleEdit(contact.id, "email", e.target.value)
                    }
                  />
                  <Input
                    type="text"
                    value={contactEdits[contact.id]?.phone || contact.phone}
                    onChange={(e) =>
                      handleEdit(contact.id, "phone", e.target.value)
                    }
                  />
                </>
              ) : (
                <>
                  <strong>{contact.name}</strong>
                  <span>{contact.email}</span>
                  <span>{contact.phone}</span>
                </>
              )}
            </ContactInfo>
            <ButtonContainer>
              {editingContactId === contact.id ? (
                <>
                  <Button variant="edit" onClick={() => saveEdit(contact.id)}>
                    Salvar
                  </Button>
                  <Button onClick={cancelEdit}>Cancelar</Button>
                </>
              ) : (
                <>
                  <Button
                    variant="edit"
                    onClick={() => setEditingContactId(contact.id)}
                  >
                    Editar
                  </Button>
                  <Button onClick={() => dispatch(removeContact(contact.id))}>
                    Remover
                  </Button>
                </>
              )}
            </ButtonContainer>
          </ListItem>
        ))}
      </ListContainer>
      <AddButton to="/add">+</AddButton>
    </Container>
  );
};

export default ContactList;
