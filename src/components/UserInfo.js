export default class UserInfo {
    constructor({ name, info, id }) {
            // this._name = document.querySelector(name);
            // this._info = document.querySelector(info);
            this._id = id;
        }
        //current data
    getUserInfo() {
            const data = {}
                // data.name = this._name.textContent;
                // data.info = this._info.textContent;
                // data.id = this._id;
            return data;
        }
        //assign new data
    setUserInfo = (person) => {

        // this._name.textContent = person.username;
        // this._info.textContent = person.profession;
        this._id = person.id;
    }
    setUserInfo2 = (person) => {

        this._name = person.name;
        this._info = person.about;
        this._id = person._id;
    }
    getUserInfo2() {
        const data = {}
        data.name = this._name;
        data.info = this._info;
        data.id = this._id;
        return data;
    }

}