export default class Api {
    constructor(options) {
      this._url = options.baseUrl
      this._headers = options.headers
      this._authorization = options.headers.authorization
    }
  
    getInitialCards() {
      // ...
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }

    getInfo(){
      return fetch(`${this._url}/users/me`, {
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse)
      //.then(res => res.ok ? res.json(): Promise.reject)
    }
    getCard(){
      return fetch(`${this._url}/cards`, {
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse)
    }
  }