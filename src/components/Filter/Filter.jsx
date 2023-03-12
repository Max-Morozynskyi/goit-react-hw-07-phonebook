import { useDispatch, useSelector } from 'react-redux';
import css from './Filter.module.css';
import { selectFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilter);
  const handleFilter = evt => {
    dispatch(setFilter(evt.currentTarget.value));
  };
  return (
    <div className={css.formField}>
      <label className={css.formLabel} htmlFor="search">
        Search with name:
      </label>
      <input
        type="text"
        className={css.formInput}
        name="filter"
        id="search"
        value={filterValue}
        onChange={handleFilter}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </div>
  );
};
