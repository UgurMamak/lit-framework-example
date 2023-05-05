export default class PzAccordion extends HTMLElement {
  constructor() {
    super();
  }

  get items() {
    return Array.from(this.children);
  }

  get multiple() {
    return this.hasAttribute('multiple');
  }

  onItemExpand = (index) => {
    this.items.forEach((item, i) => {
      if (!item.expanded || i === index) {
        return;
      }

      item.expanded = false;
    });
  };

  connectedCallback() {
    if (!this.multiple) {
      this.items.forEach((item, index) => {
        item.addEventListener('expand', () => this.onItemExpand(index));
      });
    }

    this.classList.add('pz-accordion');
  }
}

customElements.define('pz-accordion', PzAccordion);
