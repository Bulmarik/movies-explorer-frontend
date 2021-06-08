import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useValidation from '../../utils/Validator/FormValidator'

export default function Login(props) {
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

  const email = useInput('', {isEmpty: true, isEmail: false});
  const password = useInput('', {isEmpty: true, minLength: 8, maxLength: 30});

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
      if (inputName === password) {
        return 'Минимум 8 символов';
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({email: email.value, password: password.value});
  }

  return (
    <div className="user-form">
      <Link to="/">
        <img className="header__logo header__logo_center element-hover" src={logo} alt='Логотип'/>
      </Link>
      <form className="form" id="form" action="#" method="post"
        onSubmit={handleSubmit}
      >
        <h2 className="form__title">Рады видеть!</h2>
        <div className="form__inputs">
          <h3 className="form__subtitle">E-mail</h3>
          <input
            className="form__input form__input_type_email"
            onChange={email.onChange}
            onFocus={email.onFocus}
            value={email.value}
            name="email"
            type="email"
            autoComplete="off"
            required />
          <div className="form__error"><span className="form__error-span" id="email-error">{errorMessage(email)}</span></div>
          <h3 className="form__subtitle">Пароль</h3>
          <input
            className="form__input form__input_type_password"
            onChange={password.onChange}
            onFocus={password.onFocus}
            value={password.value}
            name="password"
            type="password"
            autoComplete="off"
            required />
          <div className="form__error"><span className="form__error-span" id="password-error">{errorMessage(password)}</span></div>
        </div>
        <button
          className={`form__submit-btn ${(email.inputValid && password.inputValid) ? "form__submit-btn_activated element-hover" : ""}`}
          disabled={!email.inputValid || !password.inputValid}
          type="submit"
        >Войти</button>
        <p className="form__question">Ещё не зарегистрированы? <Link to="/signup" className="form__link element-hover">Регистрация</Link></p>
      </form>
    </div>
  )
}