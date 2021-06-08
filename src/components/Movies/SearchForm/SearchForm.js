import React, { useState } from 'react';
import searchIcon from '../../../images/find.svg';
import useValidation from '../../../utils/Validator/FormValidator';
import fail from '../../../images/fail.svg';

export default function SearchForm(props) {
  function useInput(initialValue, validations) {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false);
    const valid = useValidation(value, validations);
    const onChange = (e) => {setValue(e.target.value)}
    const onBlur = () => {setIsDirty(true)}
    return {
      value,
      onChange,
      onBlur,
      isDirty,
      ...valid
    }
  }

  const keyword = useInput('', {isEmpty: true})

  // function errorMessage(inputName) {
  //   if (inputName.isDirty && inputName.isEmpty) {
  //     return 'Нужно ввести ключевое слово';
  //   }
  // }

  function handleSubmit(e) {
    e.preventDefault();
    if (!keyword.inputValid) {
      props.onError({
        message: 'Нужно ввести ключевое слово',
        icon: fail,
      });
    } else {
      props.onSearch(keyword.value);
    }
  }

  function handleCheckbox() {
    props.setOnCheckbox(!props.onCheckbox);
  }

  return (
    <div className="search-form">
      <form className="search-form__form"
        onSubmit={handleSubmit}
      >
        <input className="search-form__input" 
          onChange={keyword.onChange}
          onBlur={keyword.onBlur}
          value={keyword.value}
          type="search"
          placeholder="Фильм"
        />
        {/* <span className="form__error-span form__error-span_search" id="name-error">{errorMessage(keyword)}</span> */}
        <button className="search-form__btn element-hover" type="submit" >
          <img src={searchIcon} alt="Искать" />
        </button>
      </form>
      <label className="search-form__checkbox">
        <input
          className="search-form__checkbox-btn"
          type="checkbox"
          id="short-film"
          onChange={handleCheckbox}
        />
        <label className="search-form__checkbox-text" htmlFor="short-film">Короткометражки</label>
      </label>
    </div>
  );
}