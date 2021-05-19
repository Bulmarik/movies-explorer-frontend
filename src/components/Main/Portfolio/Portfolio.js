import React from 'react';

export default function Portfolio() {

  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__nav">
        <li className="portfolio__item">
          <p className="portfolio__text">Статичный сайт</p>↗
        </li>
        <li className="portfolio__item">
          <p className="portfolio__text">Адаптивный сайт</p>↗
        </li>
        <li className="portfolio__item">
          <p className="portfolio__text">Одностраничное приложение</p>↗
        </li>
      </ul>
    </div>
  );
}