import React from "react";

export default function MoviesCard(props) {
  return (
    <li className="movies-card">
      <img className="movies-card__img element-hover" src={props.img} alt="Постер фильма" />
      <div className="movies-card__description">
        <h2 className="movies-card__title">{props.description}</h2>
        <button className="movies-card__like-btn element-hover" type="submit"></button>
      </div>
      <p className="movies-card__duration">{props.duration}</p>
    </li>
  );
}