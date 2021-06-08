import React, {useState, useEffect} from 'react';
import {
  Route,
  Switch,
  useHistory,
  withRouter
} from 'react-router-dom';
import Fuse from 'fuse.js';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import NavBar from '../NavBar/NavBar';
import * as auth from '../../utils/auth';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTool from '../InfoTool/InfoTool';
import success from '../../images/success.svg';
import fail from '../../images/fail.svg';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [screenSize, setScreenSize] = useState(window.innerWidth)
  const [movies, setMovies] = useState([]);
  const [saveMovie, setSaveMovie] = useState([]);
  const [onCheckbox, setOnCheckbox] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [firstSearch, setFirstSearch] = useState(false);
  const [infoTool, setInfoTool] = useState({message: '', icon: ''});
  const [isInfoToolOpen, setIsInfoToolOpen] = useState(false);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const history = useHistory();
  const path = window.location.pathname;

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push(path);
          }
        })
        .catch((res) => {
          console.log(`Ошибка: ${res.status}`);
        })
    }
  }, [history])

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      tokenCheck(token);
    }
  }, []);

  function tokenCheck(token) {
    auth.getContent(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push(window.location.pathname);
          setCurrentUser(res);
        }
      })
      .catch((res) => {
        console.log(`Ошибка: ${res}`);
      })
  }

  useEffect(() => {
    if (loggedIn) {
      mainApi.getUser()
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((res) => {
          console.log(`Ошибка: ${res}`);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    const moviesSavedStorage = localStorage.getItem('saved-movies');
    if (moviesSavedStorage) {
      setSaveMovie(JSON.parse(moviesSavedStorage));
    }
  }, []);

  useEffect(() => {
    const firstSearch = localStorage.getItem('firstSearch');
    if (firstSearch) {
      setFirstSearch(JSON.parse(firstSearch));
    }
  }, [firstSearch]);

  useEffect(() => {
    const moviesSearcStorage = localStorage.getItem('movies-search');
    if (moviesSearcStorage) {
      setMovies(JSON.parse(moviesSearcStorage));
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleCloseAllPopup);
    return () => {
      document.removeEventListener('keydown', handleCloseAllPopup);
    };
  });

  function cardLike(movie) {
    const filterMovies = saveMovie
      .map((res) => res.movieId)
      .some((res) => res === movie.id);
    if (filterMovies) {
      const returnId = saveMovie.find((i) => i.movieId === movie.id);
      cardDelete(returnId);
    } else {
      mainApi.changeLikeCardStatus(movie)      
        .then((newCard) => {
          if (newCard) {
            setSaveMovie([...saveMovie, newCard]);
            localStorage.setItem(
              'saved-movies',
              JSON.stringify([...saveMovie, newCard])
            );
          }
        })
        .catch((res) => {
          console.log(`Ошибка: ${res}`);
        });
      localStorage.setItem('saved-movies', JSON.stringify(saveMovie));
    }
  }

  function cardDelete(card) {
    mainApi.cardDelete(card)
      .then((res) =>{
        if(res) {
          const newList = saveMovie.filter((c) => c._id !== card._id);
          localStorage.setItem('saved-movies', JSON.stringify(newList));
          return setSaveMovie(newList);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleEditProfile(data) {
    mainApi.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        handleInfoTooltip({
          message: 'Данные пользователя успешно изменены',
          icon: success,
        });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleRegister(data) {
    const { name, email, password } = data;
    auth.register(name, email, password)
      .then((res) => {
        if(res.status === 200){
          history.push('/movies');
          auth.authorize(email, password)
            .then((res) => {
              if (res.token) {
                localStorage.setItem('jwt', res.token);
                localStorage.setItem('saved-movies', JSON.stringify([]));
                mainApi.setToken(res.token);
                return res.token;
              }
            })
            .then((token) => {
              auth.getContent(token)
                .then((res) => {
                  if (res) {
                    setLoggedIn(true);
                    setCurrentUser(res);
                    history.push('/movies');
                  }
                })
                .catch((err) => {
                  console.log(`Ошибка: ${err}`);
                });
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
          handleInfoTooltip({
            message: `Добро пожаловать ${res.name}! Для поиска фильмов введите запрос в поле ввода`,
            icon: success,
          });
        } else {
          handleInfoTooltip({
            message: 'Пользователь с таким email уже существует',
            icon: fail,
          });
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleLogin(data) {
    const { email, password } = data;
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          mainApi.setToken(res.token);
          setLoggedIn(true);
          setCurrentUser(res);
          mainApi.getMovies()
            .then((data) => {
              const filterSavedMovies = data.filter((movie) => movie.owner === res._id);
              localStorage.setItem('saved-movies', JSON.stringify(filterSavedMovies));
              setSaveMovie(filterSavedMovies);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
          history.push('/movies');
          handleInfoTooltip({
            message: `Добро пожаловать ${res.name}! Для поиска фильмов введите запрос в поле ввода`,
            icon: success,
          });
        }
      })
      .catch((err) => {
        handleInfoTooltip({
          message: 'Неверные email или пароль',
          icon: fail,
        });
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('saved-movies');
    localStorage.removeItem('firstSearch');
    localStorage.removeItem('movies-search');
    setCurrentUser('');
    setMovies([]);
    setSaveMovie([]);
    setLoggedIn(false);
    setFirstSearch(false);
    history.push('/');
  }

  function fuseSearch(text, params) {
    if (params) {
      const fuse = new Fuse(params, {
        keys: ['nameRU'],
        includeScore: 0,
        includeMatches: true,
        findAllMatches: true,
        threshold: 0.1,
        location: 0,
      });
      const results = fuse.search(text);
      const resultsArray = results.map((result) => result.item);
      if (firstSearch === false) {
        if (window.location.pathname === '/saved-movies') {
          localStorage.setItem('movies-search', JSON.stringify(resultsArray));
          return setSaveMovie(resultsArray);
        }
        localStorage.setItem('movies-search', JSON.stringify(resultsArray));
        return setMovies(resultsArray);
      } else {
        if (window.location.pathname === '/movies') {
          localStorage.setItem('movies-search', JSON.stringify(resultsArray));
          return setMovies(resultsArray);
        }
        if (window.location.pathname === '/saved-movies') {
          localStorage.setItem('movies-search', JSON.stringify(resultsArray));
          return setSaveMovie(resultsArray);
        }
      }
    }
  }

  const onSearch = (text) => {
    if (window.location.pathname === '/saved-movies') {
      if (text) {
        const moviesSavedStorage = localStorage.getItem('saved-movies');
        const arrSavedMovies = JSON.parse(moviesSavedStorage);
        fuseSearch(text, arrSavedMovies);
      }
    }
    if (window.location.pathname === '/movies') {
      if (text) {
        if (firstSearch === false) {
          moviesApi.getMovies()
            .then((arr) => {
              if (arr) {
                setFirstSearch(true);
                localStorage.setItem('firstSearch', JSON.stringify(true));
                const resultsArray = arr.map((result) => result);
                localStorage.setItem('movies', JSON.stringify(resultsArray));
                fuseSearch(text, resultsArray);
              }
            })
            .catch((err) => {
              if (err) {
              }
            });
        }
        const moviesArrayStorage = localStorage.getItem('movies');
        const arrMovies = JSON.parse(moviesArrayStorage);
        fuseSearch(text, arrMovies);
      }
    }
  };

  function getScreenSize() {
    setScreenSize(window.innerWidth);
  }

  window.addEventListener('resize', () => {
    setTimeout(getScreenSize, 1000);
  });

  function handleNavBarOpen() {
    setIsNavBarOpen(true)
  }

  function handleInfoTooltip(data) {
    setIsInfoToolOpen(true);
    setInfoTool(data);
  }

  function handleCloseAllPopup() {
    setIsNavBarOpen(false)
    setIsInfoToolOpen(false);
  }

  function filterButtonImg() {
    const filterButtonImg = saveMovie.map((res) => res.movieId);
    return filterButtonImg;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path='/'>
            <Main
              loggedIn={loggedIn}
              openNavBar={handleNavBarOpen}
            />
          </Route>
          <ProtectedRoute
            path='/movies'
            component={Movies}
            loggedIn={loggedIn}
            openNavBar={handleNavBarOpen}
            cardBtn="movies-card__btn_dislike"
            onSearch={onSearch}
            movies={movies}
            screen={screenSize}
            onCheckbox={onCheckbox}
            setOnCheckbox={setOnCheckbox}
            buttonLikeClick={cardLike}
            itemLike={filterButtonImg}
            onError={handleInfoTooltip}
          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
            openNavBar={handleNavBarOpen}
            cardBtn="movies-card__btn_del"
            onSearch={onSearch}
            saveMovie={saveMovie}
            screen={screenSize}
            onCheckbox={onCheckbox}
            setOnCheckbox={setOnCheckbox}
            buttonLikeClick={cardDelete}
            itemLike={filterButtonImg}
            onError={handleInfoTooltip}
          />
          <ProtectedRoute
            path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            openNavBar={handleNavBarOpen}
            onSignOut={handleSignOut}
            onEditProfile={handleEditProfile}
          />
          <Route path='/signin'>
            <Login onLogin={handleLogin} />
          </Route>
          <Route path='/signup'>
            <Register onRegister={handleRegister} />
          </Route>
          <Route path='/error'>
            <Error />
          </Route>
        </Switch>
      
        <NavBar 
          isOpen={isNavBarOpen}
          onClose={handleCloseAllPopup}
        />

        <InfoTool
          isOpen={isInfoToolOpen}
          onClose={handleCloseAllPopup}
          infoTool={infoTool}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);