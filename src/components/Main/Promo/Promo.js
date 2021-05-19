import React from 'react';
import promoLogo from '../../../images/promo-logo.svg';

export default function Promo(props) {

  return (
    <div className="promo">
      <div className="promo__column">
        <h1 className="promo__title">Учебный проект студента факультета<br />Веб-разработки.</h1>
        <span className="promo__span">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</span>
        <button className="promo__btn">Узнать больше</button>
      </div>
      <img className="promo__logo" src={promoLogo} alt='Логотип' />
    </div>
  );
}