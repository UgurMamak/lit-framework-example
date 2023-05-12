const { LitElement } = require("lit");


class FilterInputElement extends LitElement {

  static get is(){
    return 'filter-input-element'
  }
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
    this.listItemAddTextValue();
    input.addEventListener('input', this.boundFilterResults);
  }


  disconnectedCallback() {
    const input = this.input
    if (!input) return

    input.addEventListener('input', this.boundFilterResults);
  }

  /* text content değerini filter-value attribute'e atama işlemi */
  listItemAddTextValue() {
    const containerValue = this.getAttribute('data-filter-container')
    const container = document.querySelector(`[data-filter-id="${containerValue}"]`);

    const listContainer = container.hasAttribute('[data-filter-list]')
      ? container
      : container.querySelector('[data-filter-list]');

    for (const item of Array.from(listContainer.children)) {
      item.setAttribute('filter-value', item.textContent);
    }
  }

  /*
    get key'i ile component içinde kullanabilceğimiz state'ler oluşturabiliriz.
   */
  get input() {
    const input = this.querySelector("input");
    return input instanceof HTMLInputElement ? input : null;
  }

  /* Kullanıcı Alanda loading isterse çalışacak. */
  loadingEvent() {

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
    makeBold(item, itemText, searchText);
  }

  blankData(container, count > 0);

}

/* 
  Searchtext'i list içinde bold yapma 
  Düzenli ifadedeki gi bayrağı, genel (tüm oluşumlar) ve büyük/küçük harfe duyarlı olmayan bir arama sağlar.
*/
function makeBold(listItem, textContent, searchText) {
  let text = textContent;
  let replaceText = `<strong>${searchText}</strong>`;

  var boldText = text.replace(new RegExp(searchText, "gi"), "<b>$&</b>");

  listItem.innerHTML = boldText;

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


  if (emptyContainer instanceof HTMLElement) emptyContainer.hidden = status

}

export default FilterInputElement;

if (!customElements.get('filter-input-element')) {
  customElements.define('file-input-element', FilterInputElement);
}