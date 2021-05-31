export default class Api {
    constructor({
        baseUrl,
        headers
    }) {
        this.baseurl = baseUrl;
        this.headers = headers;

    }

    _handleResponse(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(`${this.baseurl}/cards`, { headers: this.headers })
            .then(this._handleResponse);
    }
    myData() {
        return fetch(`${this.baseurl}/users/me`, { headers: this.headers })
            .then(this._handleResponse);
    }
    profileEdit(user_name, user_description) {
        return fetch(`${this.baseurl}/users/me`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    name: user_name,
                    about: user_description
                })
            })
            .then(this._handleResponse);
    }
    avatarReplace(avatar) {
        return fetch(`${this.baseurl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    avatar: avatar
                })
            })
            .then(this._handleResponse);
    }
    addCard(card_title, card_link) {
        return fetch(`${this.baseurl}/cards`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    name: card_title,
                    link: card_link
                })
            })
            .then(this._handleResponse);
    }
    deleteCard(card_id) {
        return fetch(`${this.baseurl}/cards/${card_id}`, {
                method: 'DELETE',
                headers: this.headers
            })
            .then(this._handleResponse);
    }
    addLike(card_id) {
        return fetch(`${this.baseurl}/cards/likes/${card_id}`, {
                method: 'PUT',
                headers: this.headers
            })
            .then(this._handleResponse)
    }
    removeLike(card_id) {
        return fetch(`${this.baseurl}/cards/likes/${card_id}`, {
                method: 'DELETE',
                headers: this.headers
            })
            .then(this._handleResponse);
    }

    getCards() {
        return fetch(`${this.baseurl}/cards`, { headers: this.headers })
            .then(result => result.ok ? result.json() : Promise.reject(`${result.status}`))
    }

}