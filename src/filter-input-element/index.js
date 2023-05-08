const { LitElement } = require("lit");


class FilterInputElement extends LitElement {

  constructor() {
    super();
    this.boundFilterResults = () => {
      filterResults(this, false)
    }
  }

  /*
    render metodu içinde html döndürmeyeceksek connectedCallbak lifecycle'ı ile component içinde yazılmış olan HTML elementlerini  gönderebiliriz.
  */
  connectedCallback() {
    const input = this.input;
    if (!input) return

    input.addEventListener('input', this.boundFilterResults);

  }


  disconnectedCallback() {
    const input = this.input
    if (!input) return

    input.addEventListener('input', this.boundFilterResults);
  }


  /*
    get key'i ile component içinde kullanabilceğimiz state'ler oluşturabiliriz.
   */
  get input() {
    const input = this.querySelector("input");
    return input instanceof HTMLInputElement ? input : null;
  }
}


async function filterResults(filterInput, check) {
  const input = filterInput.input;
  if (!input) return
  const searchText = input.value.trim().toLowerCase();
  const filterId = filterInput.getAttribute('data-filter-container');

  if (!filterId) return;

  const container = document.querySelector(`[data-filter-id="${filterId}"]`);

  if (!container) return;

  const list = container.hasAttribute("data-filter-list")
    ? container
    : container.querySelector('[data-filter-list]');

  if (!list) return;

  /* attribute ile event eklemek isterse koşul ekleyebiliriz. */
  const filterEvent = findSearchText;
  let count = 0;


  for (const item of Array.from(list.children)) {
    if (!(item instanceof HTMLElement)) continue
    const itemText = getText(item);
    const result = filterEvent(item, itemText, searchText);
    item.hidden = !result.match;
    if (result.match) count++
  }

  blankData(container, count > 0);


}

/* Default olarak search algoritması */
function findSearchText(_item, itemText, searchText) {
  // Seach, textContent içinde geçiyorsa true return eder.
  const match = itemText.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  return {
    match,
    hide: itemText === searchText
  }
}


/* Children elementin contentindeki texti çeker */
function getText(item) {
  const target = item.querySelector('[data-filter-text]') || item;
  return (target.textContent || "").trim();
}


/* Data olmaması durumunda ekranda uyarı metni göstermek için */
function blankData(container, status) {
  const emptyContainer = container.querySelector("[data-filter-empty-state]")


  console.log("Status",status);
  if (emptyContainer instanceof HTMLElement) emptyContainer.hidden = status

}

export default FilterInputElement;

if (!customElements.get('filter-input-element')) {
  customElements.define('file-input-element', FilterInputElement);
}