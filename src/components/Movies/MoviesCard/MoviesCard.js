import React from "react";

export default function MoviesCard(props) {

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    if (mins >= 60) {
      return `${hours}ч ${minutes}м`;
    } else {
      return `${minutes}м`;
    }
  }

  function compareId() {
      const compareId = props.itemLike().some((res) => res === props.data.id);
      return compareId;
  }

  const btnStyle = `${window.location.pathname === '/movies'
    ? (compareId() ? 'movies-card__btn_like' : 'movies-card__btn_dislike')
    : 'movies-card__btn_del'}`;

  function saveCard() {
    props.buttonLikeClick(props.data);
  }

  return (
    <li className="movies-card" >
      <a
        className="movies-card__link element-hover"
        href={window.location.pathname === '/movies' ? `${props.data.trailerLink}` : `${props.data.trailer}`}
        target="_blank" rel="noreferrer"
      >
        <img className="movies-card__img" src={props.img} alt="Постер фильма" />
      </a>
      <div className="movies-card__description">
        <h2 className="movies-card__title">{props.data.nameRU}</h2>
        <button
          className={`movies-card__btn element-hover ${btnStyle}`}
          type="button"
          onClick={saveCard}
        />
      </div>
      <p className="movies-card__duration">{getTimeFromMins(props.data.duration)}</p>
    </li>
  );
}