import { formInput } from '../../_mixins';

export default class PzCheckbox extends formInput(HTMLElement) {
  constructor() {
    super();

    this.class = 'checkbox';
    this.classList.add('pz-checkbox');

    this.innerHTML = `
      <input
        type="checkbox"
        ${this.hasAttribute('checked') ? 'checked="checked"' : ''}
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

    const checkbox = this.querySelector('.checkbox');

    if (!checkbox || checkbox?.length == 0) {
      return false;
    }

    if (name == 'value') {
      checkbox.value = this.value;
    }

    if (name == 'checked') {
      checkbox.checked = String(newValue).toLowerCase() == 'true' || newValue === 'checked' || newValue === '';
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

customElements.define('pz-checkbox', PzCheckbox);
