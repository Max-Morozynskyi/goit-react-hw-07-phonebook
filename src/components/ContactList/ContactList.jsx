import { useDispatch, useSelector } from 'react-redux';
import css from './ContactList.module.css';
import { selectContacts, selectFilter, selectIsLoading } from 'redux/selectors';
import { deleteContact, fetchContacts } from 'redux/operations';
import { useEffect } from 'react';
import BarLoader from 'react-spinners/BarLoader';

export function ContactList() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const status = useSelector(selectIsLoading);
  useEffect(() => {
    dispatch(fetchContacts());
    // eslint-disable-next-line
  }, []);

  return (
    <ul className={css.list}>
      <BarLoader
        color="brown"
        loading={status}
        size="50px"
        cssOverride={{
          position: 'absolute',
          top: '0',
          left: '10px',
        }}
      />
      {contacts
        .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
        .map(({ id, name, number }) => (
          <li className={css.item} key={id}>
            <span>{name}:</span> <span>{number}</span>
            <button
              className={css.deleteBtn}
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
}
