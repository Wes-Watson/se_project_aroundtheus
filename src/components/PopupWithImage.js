import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor( popupSelector ) {
    super( {popupSelector} );
    this._modalImage = this._selector.querySelector(".modal__card-image");
    this._modalDescription = this._selector.querySelector(".modal__image-description");
    //this._image = popupSelector.quereySelector("");
  }

  open({name,link}) {
    this._modalImage.src = link;
    this._modalImage.alt = name;
    this._modalDescription.textContent = name;
    super.open();
  }


}


export default PopupWithImage