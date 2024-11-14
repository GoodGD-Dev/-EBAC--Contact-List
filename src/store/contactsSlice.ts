import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const initialContacts: Contact[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "(11) 99999-1234",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "(22) 99999-5678",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "(33) 99999-9012",
  },
];

const contactsSlice = createSlice({
  name: "contacts",
  initialState: initialContacts,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.push(action.payload);
    },
    removeContact: (state, action: PayloadAction<number>) => {
      return state.filter((contact) => contact.id !== action.payload);
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index >= 0) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addContact, removeContact, editContact } = contactsSlice.actions;
export default contactsSlice.reducer;
export type { Contact };
