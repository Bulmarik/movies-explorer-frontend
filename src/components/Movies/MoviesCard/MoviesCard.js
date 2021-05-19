import React from "react";

export default function MoviesCard(props) {
  return (
    <li className="movies-card">
      <img className="movies-card__img" src={props.img} alt="Постер фильма" />
      <div className="movies-card__desc">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{props.description}</h2>
          <p className="movies-card__duration">{props.duration}</p>
        </div>
        <button className="movies-card__like-btn" type="submit"></button>
      </div>
    </li>
  );
}