export default class PzTabMenuItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const isEnabled = this.closest('.pz-tab-menu');

    if (!isEnabled) {
      return false;
    }

    this.classList.add('pz-tab-menu__item');
    this.innerHTML = `<button>${this.innerText}</button>`;
  }

  get contentAttr() {
    return this.getAttribute('content');
  }

  get active() {
    return this.hasAttribute('active');
  }

  set active(value) {
    this.setAttribute('active', value);
  }
}

customElements.define('pz-tab-menu-item', PzTabMenuItem);
