import { formInput } from '../../_mixins';

const trans = {
  slctTxt: gettext('henüz dosya seçilmedi'),
  btnTxt: gettext('YÜKLE'),
};

export default class PzFile extends formInput(HTMLElement) {
  constructor() {
    super();

    this.input = undefined;
    this.class = 'file';

    this.classList.add('pz-file');

    this.innerHTML = `
      <div class="pz-file__button-wrapper">
        <pz-button appearance="${this.appearance}">
          ${this.buttonText}
        </pz-button>
        <span class="pz-file__selection-text">
          ${trans.slctTxt}
        </span>
      </div>
      <input
        type="file"
        ${super.name ? `name="${super.name}"` : ''}
        ${super.id ? `id="${super.id}"` : `id="${this.uid}"`}
        ${super.disabled ? 'disabled="disabled"': ''}
        ${this.multiple ? 'multiple="multiple"': ''}
        ${`accept="${this.accept}"`}
        class="${super.classes} hidden"
      ></input>
    `;

    window.addEventListener('DOMContentLoaded', () => {
      this.input = this.querySelector('input[type="file"]');

      this.querySelector('pz-button').addEventListener('click', () => {
        this.input.click();
      });

      this.input.addEventListener('change', () => {
        const selectionTextEl = this.querySelector('.pz-file__selection-text');

        if (this.input.files.length && this.multiple) {
          const files = [...this.input.files].map((file) => file.name).join(', ');

          return selectionTextEl.innerText = files;
        }

        if (this.input.files.length && !this.multiple) {
          return selectionTextEl.innerText = this.input.files[0].name;
        }

        if (!this.input.files.length) {
          selectionTextEl.innerText = trans.slctTxt;
        }
      });
    });
  }

  static get observedAttributes() {
    const attributes = [];

    return (super.observedAttributes || []).concat(attributes);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback) {
      super.attributeChangedCallback(name, oldValue, newValue);
    }
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
  }

  get accept() {
    return this.getAttribute('accept') || '.txt,.png,.jpg,.jpeg,.doc,.docx,.xml,application/msword';
  }

  set accept(value) {
    this.setAttribute('accept', value);
  }

  get multiple() {
    return this.hasAttribute('multiple');
  }

  set multiple(value) {
    this.setAttribute('multiple', value);
  }

  get buttonText() {
    return this.getAttribute('button-text') || trans.btnTxt;
  }

  set buttonText(value) {
    this.setAttribute('button-text', value);
  }
}

customElements.define('pz-file', PzFile);
