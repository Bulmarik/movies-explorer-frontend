import React, { useState, useEffect, useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import noImg from '../../../images/no-img.png';
import Preloader from '../Preloader/Preloader';

export default function MoviesCardList(props) {

  let moviesList = [];
  if (props.onCheckbox) {
    moviesList = props.movies.filter(function(el) {
      return el.duration <= 40
    })
  } else {
    moviesList = props.movies
  }

  const [blockButton, setBlockButton] = useState('movies-card-list__else-btn');
  let arrayCards = 12;
  const [listMoviesAdd, dispatch] = useReducer(
    reducer,
    {
      initialCardsState: { arrayCardsList: arrayCards },
      addCardResize: { arrayCardsList: 3 },
    },
    addCards
  );

  function addCards(state) {
    return { ...state };
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'resize':
        return addCards(action.payload);
      case 'addCards':
        return addCards({
          initialCardsState: {
            arrayCardsList:
              state.initialCardsState.arrayCardsList +
              state.addCardResize.arrayCardsList,
          },
          addCardResize: {
            arrayCardsList: state.addCardResize.arrayCardsList,
          },
        });
      default:
        return state;
    }
  }

  const itemsList = listMoviesAdd.initialCardsState.arrayCardsList;;

  useEffect(() => {
    let isMounted = false;
    if (!isMounted) {
      if (props.screen > 1044) {
        dispatch({
          type: 'resize',
          payload: {
            initialCardsState: { arrayCardsList: 12 },
            addCardResize: { arrayCardsList: 3 },
          },
        });
      }
      if (props.screen <= 1044) {
        dispatch({
          type: 'resize',
          payload: {
            initialCardsState: { arrayCardsList: 8 },
            addCardResize: { arrayCardsList: 2 },
          },
        });
      }
      if (props.screen <= 660) {
        dispatch({
          type: 'resize',
          payload: {
            initialCardsState: { arrayCardsList: 5 },
            addCardResize: { arrayCardsList: 2 },
          },
        });
      }
      if (window.location.pathname === '/saved-movies') {
        dispatch({
          type: 'resize',
          payload: {
            initialCardsState: { arrayCardsList: moviesList.length },
            addCardResize: { arrayCardsList: 0 },
          },
        });
      }
    }
    return () => {
      isMounted = true;
    };
  }, [props.screen, moviesList.length, dispatch]);

  useEffect(() => {
    if (
      window.location.pathname === '/saved-movies' ||
      moviesList.length === 0 ||
      moviesList.length < 3 ||
      listMoviesAdd.initialCardsState.arrayCardsList >= moviesList.length
    ) {
      setBlockButton('movies-card-list__else-btn_hide');
    } else {
      setBlockButton('movies-card-list__else-btn');
    }
  }, [listMoviesAdd.initialCardsState.arrayCardsList, moviesList.length]);

  function handleAddCards() {
    dispatch({ type: 'addCards' });
  }

  return (
    <div className="movies-card-list">
      {props.preloader && <Preloader />}
      <span className="movies-card-list__span">{props.searchOrder}</span>
      <ul className="movies-card-list__items">
        <Switch>
          <Route path='/movies'>
            {moviesList.slice(0, itemsList).map((data, _id) => {
              const img = data.image
                ? `https://api.nomoreparties.co${data.image.url}`
                : 'https://i.stack.imgur.com/y9DpT.jpg';
              return (
                <MoviesCard
                  key={_id}
                  data={data}
                  img={img}
                  id={data.moveId}
                  buttonLikeClick={props.buttonLikeClick}
                  itemLike={props.itemLike}
                />
              );
            })}
          </Route>
          <Route path='/saved-movies'>
            {moviesList.map((data, _id) => {
              const img = data.image ? data.image : noImg;
              return (
                <MoviesCard
                  key={_id}
                  data={data}
                  img={img}
                  id={data.moveId}
                  buttonLikeClick={props.buttonLikeClick}
                  itemLike={props.itemLike}
                />
              );
            })}
          </Route>
        </Switch>
      </ul>
      <button
        className={`${blockButton} element-hover`} 
        type="button"
        onClick={handleAddCards}
      >Ещё</button>
    </div>
  );
}