export default class PzTabContent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('pz-tab-content');
  }

  get namespace() {
    return this.getAttribute('namespace');
  }
}

customElements.define('pz-tab-content', PzTabContent);
