export default class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._section = document.querySelector(sectionSelector);
  }

  renderInitialProducts() {
    this._items.forEach(this.addItem);
  }

  addItem = (item) => {
    const renderedElement = this._renderer(item);
    this._section.prepend(renderedElement);
  };
}
