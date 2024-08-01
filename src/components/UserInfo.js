export default class UserInfo {
  constructor({ name, job, profileImage }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._profileImage = document.querySelector(profileImage);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._job.textContent = about;
  }

  setProfileImage(image) {
    this._profileImage.src = image;
    console.log(this._profileImage.src);
  }
}
