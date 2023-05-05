import Product from 'Main/product';
import { ApiClient } from 'shop-packages';

const trans = {
  selected: gettext('Seçildi'),
  selectAnOption: gettext('Lütfen seçimleri tamamlayınız'),
};

export default class PzVariant extends HTMLElement {
  constructor() {
    super();
  }

  get name() {
    return this.getAttribute('name');
  }

  get key() {
    return this.getAttribute('key');
  }

  get selectedOption() {
    return this.querySelector('pz-variant-option[selected]');
  }

  get type() {
    return [
      {
        pattern: 'integration_color', type: 'color'
      },
      {
        pattern: 'integration_size|integration_first_size', type: 'size'
      },
      {
        pattern: '.+', type: 'other'
      },
    ].find((node) =>
      this.key.match(new RegExp(node.pattern, 'g'))).type;
  }

  get useSelect() {
    return this.getAttribute('use-select');
  }

  get bodyHTML() {
    let html = `<div class="pz-variant__options">${this.innerHTML}</div>`;

    if (this.innerHTML.indexOf('pz-carousel') !== -1) {
      html = this.innerHTML;
    }

    if (this.useSelect) {
      html = `
        <pz-select class="js-variant-select">
          <option value="">${this.name}</option>
          ${Array.from(this.querySelectorAll('pz-variant-option')).map((opt) =>
            `<option
              value="${opt.getAttribute('value')}"
              url="${opt.getAttribute('url') ?? false}"
              ${opt.hasAttribute('selected') ? ' selected' : ''}
              ${opt.hasAttribute('disabled') ? ' disabled' : ''}>
                ${opt.getAttribute('label')}
              </option>`)}
        </pz-select>
      `;
    }

    return html;
  }

  isOptionSelected = () => this.querySelector('pz-select option[selected], pz-variant-option[selected]') !== null;

  async fetchProduct(query) {
    const $productContainer= $('.js-product-container');

    ApiClient.misc.fetchPageHtml(query).then((response) => {
      const result = $(response).find('.product-wrapper').html();

      $productContainer.html(result);
      new Product();
      setTimeout(() => {
        window.pushInsiderProductData();
      }, 200);
    }).catch(() => { });
  }

  connectedCallback() {
    const templateHtml = `
      <p class="pz-variant__selected">
        ${this.selectedOption?.getAttribute('label')
          ? `<span class="value">${this.selectedOption?.getAttribute('label')}</span>` : ''}
      </p>
      ${this.bodyHTML}
      <p class="pz-variant__required-error js-variant-required-error">${trans.selectAnOption}</p>
    `;

    this.innerHTML = templateHtml;
    this.setAttribute('rendered', '');
    this.classList.add('pz-variant', `-type-${this.type}`);

    if (this.useSelect && this.useSelect == 'redirect') {
      const select = this.querySelector('pz-select');

      select.addEventListener('change', () => {
        const urlParams = new URLSearchParams(location.search);
        const { origin, pathname } = location;

        this.dispatchEvent(new Event('change'));
        urlParams.set(this.key, select.value);

        const query = `${origin}${pathname}?${urlParams.toString()}`;

        history.pushState(null, document.title, query);
        this.fetchProduct(query);
      });
    }
  }
}

customElements.define('pz-variant', PzVariant);
