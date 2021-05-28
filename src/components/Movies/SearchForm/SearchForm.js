import React from 'react';
import searchIcon from '../../../images/find.svg';


export default function SearchForm() {
  return (
    <div className="search-form">
      <form className="search-form__form">
        <input className="search-form__input" type="search" placeholder="Фильм" required />
        <button className="search-form__btn element-hover" type="submit" >
          <img src={searchIcon} alt="Искать" />
        </button>
      </form>
      <label className="search-form__checkbox">
        <input className="search-form__checkbox-btn" type="checkbox" id="short-film"/>
        <label className="search-form__checkbox-text" htmlFor="short-film">Короткометражки</label>
      </label>
    </div>
  );
}