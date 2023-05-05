export default class PzShare extends HTMLElement {
  constructor() {
    super();
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  get icon() {
    return this.getAttribute('icon');
  }

  set icon(value) {
    this.setAttribute('icon', value);
  }

  render() {
    let templateHtml = `
      <pz-button
        class="js-share-show-btn"
        ${this.icon && this.icon.length ? `icon=${this.icon}` : ''}
        appearance="ghost"
        w-full
      >
        ${this.label}
      </pz-button>

      <div class="pz-share__content">
        <div class="pz-share__content-body">
          ${this.innerHTML}
        </div>
      </div>
    `;

    this.innerHTML = templateHtml;
    this.classList.add('pz-share');
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    this.render();
  }
}

customElements.define('pz-share', PzShare);
