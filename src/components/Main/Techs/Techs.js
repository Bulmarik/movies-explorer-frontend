import React from 'react';

export default function Techs() {

  return (
    <div className="techs">
      <div className="main__section-header">
        <h2 className="main__section-title">Технологии</h2>
      </div>
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__items">
        <li className="techs__item">HTML</li>
        <li className="techs__item">CSS</li>
        <li className="techs__item">JS</li>
        <li className="techs__item">React</li>
        <li className="techs__item">Git</li>
        <li className="techs__item">Express.js</li>
        <li className="techs__item">mongoDB</li>
      </ul>
    </div>
  );
}