import React from 'react';
import Header from '../Header/Header';

export default function Profile() {

  const [inputValue, setInputValue] = React.useState({
    name: "",
    email: ""
  })
  
  function handleChange(e) {
    const {name, value} = e.target;
    setInputValue({
      ...inputValue,
      [name]: value 
    });
  }

  return (
    <>
      <Header />
      <form className="profile__form">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <div className="profile__input-block">
          <h3 className="profile__subtitle">Имя</h3>
          <input className="profile__input profile__input_type_name" onChange={handleChange} value={inputValue.name || "Виталий"} name="name" type="text" autoComplete="off" required />
        </div>
        <div className="profile__input-block">
          <h3 className="profile__subtitle">E-mail</h3>
          <input className="profile__input profile__input_type_email" onChange={handleChange} value={inputValue.email || "pochta@yandex.ru"} name="email" type="email" autoComplete="off" required />
        </div>
        <button className="profile__btn profile__btn_submit element-hover" type="submit">Редактировать</button>
        <button className="profile__btn profile__btn_signout element-hover" type="button">Выйти из аккаунта</button>
      </form>
    </>
  );
}