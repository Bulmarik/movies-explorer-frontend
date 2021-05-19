import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import slova from '../../../images/33slova.png';

export default function MoviesCardList() {

  return (
    <div className="movies-card-list">
      <ul className="movies-card-list__items">
        <MoviesCard img={slova} description="33 слова о дизайне 33 слова о дизайне 33 слова о дизайне" duration="1ч 47м" />
        <MoviesCard img={slova} description="33 слова о дизайне" duration="1ч 47м" />
        <MoviesCard img={slova} description="33 слова о дизайне" duration="1ч 47м" />
        <MoviesCard img={slova} description="33 слова о дизайне" duration="1ч 47м" />
        <MoviesCard img={slova} description="33 слова о дизайне" duration="1ч 47м" />
        <MoviesCard img={slova} description="33 слова о дизайне" duration="1ч 47м" />
        <MoviesCard img={slova} description="33 слова о дизайне" duration="1ч 47м" />
        <MoviesCard img={slova} description="33 слова о дизайне" duration="1ч 47м" />
        <MoviesCard img={slova} description="33 слова о дизайне" duration="1ч 47м" />
        <MoviesCard img={slova} description="33 слова о дизайне" duration="1ч 47м" />
        <MoviesCard img={slova} description="33 слова о дизайне" duration="1ч 47м" />
        <MoviesCard img={slova} description="33 слова о дизайне" duration="1ч 47м" />
      </ul>
      <button className="movies-card-list__else-btn">Ещё</button>
    </div>
  );
}