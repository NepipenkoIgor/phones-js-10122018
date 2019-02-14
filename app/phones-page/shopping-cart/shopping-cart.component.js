import { BaseComponent } from '../../common/components/base/base.component.js';

export class ShoppingCartComponent extends BaseComponent {

  constructor({ element }) {
    super({ element });
    this._items = {};
    this._render();
    this.on('click', '.remove', (event)=>{
     this._remove(event.delegateTarget.dataset.id)
    });
  }


  add(phoneId) {
    if(!this._items[phoneId]){
      this._items[phoneId] = 0;
    }
    this._items[phoneId] += 1;
    this._render();
  }

  _remove(phoneId) {
    this._items[phoneId] -= 1;
    if(this._items[phoneId] === 0){
     delete this._items[phoneId];
    }
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <section>
        <p>Shopping Cart</p>
        <ul>
           ${Object.entries(this._items).reduce((html, [phoneId, quantity])=>{
             return `${html} <li>${phoneId} (${quantity})
  <button class="remove" data-id="${phoneId}">x</button>
</li>`
    },'')}
        </ul>
      </section>
    `
  }
}
