
class Api {
    constructor (baseUrl) {
        this._baseUrl = baseUrl;
    }

    _getResponseData (response) {
        if(response.ok) {
            return response.json()
        } else {
            return Promise.reject(`Ошибка ${response.status}`)
        }
    }

    getCards () {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "content-type": 'application/json; charset=UTF-8'
            },
            credentials: 'include',
        })
        .then(response => {
            return this._getResponseData(response);
        })
    }

    addCard(card){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "content-type": 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
        .then(response => {
            return this._getResponseData(response);
        })
    }

    getUserInfo() {
        return fetch (`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "content-type": 'application/json; charset=UTF-8'
            },
        })
        .then((response) => {
            return this._getResponseData(response);
        })
    }

    editUserInfo(userData) {
        return fetch (`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "content-type": 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
        .then(response => {
            return this._getResponseData(response);
        })
    }

    deleteCard(cardId) {
        
        return fetch (`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "content-type": 'application/json; charset=UTF-8'
            },
        })
        .then(response => {
            return this._getResponseData(response);
        })
    }

    changeLikeCardStatus (cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: !isLiked ? 'PUT' : 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "content-type": 'application/json; charset=UTF-8'
            },
        }).then(response => {
            return this._getResponseData(response);
        })
    }

    editAvatar (data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "content-type": 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(response => {
            return this._getResponseData(response);
        })
    }

    getInitialInfo() {
        return Promise.all([this.getUserInfo(), this.getCards()]);
    }
}


// const api = new Api('http://127.0.0.1:3000');
const api = new Api('https://api.bambyary.nomoreparties.co');

export default api;