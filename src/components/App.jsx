// https://mockapi.io/projects/640c76b1a3e07380e8f52f65 - ref to server

import { useSelector } from 'react-redux';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { selectError } from 'redux/selectors';

export const App = () => {
  const errorMessage = useSelector(selectError);
  return (
    <>
      <h1>Phonebook</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </>
  );
};
