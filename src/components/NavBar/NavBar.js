import React from 'react';
import Navigation from '../Navigation/Navigation';

export default function NavBar(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__overlay"
        onClick={props.onClose}
      />
      <div className="popup__container">
        <button 
          className="popup__close-btn element-hover" 
          type="button"
          onClick={props.onClose} >
        </button>        
        <Navigation
          onClose={props.onClose}
          hideBtn="nav__bar-btn_hide"
          popupNav="nav_popup"
          linkMain="nav__link_main" />
      </div>
    </div>
  )
}