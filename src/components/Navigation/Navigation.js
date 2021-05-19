import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {

  return (
    <ul className="nav nav_main">
      <li className="nav__li nav__li_main">
        <Link to="signup" className="nav__link">Регистрация</Link>
      </li>
      <li className="nav__li nav__li_main">
        <button className="nav__button">Войти</button>
      </li>
    </ul>
  )
}