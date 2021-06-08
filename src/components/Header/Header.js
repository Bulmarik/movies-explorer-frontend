import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {

  return (
    <header className={`header ${props.background}`}>
      <Link to="/">
        <img className="header__logo element-hover" src={logo} alt='Логотип'/>
      </Link>
      <Navigation
        loggedIn={props.loggedIn}
        openNavBar={props.openNavBar}
      />
    </header>
  );
}