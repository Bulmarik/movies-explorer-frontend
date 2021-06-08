class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  setToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(movie) {
    // console.log(url('../images/no-img.png'))
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country || 'default',
        director: movie.director || 'default',
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image
          ? `https://api.nomoreparties.co${movie.image.url}`
          : 'https://i.stack.imgur.com/y9DpT.jpg',
        trailer: movie.trailerLink
          ? movie.trailerLink
          : 'https://www.youtube.com',
        thumbnail: movie.image
          ? `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
          : 'https://www.youtube.com',
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN || 'default',
      }),
    }).then(this._handleResponse);
  }

  cardDelete(card) {
    return fetch(`${this._baseUrl}/movies/${card._id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.diplom.bulmarik.nomoredomains.monster',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  },
});

export default mainApi;

