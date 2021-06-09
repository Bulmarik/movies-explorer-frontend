import React from 'react';
import Navigation from '../Navigation/Navigation';

export default function NavBar(props) {
  return (
    <div className={`bar ${props.isOpen ? "bar_opened" : ""}`}>
      <div className="bar__overlay"
        onClick={props.onClose}
      />
      <div className="bar__container">
        <button 
          className="bar__close-btn element-hover" 
          type="button"
          onClick={props.onClose} >
        </button>        
        <Navigation
          onLinkClick={props.onLinkClick}
          hideBtn="nav__bar-btn_hide"
          popupNav="nav_popup"
          linkMain="nav__link_main" />
      </div>
    </div>
  )
}