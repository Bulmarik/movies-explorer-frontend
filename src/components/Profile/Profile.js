import React, { useState } from 'react';
import Header from '../Header/Header';
import useValidation from '../../utils/Validator/FormValidator';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);

  function useInput(initialValue, validations) {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false);
    const valid = useValidation(value, validations);
    const onChange = (e) => { setValue(e.target.value) }
    const onFocus = () => { setIsDirty(true) }
    return {
      value,
      onChange,
      onFocus,
      isDirty,
      ...valid
    }
  }
  
  const name = useInput(currentUser.name, {isEmpty: true, minLength: 2});
  const email = useInput(currentUser.email, {isEmpty: true, isEmail: false});

  function errorMessage(inputName) {
    if (inputName.isDirty && inputName.isEmpty) {
      return 'Поле не может быть пустым';
    }
    if (inputName.isDirty && inputName.isEmailError) {
      if (inputName === email) {
        return 'Некорректный Email';
      }
    }
    if (inputName.isDirty && inputName.minLengthError) {
      if (inputName === name) {
        return 'Минимум 2 символа';
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditProfile({name: name.value, email: email.value});
  }

  function checkChanges() {
    return (currentUser.name === name.value && currentUser.email === email.value)
  }

  return (
    <>
      <Header
        loggedIn={props.loggedIn}
        openNavBar={props.openNavBar}
      />
      <form className="profile__form"
        onSubmit={handleSubmit}>
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <div className="profile__input-block">
          <h3 className="profile__subtitle">Имя</h3>
          <span className="form__error-span" id="name-error">{errorMessage(name)}</span>
          <input
            className="profile__input profile__input_type_name"
            onChange={name.onChange}
            onFocus={name.onFocus}
            value={name.value}
            name="name"
            type="text"
            autoComplete="off"
            required
          />
        </div>
        <div className="profile__input-block">
          <h3 className="profile__subtitle">E-mail</h3>
          <span className="form__error-span" id="name-error">{errorMessage(email)}</span>
          <input
            className="profile__input profile__input_type_email"
            onChange={email.onChange}
            onFocus={email.onFocus}
            value={email.value}
            name="email"
            type="email"
            autoComplete="off"
            required />
        </div>
        <button
          className={`profile__btn profile__btn_submit ${(name.inputValid && email.inputValid && !checkChanges()) ? "profile__btn_submit_activated element-hover" : ""}`}
          disabled={!name.inputValid || !email.inputValid || checkChanges()}
          type="submit"
          >Редактировать</button>
        <button className="profile__btn profile__btn_signout element-hover" type="button" onClick={props.onSignOut}>Выйти из аккаунта</button>
      </form>
    </>
  );
}