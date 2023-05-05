import {
  appearance, formInput, mask, size, vEmail, vMaxlength, vMinlength, wFull
} from '../_mixins';

export default class PzInput
  extends appearance(size(mask(vEmail(vMinlength(vMaxlength(formInput(wFull(HTMLElement)))))))) {
  constructor() {
    super();

    this.class = 'input';
    this.classList.add('pz-input');
    this.error ? this.classList.add('-error') : false;

    this.innerHTML = `
      <input
        type="${this.type}"
        ${this.readonly ? 'readonly="readonly"' : ''}
        ${this.pattern ? `pattern="${this.pattern}"` : ''}
        ${this.autocomplete ? `autocomplete="${this.autocomplete}"` : ''}
        ${this.inputmode ? `inputmode="${this.inputmode}"` : ''}
        class="input"
      ></input>
      ${this.icon ? `<i class="input-icon ${this.icon}"></i>` : ''}
    `;
  }

  static get observedAttributes() {
    const attributes = [];

    return (super.observedAttributes || []).concat(attributes);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback) {
      super.attributeChangedCallback(name, oldValue, newValue);
    }

    if (this.isConnected) {
      return false;
    }
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
  }

  get type() {
    return this.getAttribute('type') || 'text';
  }

  set type(value) {
    this.setAttribute('type', value);
  }

  get readonly() {
    return this.hasAttribute('readonly');
  }

  set readonly(value) {
    this.setAttribute('readonly', value);
  }

  get pattern() {
    return this.getAttribute('pattern');
  }

  set pattern(value) {
    this.setAttribute('pattern', value);
  }

  get autocomplete() {
    return this.getAttribute('autocomplete');
  }

  set autocomplete(value) {
    this.setAttribute('autocomplete', value);
  }

  get inputmode() {
    return this.getAttribute('inputmode');
  }

  set inputmode(value) {
    this.setAttribute('inputmode', value);
  }

  get icon() {
    return this.getAttribute('icon');
  }

  set icon(value) {
    this.setAttribute('icon', value);
  }

  get error() {
    return this.hasAttribute('error');
  }

  set error(value) {
    this.setAttribute('error', value);
  }
}

customElements.define('pz-input', PzInput);
