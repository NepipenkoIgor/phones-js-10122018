import { PhonesCatalogComponent } from './phone-catalog/phone-catalog.component.js';
import { OnePhoneViewComponent } from './one-phone-view/one-phone-view.component.js';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component.js';
import { PhonesPageService } from './phones-page.service.js';
import { FilterComponent } from './filter/filter.component.js';

export class PhonesPageComponent {
  constructor({ element }) {
    this.element = element;
    this.state = { text: '', orderBy: 'name' };
    this._render();
    this._phoneService = new PhonesPageService();
    this._initCatalog();
    this._initOnePhoneView();
    this._initCart();
    this._initFilter();
  }

  // <phone-catalog [phones]="phones" (phoneSelect)="onPhoneSelect" onAdd="onAdd" >
  // </phone-catalog>

  _initCatalog() {
    this._phoneCatalog = new PhonesCatalogComponent({
      element: this.element.querySelector('#catalog'),
      // phones: this._phoneService.getAllPhones(),
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
    this._showFilteredPhones();
    this._phoneCatalog.subscribe('phone-select', (phoneId) => {
      const phoneDetails = this._phoneService.getPhonesById(phoneId);
      this._phoneCatalog.hide();
      this._phoneViewer.show(phoneDetails);
    })

    this._phoneCatalog.subscribe('add', (phoneId) => {
      this._shoppingCart.add(phoneId);
    })

  }

  _initOnePhoneView() {
    this._phoneViewer = new OnePhoneViewComponent({
      element: this.element.querySelector('#item'),
    });
    this._phoneViewer.subscribe('back', () => {
      // this._phoneCatalog.show();
      this._showFilteredPhones();
      this._phoneViewer.hide();
    });

    this._phoneViewer.subscribe('add', (phoneId) => {
      this._shoppingCart.add(phoneId);
    })
  }

  _initCart() {
    this._shoppingCart = new ShoppingCartComponent({
      element: document.querySelector('#shopping-cart')
    })
  }

  _initFilter() {
    this._filter = new FilterComponent({
      element: document.querySelector('#filter')
    });
    this._filter.subscribe('text-search', (text) => {
      // this.state.text = text;
      this.state = { ...this.state, text };
      this._showFilteredPhones();
    });
    this._filter.subscribe('sorting', (type) => {
      this.state = { ...this.state, orderBy: type };
      this._showFilteredPhones();
    });
  }

  _showFilteredPhones() {
    const filteredPhonesPromise = this._phoneService.getAllPhones(
      this.state,
      // (filteredPhones) => {
      //   this._phoneCatalog.show(filteredPhones);
      // }
    );
    filteredPhonesPromise
      .then(filteredPhones => {
        this._phoneCatalog.show(filteredPhones);
      })
      .catch((err) => {
        console.log(err);
      })

    // const somePromise = new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res('I love JS')
    //   }, 3000)
    // })
    //
    // console.log(filteredPhonesPromise);


    // Promise.all([filteredPhonesPromise, somePromise, Promise.resolve('TypeScript')])
    //   .then(([phones, text1, text2]) => {
    //     console.log(phones, text1, text2)
    //     this._phoneCatalog.show(phones);
    //     console.log('P0', phones)
    //     return somePromise;
    //   })
    //   .catch((e) => {
    //     console.log('ERROR=>', e)
    //   })
    //   .then(phones => {
    //     console.log('P1', phones)
    //   })
    //   .then(phones => {
    //     console.log('P2', phones)
    //   })


  }

  _render() {
    this.element.innerHTML = ` <div class="row">

    <!--Sidebar-->
    <div class="col-md-2">
    <div id="filter"></div>

   <!--Cart content-->
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

// checkToken('token', (token) => {
//   getUser('user', (user) => {
//     myCourse('user.id', (courses) => {
//       getVideo('courses.currentVideo', () => {
//
//       })
//     })
//   })
// }

// async function a(){
//   try {
//     const token = await checkToken('token');
//     const user = await getUser('token');
//     const courses = await myCourse('user.id');
//     const video = await getVideo('courses.currentVideo');
//
//   } catch (e) {
//
//   }
// }
// a()
//
// checkToken('token')
//   .then(token => getUser('token'))
//   .then(user => myCourse('user.id'))
//   .then(courses => getVideo('courses.currentVideo'))
//   .then(video => {
//     // video;
//   })
//   .catch();
