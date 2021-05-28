import React from 'react';
import myPhoto from '../../../images/Avatar.jpg';

export default function AboutMe() {

  return (
    <div className="about-me">
      <div className="main__section-header">
        <h2 className="main__section-title">Студент</h2>
      </div>
      <div className="about-me__content">
        <div className="about-me__column">
          <div className="about-me__info">
            <h3 className="about-me__name">Марат Булатов</h3>
            <h4 className="about-me__profession">Фронтенд-разработчик, 39 лет</h4>
            <p className="about-me__biography">Я родился и живу в столице Сибири - в Новосибирске. Закончил Новосибирский автотранспортный техникум, потом продолжил обучение в НГАУ. Долгое время работал по специальности, потом не по специальности, но с большей зарплатой - таковы реалии. Но с компьютером всегда был на "ты" и недавно открыл для себя мир кодинга. Решил расширить свою специализацию и прошел курс по веб-разработке. В итоге, в довесок ко всем способностям обрел новое ремесло. На данный момент планирую заниматься фрилансом и полностью перепрофилироваться на веб-разработку.</p>
          </div>        
          <div className="about-me__social">
            <a className="about-me__social-link element-hover" href='https://github.com/Bulmarik' target='_blank' rel ='noreferrer'>Github</a>
          </div>
        </div>
        <img className="about-me__photo" src={myPhoto} alt='Моё фото' />
      </div>
    </div>
  );
}