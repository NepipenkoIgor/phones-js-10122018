// class CustomPromise {
//   constructor(controlFn) {
//     this._status = 'pending';
//     this._successCbs = [];
//
//     controlFn(this._resolve.bind(this))
//   }
//
//   then(successCb) {
//     if (this._status === 'fulfilled') {
//       successCb(this._result);
//       return;
//     }
//     this._successCbs.push(successCb)
//
//   }
//
//   _resolve(data) {
//     this._status = 'fulfilled';
//     this._result = data;
//     this._successCbs.forEach((successCb) => {
//       successCb(data)
//     })
//   }
// }

const BASE_URL = 'https://nepipenkoigor.github.io/phones-js-10122018';

export class PhonesPageService {

  async getAllPhones({ text, orderBy }) {
    // const phones  = fetch(`${BASE_URL}/mocked-data/phones/phones.json`)
    //   .then((res) => res.json())
    //   .then((phones) => {
    //     const searchedPhones = this._searchByText(phones, text);
    //     const sortedPhones = this._sort(searchedPhones, orderBy);
    //     return sortedPhones;
    //   });
    const phones = await fetch(`${BASE_URL}/mocked-data/phones/phones.json`)
      .then((res) => res.json());
    const searchedPhones = this._searchByText(phones, text);
    const sortedPhones = this._sort(searchedPhones, orderBy);
    return sortedPhones;
  }

  async getPhonesById(id) {
    // return fetch(`${BASE_URL}/mocked-data/phones/${id}.json`)
    //   .then((res) => res.json());
    return await fetch(`${BASE_URL}/mocked-data/phones/${id}.json`)
      .then((res) => res.json());
  }

  _fetch(path, method = 'GET') {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${BASE_URL}/mocked-data/phones${path}.json`, true);
      xhr.send();
      xhr.addEventListener('load', () => {
        if (xhr.status !== 200) {
          rej(`${xhr.status} ${xhr.statusText} `)
        } else {
          res(JSON.parse(xhr.responseText));
        }
      })
    })
  }

  _searchByText(phones, searchText) {
    if (!searchText) {
      return phones;
    }
    return phones.filter(phone => {
      return phone.name.toLowerCase()
        .includes(searchText.toLowerCase());
    });
  }

  _sort(phones, orderBy) {
    if (!orderBy) {
      return phones
    }
    return [...phones]
      .sort((phone1, phone2) => {
        return phone1[orderBy] > phone2[orderBy]
          ? 1
          : -1
      });
  }
}
