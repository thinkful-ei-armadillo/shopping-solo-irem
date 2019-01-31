'use strict';

const STORE = {
  items: [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false},
    {name: 'oreo', checked: false}],
  hideChecked: false,
  searchResults: '' 
};


function generateItemElement(item, itemIndex) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}


function renderShoppingList() {
  let items = STORE.items;
  if (STORE.hideChecked){
    items = STORE.items.filter(item => !item.checked);
  }   
  
  if (STORE.searchResults){
    items = STORE.items.filter(item => item.name.includes(STORE.searchResults));
  }

  const shoppingListItemsString = generateShoppingItemsString(items);
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function searchItem(input){
  STORE.searchResults = `${input}`;
  console.log(STORE.searchResults);
}

function handleSearchItem(){
  $('#js-shopping-list-search').on('keyup', function(event) {
    event.preventDefault();
    const newSearchItem = $('#js-shopping-list-search').val();
    searchItem(newSearchItem);
    renderShoppingList();
  });
}

function editItemSubmit(){
  $('.js-item-index-element').submit(function(event){
    event.preventDefault();
    console.log(event.currentTarget);
    let itemIndex = getItemIndexFromElement(event.currentTarget);
    console.log(itemIndex)
    let newEditName = $('.js-shopping-list-edit-entry').val();
    console.log(newEditName);
    STORE.items[itemIndex].name = newEditName;
    console.log(STORE.items[itemIndex]);
    renderShoppingList();
  });
}

function editItem(item, itemIndex, currentTarget) {
  $(currentTarget).html(
    `<form id="js-shopping-list-edit-form>
      <label for="shopping-list-entry"></label>
      <input type="text" name="shopping-list-edit-entry" class="js-shopping-list-edit-entry" placeholder="${item.name}">
      <button class="js-shopping-list-edit" type="submit">Edit item</button>
    </form>
      <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
      </button>
    </div>
  </li>`
  );
  editItemSubmit();
}

function handleEditItem(){
  $('.js-shopping-list' ).on('dblclick', '.js-item-index-element', function(event){
    let itemIndex = getItemIndexFromElement(event.currentTarget);
    let item = STORE.items[itemIndex];
    editItem(item, itemIndex, event.currentTarget);
  });  
} 

function toggleCheckedForListItem(itemIndex) {
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function hideCompleted(){
  $('#js-hide-checked').change(event => {
    STORE.hideChecked = !STORE.hideChecked;
    renderShoppingList();
  });
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


function deleteListItem(itemIndex) {
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement;
    (event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleSearchItem();
  hideCompleted();
  handleSearchItem();
  handleEditItem();
}

$(handleShoppingList);