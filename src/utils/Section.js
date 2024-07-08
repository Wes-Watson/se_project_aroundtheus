export default class Section {
  constructor({ items, renderer }, cardListSelector) {
    this._items = items;
    this._renderer = renderer;
    this._cardList = cardListSelector;
  }

  setItem(element) {
    this._cardList.append(element);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
