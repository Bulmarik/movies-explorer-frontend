import React from 'react';

export default function AboutProject() {

  return (
    <div className="about-project">
      <div className="main__section-header">
        <h2 className="main__section-title">О проекте</h2>
      </div>
      <div className="about-project__columns">
        <div className="about-project__column">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__time-line">
        <div className="about-project__column_1-week">
          <div className="about-project__line_1-week">1 неделя</div>
          <p className="about-project__line-description">Back-end</p>
        </div>
        <div className="about-project__column_4-week">
          <div className="about-project__line_4-week">4 недели</div>
          <p className="about-project__line-description">Front-end</p>
        </div>
      </div>
    </div>
  );
}