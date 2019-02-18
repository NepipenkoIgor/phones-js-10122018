import { BaseComponent } from '../../common/components/base/base.component.js';

export class FilterComponent extends BaseComponent {
  constructor({ element }) {
    super({ element });
    this._render();

    this.on('input','.search', (event) =>{
      this.emit('text-search', event.delegateTarget.value)
    });

    this.on('change','.sort', (event) =>{
      this.emit('sorting', event.delegateTarget.value)
    })
  }

  _render() {
    this._element.innerHTML = `
      <section>
        <p>
          Search:
          <input class="search">
        </p>

        <p>
          Sort by:
          <select class="sort">
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
          </select>
        </p>
      </section>`
  }
}
