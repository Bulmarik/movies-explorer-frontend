import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';


export default function Register() {

  const [inputValue, setInputValue] = React.useState({
    name: "",
    email: "",
    password: ""
  })
  
  function handleChange(e) {
    const {name, value} = e.target;
    setInputValue({
      ...inputValue,
      [name]: value 
    });
  }

  return (
    <div className="user-form">
      <Link to="/">
        <img className="header__logo header__logo_center element-hover" src={logo} alt='Логотип'/>
      </Link>
      <form className="form" id="form" action="#" method="post">
        <h2 className="form__title">Добро пожаловать!</h2>
        <div className="form__inputs">
          <h3 className="form__subtitle">Имя</h3>
          <input className="form__input form__input_type_name" onChange={handleChange} value={inputValue.name} name="name" type="text" autoComplete="off" required />
          <div className="form__error"><span className="form__error-span" id="name-error"></span></div>
          <h3 className="form__subtitle">E-mail</h3>
          <input className="form__input form__input_type_email" onChange={handleChange} value={inputValue.email} name="email" type="email" autoComplete="off" required />
          <div className="form__error"><span className="form__error-span" id="email-error"></span></div>
          <h3 className="form__subtitle">Пароль</h3>
          <input className="form__input form__input_type_password" onChange={handleChange} value={inputValue.password} name="password" type="password" maxLength="30" minLength="8" autoComplete="off" required />
          <div className="form__error"><span className="form__error-span" id="password-error"></span></div>
        </div>
        <button className="form__submit-btn element-hover" type="submit">Зарегистрироваться</button>
        <p className="form__question">Уже зарегистрированы? <Link to="/signin" className="form__link element-hover">Войти</Link></p>
      </form>
    </div>
  )
}