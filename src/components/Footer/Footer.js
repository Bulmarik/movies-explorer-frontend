import React from 'react';

export default function Footer() {

  return (
    <div className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__content">
        <p className="footer__copyright">&copy;2020</p>
        <ul className="footer__items">
          <li className="footer__item">
            <a className="footer__link element-hover" href="https://praktikum.yandex.ru" target="_blank" rel ='noreferrer'>Яндекс.Практикум</a>
          </li>
          <li className="footer__item">
            <a className="footer__link element-hover" href='https://github.com/Bulmarik' target='_blank' rel ='noreferrer'>Github</a>
          </li>
        </ul>
      </div>
    </div>
  );
}