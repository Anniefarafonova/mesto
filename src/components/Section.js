

export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._initialArray = data;
       // this._items= items;
        this.renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    addItem(element) {
        this._container.append(element)
    }
    renderItems() {
    //renderer() {
        this._initialArray.forEach(item => {
            this.renderer(item)
          });
        }

      }


