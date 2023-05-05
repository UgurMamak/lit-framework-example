export default class PzShareItem extends HTMLElement {
  constructor() {
    super();

    let templateHtml = `
      <pz-button
        ${this.icon && this.icon.length ? `icon=${this.icon}` : ''}
        appearance="ghost"
        link="${this.link}"
        link-target="_blank"
        ${this.rel ? `rel="${this.rel}"` : 'rel="noreferrer"'}
      >
      <pz-button>
    `;

    this.innerHTML = templateHtml;
    this.classList.add('pz-share-item');
  }

  get icon() {
    return this.getAttribute('icon');
  }

  set icon(value) {
    this.setAttribute('icon', value);
  }

  get link() {
    return this.getAttribute('link');
  }

  set link(value) {
    this.setAttribute('link', value);
  }

  get rel() {
    return this.getAttribute('rel');
  }

  set rel(value) {
    this.setAttribute('rel', value);
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
  }
}

customElements.define('pz-share-item', PzShareItem);
