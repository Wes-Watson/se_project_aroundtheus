export default class UserInfo{
    constructor({name,job}){
        this._name = name;
        this._job = job
    }

    getUserInfo(){
        const userInfo= {}

    }

    setUserInfo({name, job}){
this._name.textContent = name;
this._job.textContent = job;
    }
}