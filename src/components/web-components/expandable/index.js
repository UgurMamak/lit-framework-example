export default class PzExpandable extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['expanded'];
  }

  attributeChangedCallback() {
    if (!this.isConnected) {
      return;
    }

    setTimeout(() => {
      const expandedClassName = '-expanded';
      const body = this.querySelector('.pz-expandable__body');
      const icon = this.querySelector('.icon');
      let event = 'expand';

      if (this.expanded) {
        this.classList.add(expandedClassName);
        icon?.classList.remove('pz-icon-plus');
        icon?.classList.add('pz-icon-minus');
        body.style.maxHeight =
          `${body.querySelector('.content').offsetHeight}px`;
      } else {
        this.classList.remove(expandedClassName);
        body.style.removeProperty('max-height');
        event = 'collapse';
      }

      this.dispatchEvent(
        new Event(event, {
          bubbles: true,
          composed: true,
        })
      );
    }, 0);
  }

  get link() {
    return this.getAttribute('link') || false;
  }

  set link(value) {
    this.setAttribute('link', value);
  }

  get title() {
    return this.getAttribute('title') || '';
  }

  set title(value) {
    this.setAttribute('title', value);
  }

  get subtitle() {
    return this.getAttribute('subtitle') || '';
  }

  set subtitle(value) {
    this.setAttribute('subtitle', value);
  }

  get icon() {
    return this.getAttribute('icon');
  }

  set icon(value) {
    this.setAttribute('icon', value);
  }

  get hideToggle() {
    return this.hasAttribute('hide-toggle');
  }

  get expanded() {
    return this.hasAttribute('expanded');
  }

  set expanded(value) {
    if (
      value === false ||
      (typeof value === 'string' && JSON.parse(value.toLowerCase()) === false)
    ) {
      this.removeAttribute('expanded');
    } else {
      this.setAttribute('expanded', value);
    }
  }

  get maxBreakpoint() {
    return this.getAttribute('max-breakpoint') || 9999;
  }

  expand = () => {
    this.expanded = true;
  };

  collapse = () => {
    this.expanded = false;
  };

  toggle = () => {
    this.expanded = !this.expanded;

    this.dispatchEvent(
      new Event('toggle', {
        bubbles: true,
        composed: true,
      })
    );
  };

  htmlDecode = (encodedHtml) => {
    const textarea = document.createElement('textarea');

    textarea.innerHTML = encodedHtml;
    return textarea.childNodes.length === 0
      ? ''
      : textarea.childNodes[0].nodeValue;
  };

  connectedCallback() {
    this.classList.add('pz-expandable');

    if (this.expanded) {
      this.classList.add('-expanded');
      setTimeout(() => {
        this.querySelector('.pz-expandable__body').style.maxHeight =
        `${this.querySelector('.content').offsetHeight}px`;
      }, 0);
    }

    if (window.outerWidth < this.maxBreakpoint) {
      this.innerHTML = `
        <header class="pz-expandable__header js-pz-expandable-header">
          ${this.icon ? `<i class="icon pz-icon-${this.icon}"></i>` : ''}
          <a ${this.link ? `href="${this.link}"` : ''} class="pz-expandable__title-wrapper">
            <div class="title">${this.title}</div>
            ${
              this.subtitle
                ? `<span class="subtitle">${this.subtitle}</span>`
                : ''
            }
          </a>
          ${
            this.hideToggle
              ? ''
              : '<i class="toggle-icon pz-icon-chevron-down"></i>'
          }
        </header>
        <div class="pz-expandable__body">
          <div class="content">${this.htmlDecode(this.innerHTML)}</div>
        </div>
      `;

      this.classList.add('-enabled');
      this.querySelector('.pz-expandable__header').addEventListener(
        'click',
        this.toggle
      );
    } else {
      this.innerHTML = `
        <header class="pz-expandable__header js-pz-expandable-header">
          <span class="title">${this.title}</span>
          ${
            this.subtitle
              ? `<span class="subtitle">${this.subtitle}</span>`
              : ''
          }
        </header>
        <div class="pz-expandable__body">
          <div class="content">${this.htmlDecode(this.innerHTML)}</div>
        </div>
      `;
    }
  }
}

customElements.define('pz-expandable', PzExpandable);
