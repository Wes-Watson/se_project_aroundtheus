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

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }

  setProfileImage(image) {
    this._profileImage.src = image;
    console.log(this._profileImage.src);
  }
}
