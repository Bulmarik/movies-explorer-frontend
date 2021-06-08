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
    const onBlur = () => { setIsDirty(true) }
    return {
      value,
      onChange,
      onBlur,
      isDirty,
      ...valid
    }
  }
  

  // const name = useInput('', {isEmpty: true, maxLength: 30});
  // const name = useInput(currentUser.name, {isEmpty: true, maxLength: 30});
  const name = useInput(currentUser.name, {isEmpty: true});
  // const email = useInput('', {isEmpty: true, isEmail: false});
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
    // if (inputName.isDirty && inputName.maxLengthError) {
    //   if (inputName === name) {
    //     return error = 'Максимум 30 символов';
    //   }
    // }
  }

  function handleSubmit(e) {
    // console.log(currentUser.email)
    e.preventDefault();
    props.onEditProfile({name: name.value, email: email.value});
  }



  return (
    <>
      <Header
        loggedIn={props.loggedIn}
        openNavBar={props.openNavBar}
        // onClose={props.onClose}
      />
      <form className="profile__form"
        onSubmit={handleSubmit}>
        <h2 className="profile__title">{`Привет, ${currentUser.name}`}</h2>
        <div className="profile__input-block">
          <h3 className="profile__subtitle">Имя</h3>
          <span className="form__error-span" id="name-error">{errorMessage(name)}</span>
          <input
            className="profile__input profile__input_type_name"
            onChange={name.onChange}
            onBlur={name.onBlur}
            // value={inputValue.name || "Виталий"}
            // value={name.value || currentUser.name}
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
            onBlur={email.onBlur}
            // value={inputValue.email || "pochta@yandex.ru"}
            // value={email.value || currentUser.email}
            value={email.value}
            name="email"
            type="email"
            autoComplete="off"
            required />
        </div>
        <button
          className={`profile__btn profile__btn_submit ${(name.inputValid && email.inputValid) ? "profile__btn_submit_activated element-hover" : ""}`}
          disabled={!name.inputValid || !email.inputValid}
          type="submit"
          >Редактировать</button>
        <button className="profile__btn profile__btn_signout element-hover" type="button" onClick={props.onSignOut}>Выйти из аккаунта</button>
      </form>
    </>
  );
}