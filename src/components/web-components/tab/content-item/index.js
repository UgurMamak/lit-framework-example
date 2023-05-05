export default class PzTabContentItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('pz-tab-content-item');
  }

  get menuAttr() {
    return this.getAttribute('menu');
  }

  get active() {
    return this.hasAttribute('active');
  }
}

customElements.define('pz-tab-content-item', PzTabContentItem);
