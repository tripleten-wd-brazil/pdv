export default class Section {
  constructor({ items, renderer }, selector) {
    this._sectionElement = document.querySelector(selector);
    this._items = items;
    this._renderer = renderer;
  }

  renderItems() {
    this._items.forEach(this.addItem.bind(this));
  }

  addItem(item) {
    const renderedItem = this._renderer(item);
    this._sectionElement.append(renderedItem);
  }
}

