export default class PzTabMenu extends HTMLElement {
  menuItems;

  menuContents;

  constructor() {
    super();

    this.activeClass = '-active';
  }

  get namespace() {
    return this.getAttribute('namespace');
  }

  get theme() {
    return this.getAttribute('theme') || 'zero';
  }

  get maxBreakpoint() {
    return this.getAttribute('max-breakpoint') || 9999;
  }

  connectedCallback() {
    if (window.outerWidth > this.maxBreakpoint) {
      this.setAttribute('hidden', 'hidden');
      return;
    }

    this.menuItems = this.querySelectorAll('pz-tab-menu-item');
    this.menuContents = document.querySelectorAll(`[namespace="${this.namespace}"] pz-tab-content-item`);

    let hasActiveAttr = false;

    this.classList.add('pz-tab-menu', `-theme-${this.theme}`);

    this.menuContents.forEach((menuContent) => {
      menuContent.setAttribute('hidden', 'hidden');
    });

    this.menuItems.forEach((menuItem) => {
      menuItem.classList.add('pz-tab-menu__item');

      if (menuItem.hasAttribute('active')) {
        const contentAttr = menuItem.getAttribute('content');
        const menuContent = document.querySelector(`pz-tab-content-item[tab="${contentAttr}"]`);

        hasActiveAttr = true;

        menuItem.classList.add(this.activeClass);
        menuItem.removeAttribute('hidden');

        menuContent.classList.add(this.activeClass);
        menuContent.removeAttribute('hidden');
      }

      menuItem.addEventListener('click', (e) => this.toggleTabs(e));
      this.append(menuItem);
    });

    if (!hasActiveAttr) {
      this.menuItems[0].classList.add(this.activeClass);
      this.menuItems[0].removeAttribute('hidden');
      this.menuContents[0].classList.add(this.activeClass);
      this.menuContents[0].removeAttribute('hidden');
    }
  }

  toggleTabs(e) {
    e.preventDefault();

    const contentAttr = e.currentTarget.getAttribute('content');
    const targetContent = document.querySelector(`pz-tab-content-item[tab="${contentAttr}"]`);

    this.menuItems.forEach((menuItem) => menuItem.classList.remove(this.activeClass));
    e.currentTarget.classList.add(this.activeClass);
    this.menuContents.forEach((menuContent) => {
      menuContent.setAttribute('hidden', 'hidden');
      menuContent.classList.remove(this.activeClass);
    });

    targetContent.removeAttribute('hidden');
    targetContent.classList.add(this.activeClass);
  }
}

customElements.define('pz-tab-menu', PzTabMenu);
