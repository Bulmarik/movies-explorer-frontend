import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import accIcon from '../../images/acc-icon.svg';
import burgerIcon from '../../images/burger-icon.svg';

export default function Navigation(props) {

  return (
    <Switch>
      {props.loggedIn === false ? (
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
      ) : (
        <Route exact path={["/movies", "/saved-movies", "/profile", "/"]}>
          <button className={`nav__bar-btn element-hover ${props.hideBtn}`} onClick={props.openNavBar}>
            <img className="nav__bar-icon" src={burgerIcon} alt="иконка бургер-меню" />
          </button>
          <div className={`nav__items ${props.popupNav}`}>
            <ul className="nav nav_movies">
              <li className="nav__item">
                <Link to="/" className={`nav__link nav__link_hidden element-hover ${props.linkMain}`} onClick={props.onLinkClick}>Главная</Link>
              </li>
              <li className="nav__item">
                <Link to="/movies" className="nav__link element-hover" onClick={props.onLinkClick}>Фильмы</Link>
              </li>
              <li className="nav__item">
                <Link to="/saved-movies" className="nav__link element-hover" onClick={props.onLinkClick}>Сохраненные фильмы</Link>
              </li>
            </ul>
            <Link to="/profile" className="nav__profile-btn element-hover" onClick={props.onLinkClick}>
              <img className="nav__acc-icon" src={accIcon} alt="иконка профиля" />
              Аккаунт
            </Link>
          </div>
        </Route>
      )}
    </Switch>
  )
}