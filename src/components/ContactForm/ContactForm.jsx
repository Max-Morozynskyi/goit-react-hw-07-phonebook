import { useState } from 'react';
import css from './ContactForm.module.css';
import { createContact } from 'redux/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts).map(a => a.name.toLowerCase());

  const registerTapping = evt => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const newContact = { name, number };
    if (contacts.includes(name.toLowerCase())) {
      alert(`${name} is already in your contacts!`);
      return;
    }
    dispatch(createContact(newContact));
    setName('');
    setNumber('');
  };

  return (
    <form className={css.formField} onSubmit={handleSubmit}>
      <label className={css.formLabel} htmlFor="name">
        Enter the name:{' '}
      </label>
      <input
        type="text"
        className={css.formInput}
        name="name"
        id="name"
        value={name}
        onChange={registerTapping}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={css.formLabel} htmlFor="number">
        Enter the phone number:{' '}
      </label>
      <input
        type="tel"
        className={css.formInput}
        name="number"
        id="number"
        value={number}
        onChange={registerTapping}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.formSubmit} type="submit">
        Add contact
      </button>
    </form>
  );
};
