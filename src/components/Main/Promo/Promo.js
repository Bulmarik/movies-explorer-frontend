import React from 'react';
import promoLogo from '../../../images/promo-logo.svg';

export default function Promo(props) {

  return (
    <div className="promo">
      <div className="promo__column">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <span className="promo__span">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</span>
        <a className="promo__btn element-hover" href="#about-project">Узнать больше</a>
      </div>
      <img className="promo__logo" src={promoLogo} alt='Логотип' />
    </div>
  );
}