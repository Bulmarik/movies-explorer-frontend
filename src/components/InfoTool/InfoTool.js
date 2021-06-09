import React from 'react';

export default function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__overlay" onClick={props.onClose} />
      <div className="popup__container">
        <button className="popup__close-btn element-hover" type="button" onClick={props.onClose} />
        <img className="popup__icon" src={props.infoTool.icon} alt="иконка состояния" />
        <h3 className="popup__title">{props.infoTool.message}</h3>
      </div>
    </div>
  )
}