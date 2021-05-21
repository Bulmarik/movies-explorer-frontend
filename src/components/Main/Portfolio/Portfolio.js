import React from 'react';

export default function Portfolio() {

  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__nav">
        <li className="portfolio__item">
          <a className="portfolio__link element-hover" href="https://bulmarik.github.io/how-to-learn/index.html" rel="noreferrer" target="_blank">
            <p className="portfolio__text">Статичный сайт</p>↗
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link element-hover" href="https://bulmarik.github.io/russian-travel/index.html" rel="noreferrer" target="_blank">
            <p className="portfolio__text">Адаптивный сайт</p>↗
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link element-hover" href="https://bulmarik.nomoredomains.club" rel="noreferrer" target="_blank">
            <p className="portfolio__text element-hover">Одностраничное приложение</p>↗
          </a>
        </li>
      </ul>
    </div>
  );
}