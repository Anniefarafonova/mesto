

export default class Section {
    constructor(renderer, containerSelector) {
      //  this._initialArray = data;
       // this._items= items;
        this.renderer = renderer;
        this._container = document.querySelector(containerSelector); 
    }
    addItem(element) {
       //this._container.append(element)
       this._container.prepend(element)
    }
    renderItems(data) {
    //renderer() {
        data.forEach(item => {
            this.renderer(item)
          });
        }

      }


