import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error';
import NavBar from '../NavBar/NavBar';


export default function App() {
  const [isNavBarOpen, setIsNavBarOpen] = React.useState(false);
  
  function handleNavBarOpen() {
    setIsNavBarOpen(true)
  }

  function handleNavBarClose() {
    setIsNavBarOpen(false)
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/movies'>
          <Movies openNavBar={handleNavBarOpen} cardBtn="movies-card__btn_dislike" />
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies openNavBar={handleNavBarOpen} cardBtn="movies-card__btn_del" />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Register />
        </Route>
        <Route path='/error'>
          <Error />
        </Route>
      </Switch>

      <NavBar 
      isOpen={isNavBarOpen}
      onClose={handleNavBarClose}
      />
    </div>
  );
}
