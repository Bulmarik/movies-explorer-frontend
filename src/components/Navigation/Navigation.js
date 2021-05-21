import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import accIcon from '../../images/acc-icon.svg';

export default function Navigation() {

  return (
    <Switch>
      <Route exact path="/">
        <ul className="nav nav_main">
          <li>
            <Link to="/signup" className="nav__link element-hover">Регистрация</Link>
          </li>
          <li>
            <Link to="/signin" className="nav__signin-btn element-hover">Войти</Link>
          </li>
        </ul>
      </Route>
      <Route exact path={["/movies", "/saved-movies", "/profile"]}>
        <ul className="nav nav_movies">
          <li>
            <Link to="/movies" className="nav__link element-hover">Фильмы</Link>
          </li>
          <li>
            <Link to="/saved-movies" className="nav__link element-hover">Сохраненные фильмы</Link>
          </li>
          <li>
            <Link to="/profile" className="nav__profile-btn element-hover">
              <img className="nav__acc-icon" src={accIcon} alt="иконка профиля" />
              Аккаунт
            </Link>
          </li>
        </ul>
      </Route>
    </Switch>
  )
}