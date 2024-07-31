export default class Section {
  constructor({ renderer }, cardListSelector) {
    this._renderer = renderer;
    this._cardList = cardListSelector;
  }

  setItem(element) {
    this._cardList.prepend(element);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
