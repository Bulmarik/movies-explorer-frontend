import React from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


export default function Movies(props) {

  return (
    <div className="movies">
      <Header openNavBar={props.openNavBar} />
      <SearchForm />
      <MoviesCardList cardBtn={props.cardBtn} />
      <Footer />
    </div>
  );
}
