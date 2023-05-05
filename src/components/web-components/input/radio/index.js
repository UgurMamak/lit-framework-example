import { formInput } from '../../_mixins';

export default class PzRadio extends formInput(HTMLElement) {
  constructor() {
    super();

    this.class = 'radio';
    this.classList.add('pz-radio');

    this.innerHTML = `
      <input
        type="radio"
        ${super.disabled ? 'disabled="disabled"': ''}
        class="${this.class}"
      ></input>
    `;
  }

  static get observedAttributes() {
    const attributes = ['value', 'checked'];

    return (super.observedAttributes || []).concat(attributes);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback) {
      super.attributeChangedCallback(name, oldValue, newValue);
    }

    if (!this.isConnected) {
      return false;
    }

    const radio = this.querySelector('.radio');

    if (!radio || radio?.length == 0) {
      return false;
    }

    if (name == 'value') {
      radio.value = this.value;
    }

    if (name == 'checked') {
      radio.checked = String(newValue).toLowerCase() == 'true' || newValue === 'checked' || newValue === '';
    }
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
  }

  get checked() {
    return this.formInput?.checked;
  }

  set checked(value) {
    this.formInput.checked = String(value).toLowerCase() == 'true' || value === 'checked' || value === '';
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(value) {
    this.setAttribute('value', value);
  }
}

customElements.define('pz-radio', PzRadio);
