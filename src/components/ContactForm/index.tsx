import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact, editContact, Contact } from "../../store/contactsSlice";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button<{ variant?: string }>`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  background-color: ${({ variant }) =>
    variant === "cancel" ? "#f44336" : "#4CAF50"};
`;

interface ContactFormProps {
  existingContact?: Contact;
  onSave: () => void;
  onCancel?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  existingContact,
  onSave,
  onCancel,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(existingContact ? existingContact.name : "");
  const [email, setEmail] = useState(
    existingContact ? existingContact.email : ""
  );
  const [phone, setPhone] = useState(
    existingContact ? existingContact.phone : ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contact: Contact = {
      id: existingContact ? existingContact.id : Date.now(),
      name,
      email,
      phone,
    };
    if (existingContact) {
      dispatch(editContact(contact));
    } else {
      dispatch(addContact(contact));
    }
    onSave();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Nome completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Telefone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <ButtonGroup>
        {existingContact && onCancel && (
          <Button type="button" variant="cancel" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit">
          {existingContact ? "Salvar" : "Adicionar"} Contato
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default ContactForm;
