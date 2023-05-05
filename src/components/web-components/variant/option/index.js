export default class PzVariantOption extends HTMLElement {
  constructor() {
    super();
  }

  get url() {
    return this.getAttribute('url');
  }

  get label() {
    return this.getAttribute('label');
  }

  get value() {
    return this.getAttribute('value');
  }

  get selected() {
    return this.hasAttribute('selected');
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get selectable() {
    return this.hasAttribute('selectable');
  }

  get variantKey() {
    return this.closest('pz-variant').key;
  }

  connectedCallback() {
    const urlParams = new URLSearchParams(location.search);

    urlParams.set(this.variantKey, this.value);

    const templateHtml = `
    <a href="${this.url}">${this.innerHTML}</a>
    `;

    this.innerHTML = templateHtml;
    this.classList.add('pz-variant__option', 'js-variant-option');
    this.classList.toggle('-disabled', this.disabled);
    this.classList.toggle('-selected', this.selected);
    this.classList.toggle('-selectable', this.selectable);
    this.querySelector('a').addEventListener('click', () => {
      this.closest('pz-variant').dispatchEvent(new Event('change'));
    });
  }
}

customElements.define('pz-variant-option', PzVariantOption);
