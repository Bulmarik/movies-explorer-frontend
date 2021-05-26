import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


export default function SavedMovies() {

  return (
    <div className="movies">
      <Header background="header_movies"/>
      <SearchForm />
      <MoviesCardList hideBtn="movies-card-list__else-btn-hide"/>
      <Footer />
    </div>
  );
}