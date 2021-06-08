import React from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


export default function Movies(props) {

  return (
    <div className="movies">
      <Header
        loggedIn={props.loggedIn}
        openNavBar={props.openNavBar}
      />
      <SearchForm
        onSearch={props.onSearch}
        onCheckbox={props.onCheckbox}
        setOnCheckbox={props.setOnCheckbox}
        onError={props.onError}
      />
      <MoviesCardList
        cardBtn={props.cardBtn}
        movies={props.movies}
        screen={props.screen}
        onCheckbox={props.onCheckbox}
        buttonLikeClick={props.buttonLikeClick}
        itemLike={props.itemLike}
        preloader={props.preloader}
        searchOrder={props.searchOrder}
      />
      <Footer />
    </div>
  );
}
