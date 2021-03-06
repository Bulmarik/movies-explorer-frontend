import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';


export default function SavedMovies(props) {

  return (
    <div className="movies">
      <Header
        loggedIn={props.loggedIn}
        openNavBar={props.openNavBar}
        onLinkClick={props.onLinkClick}
      />
      <SearchForm
        onSearch={props.onSearch}
        onCheckbox={props.onCheckbox}
        setOnCheckbox={props.setOnCheckbox}
        onError={props.onError}
      />
      <MoviesCardList
        cardBtn={props.cardBtn}
        movies={props.saveMovie}
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