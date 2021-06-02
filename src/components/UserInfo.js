export default class UserInfo {
    constructor({ name, about, userPic }) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(userPic);
    }

    //current data
    getUserInfo() {

        const data = {}
        data.name = this._name.textContent;
        data.about = this._about.textContent;
        data._avatar = this._avatar.src;
        // data.id = this._id;
        return data;
    }

    //assign new data
    setUserInfo({
        name,
        about,
        avatar
    }) {
        if (name) {
            (this._name.textContent = name)
        };
        if (about) {
            this._about.textContent = about
        };
        if (avatar) {
            this._avatar.src = avatar
        };
    }
}