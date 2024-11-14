// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactList from "./components/ContactList";
import AddContactPage from "./components/AddContactPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/add" element={<AddContactPage />} />
      </Routes>
    </Router>
  );
};

export default App;
