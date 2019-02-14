import { PhonesCatalogComponent } from './phone-catalog/phone-catalog.component.js';
import { OnePhoneViewComponent } from './one-phone-view/one-phone-view.component.js';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component.js';
import { PhonesPageService } from './phones-page.service.js';

export class PhonesPageComponent {
  constructor({ element }) {
    this.element = element;
    this._render();
    this._phoneService = new PhonesPageService();
    this._initCatalog();
    this._initOnePhoneView();
    this._initCart()
  }

  _initCatalog() {
    this._phoneCatalog = new PhonesCatalogComponent({
      element: this.element.querySelector('#catalog'),
      phones: this._phoneService.getAllPhones(),
      // onPhoneSelect: (phoneId) => {
      //   const phoneDetails = this._phoneService.getPhonesById(phoneId);
      //   this._phoneCatalog.hide();
      //   this._phoneViewer.show(phoneDetails);
      // },
      // onAdd: (phoneId) => {
      //   console.log(phoneId);
      //   //TODO add cart
      //   this._shoppingCart.add(phoneId);
      // }
    });
    this._phoneCatalog.subscribe('phone-select', (phoneId) => {
        const phoneDetails = this._phoneService.getPhonesById(phoneId);
        this._phoneCatalog.hide();
        this._phoneViewer.show(phoneDetails);
      })

    this._phoneCatalog.subscribe('add',(phoneId)=>{
      this._shoppingCart.add(phoneId);
    })

  }

  _initOnePhoneView() {
    this._phoneViewer = new OnePhoneViewComponent({
      element: this.element.querySelector('#item'),
    });
    this._phoneViewer.subscribe('back',()=>{
      this._phoneCatalog.show();
      this._phoneViewer.hide();
    });

    this._phoneViewer.subscribe('add',(phoneId)=>{
      this._shoppingCart.add(phoneId);
    })
  }

  _initCart() {
   this._shoppingCart = new ShoppingCartComponent({
     element: document.querySelector('#shopping-cart')
   })
  }

  _render() {
    this.element.innerHTML = ` <div class="row">

    <!--Sidebar-->
    <div class="col-md-2">
      <section>
        <p>
          Search:
          <input>
        </p>

        <p>
          Sort by:
          <select>
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
          </select>
        </p>
      </section>

 <div id="shopping-cart"></div>

    </div>

    <!--Main content-->
    <div class="col-md-10" >
 <div id="catalog"></div>
 <div id="item"></div>

    </div>
  </div>`;
  }
}
