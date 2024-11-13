export default class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._section = document.querySelector(sectionSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const rendered = this._renderer(item);
      this.addItem(rendered);
    });
  }

  addItem(element) {
    this._section.prepend(element);
  }
}
