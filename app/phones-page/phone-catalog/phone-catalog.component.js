import { BaseComponent } from '../../common/components/base/base.component.js';

export class PhonesCatalogComponent extends BaseComponent {
  constructor({ element, phones, onPhoneSelect, onAdd }) {
    super({ element });
    this.phones = phones;
    // this.onPhoneSelect = onPhoneSelect;
    // this.onAdd = onAdd;
    this._render();

    this.on('click', '.phone-link', (event)=>{
      const liElement = event.target.closest('.thumbnail');
      // this.onPhoneSelect(liElement.dataset.id);
      this.emit('phone-select', liElement.dataset.id)
    });

    this.on('click', '.add-to-cart', (event)=>{
      const liElement = event.target.closest('.thumbnail');
     // this.onAdd(liElement.dataset.id);
      this.emit('add', liElement.dataset.id)
    });
  }

  _render() {
    this._element.innerHTML = `
          <ul class="phones">
          ${this.phones.reduce((html, phone) => {
      return `${html}     <li class="thumbnail" data-id=${phone.id}>
          <a href="#/phones/${phone.id}" class="thumb phone-link">
            <img alt=${phone.id} src=${`assets/${phone.imageUrl}`}>
          </a>
          <div class="phones__btn-buy-wrapper">
            <a class="btn btn-success add-to-cart">
              Add
            </a>
          </div>
          <a href="#/phones/${phone.id}" class="phone-link">${phone.name}</a>
          <p>${phone.snippet}</p>
        </li>`
    }, '')}
   
      </ul>
    `
  }
}
