const trans = {
  close: gettext('Kapat'),
  confirm: gettext('Onayla'),
};

export default class PzModal extends HTMLElement {
  constructor() {
    super();
  }

  get theme() {
    return this.getAttribute('theme') || 'zero';
  }

  get type() {
    return this.getAttribute('type') || 'modal';
  }

  get icon() {
    return this.getAttribute('icon');
  }

  get modalTitle() {
    return this.getAttribute('modal-title');
  }

  get noButton() {
    return this.hasAttribute('no-button');
  }

  set noButton(value) {
    this.setAttribute('no-button', value);
  }

  set modalTitle(value) {
    this.setAttribute('modal-title', value);
  }

  set className(value) {
    this.classList.add(value);
  }

  isConfirmationModal = () => this.type === 'confirm';

  show = () => {
    const visibleClassName = '-visible';

    this.classList.add(visibleClassName);
    document.querySelector('html').style.overflow = 'hidden';
  };

  dismiss = () => {
    const visibleClassName = '-visible';

    this.classList.remove(visibleClassName);
    document.querySelector('html').style.overflow = 'auto';
  };

  static show = ({
    content,
    title,
    icon,
    className
  }) => {
    const modal = document.createElement('pz-modal');

    modal.innerHTML = content;

    if (title) {
      modal.modalTitle = title;
    }

    if (icon) {
      modal.icon = icon;
    }

    if (className) {
      modal.className = className;
    }

    document.body.appendChild(modal);
    modal.querySelectorAll('.js-close-button').forEach((button) =>
      button.addEventListener('click', () => {
        modal.remove();
      }));

    modal.show();
  }

  onCloseButtonClick = () => {
    this.dismiss();

    if (this.isConfirmationModal()) {
      this.dispatchEvent(
        new Event('disconfirm', {
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  onConfirmButtonClick = () => {
    this.dismiss();

    this.dispatchEvent(
      new Event('confirm', {
        bubbles: true,
        composed: true,
      })
    );
  };

  createModalButton = ({ text, appearance = 'filled', classList = [] }) => {
    const button = document.createElement('pz-button');

    button.innerHTML = text;
    button.classList.add('modal-button', ...classList);
    button.appearance = appearance;
    button.size = 'xl';

    return button;
  };

  getModalButtons = () => {
    const fragment = document.createDocumentFragment();
    const closeButton = this.createModalButton({
      text: trans.close,
      appearance: 'outlined',
      classList: ['js-close-button'],
    });

    fragment.appendChild(closeButton);

    if (this.isConfirmationModal()) {
      const confirmButton = this.createModalButton({
        text: trans.confirm,
      });

      confirmButton.icon = 'check';
      confirmButton.addEventListener('click', this.onConfirmButtonClick);
      fragment.appendChild(confirmButton);
    }

    return fragment.childNodes;
  };

  connectedCallback() {
    const templateHtml = `
      <div class="pz-modal-dialog">
        <header class="pz-modal-dialog__header">
          ${this.icon ? `<i class="icon pz-icon-${this.icon}"></i>` : ''}
          ${this.modalTitle ? `<div class="title">${this.modalTitle}</div>` : ''}
          <pz-button appearance="ghost" size="sm" icon="close" class="close-button js-close-button"></pz-button>
        </header>
        <div class="pz-modal-dialog__content">${this.innerHTML}</div>
        ${this.noButton ? '' : '<div class="pz-modal-dialog__buttons"></div>'}
      </div>
    `;

    this.innerHTML = templateHtml;
    this.classList.add(`-theme-${this.theme}`, `-type-${this.type}`);

    if (!this.noButton) {
      this.querySelector('.pz-modal-dialog__buttons').append(
        ...this.getModalButtons()
      );
    }

    this.querySelectorAll('.js-close-button').forEach((button) =>
      button.addEventListener('click', this.onCloseButtonClick));
  }
}

customElements.define('pz-modal', PzModal);

setTimeout(() => {
  document.querySelectorAll('[data-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();

      const modalSelector = e.currentTarget.getAttribute('data-modal');
      const modal = document.querySelector(modalSelector);

      modal.show();
    });
  });
}, 0);
