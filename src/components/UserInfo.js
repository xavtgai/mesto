export default class UserInfo {
    constructor({ name, info }) {
            this._name = name;
            this._info = info;
        }
        //current data
    getUserInfo() {
            const data = {}
            data.name = this._name.textContent;
            data.info = this._info.textContent;
            return data;
        }
        //assign new data
    setUserInfo = (person) => {

        this._name.textContent = person.username;
        this._info.textContent = person.profession;
    }

}