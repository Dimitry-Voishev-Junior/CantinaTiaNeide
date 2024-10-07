const menuItems = {
  salgado: [
    { name: 'Bauruzinho', img: 'img/bauruzinho.png', price: 7.50 },
    { name: 'Esfiha de carne', img: 'img/esfiha.png', price: 7.50 },
    { name: 'Esfiha de frango', img: 'img/esfiha.png', price: 7.50 },
    { name: 'Esfiha de calabresa', img: 'img/esfiha.png', price: 7.50 },
    { name: 'Pão de queijo', img: 'img/pao_de_queijo.png', price: 5.50 },
    { name: 'Pão de batata', img: 'img/pao_de_batata.png', price: 7.50 },
    { name: 'Pão de batata de calabresa', img: 'img/pao_de_batata_de_calabresa.png', price: 7.50 },
    { name: 'Hamburgão', img: 'img/hamburgao.png', price: 7.50 },
    { name: 'Pizza', img: 'img/pizza.png', price: 7.50 }
  ],
  doce: [
    { name: 'Croissant de chocolate', img: 'img/croissant_de_chocolate.png', price: 8.00 },
    { name: 'Donuts', img: 'img/donuts.png', price: 8.00 }
  ],
  bebida: [
    { name: 'Toddynho', img: 'img/toddynho.png', price: 5.00 },
    {
      name: 'Suco de caixinha', img: 'img/suco_de_caixinha.png', price: 4.00, flavors: [
        { name: 'Morango', img: 'img/suco_morango.png' },
        { name: 'Uva', img: 'img/suco_uva.png' },
        { name: 'Laranja', img: 'img/suco_laranja.png' },
        { name: 'Pêssego', img: 'img/suco_de_caixinha.png' }
      ]
    },
    {
      name: 'Refrigerante de lata',
      img: 'img/refrigerante_lata.png',
      price: 6.00,
      flavors: [
        { name: 'Itubaína', img: 'img/itubaina.png' },
        { name: 'Coca-Cola', img: 'img/refrigerante_lata.png' },
        { name: 'Sukita de Laranja', img: 'img/sukita_laranja.png' },
        { name: 'Sukita de Uva', img: 'img/sukita_uva.png' },
        { name: 'Guaraná Antarctica', img: 'img/guarana.png' },
        { name: 'Pepsi', img: 'img/pepsi.png' },
        { name: 'Pepsi Black', img: 'img/pepsi_black.png' }
      ]
    },
    { name: 'Água', img: 'img/garrafa_de_agua.png', price: 2.50 }
  ]
};

const checkboxes = document.querySelectorAll('.filter-checkbox');
const selectContainer = document.getElementById('select-container');
const imageContainer = document.getElementById('image-container');
const warningMessage = document.getElementById('warning-message');
const totalElement = document.getElementById('total');

let total = 0;

function updateTotal(price) {
  total += price;
  totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function itemAlreadyExists(itemName) {
  const existingItems = Array.from(imageContainer.children);
  return existingItems.some(itemWrapper => {
    const title = itemWrapper.querySelector('.item-title').textContent;
    return title === itemName;
  });
}

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    selectContainer.innerHTML = '';
    warningMessage.classList.add('hidden');

    const selectedCategories = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);

    if (selectedCategories.length > 0) {
      selectedCategories.forEach(category => {
        const select = populateSelect(category);
        selectContainer.appendChild(select);
        selectContainer.classList.remove('hidden');
      });
    } else {
      selectContainer.classList.add('hidden');
    }
  });
});

function populateSelect(category) {
  const select = document.createElement('select');
  select.id = `${category}-select`;
  select.innerHTML = `<option value="" disabled selected>Selecione um item de ${category}</option>`;

  menuItems[category].forEach(item => {
    const option = document.createElement('option');
    option.value = item.name;
    option.textContent = item.name;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    const itemName = this.options[this.selectedIndex].text;
    const selectedItem = menuItems[category].find(item => item.name === itemName);

    if (!itemAlreadyExists(itemName) || category === 'bebida') {
      const imgElement = document.createElement('img');
      imgElement.src = selectedItem.img;
      imgElement.alt = itemName;
      imgElement.classList.add('item-image');

      const itemTitle = document.createElement('p');
      itemTitle.textContent = itemName;
      itemTitle.classList.add('item-title');

      const itemPrice = document.createElement('p');
      itemPrice.textContent = `R$ ${selectedItem.price.toFixed(2)}`;
      itemPrice.classList.add('item-price');

      let previousQuantity = 1;

      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.value = 1;
      quantityInput.min = 1;
      quantityInput.classList.add('item-quantity');
      quantityInput.addEventListener('input', function() {
        const newQuantity = parseInt(this.value) || 0;
        updateTotal((newQuantity - previousQuantity) * selectedItem.price);
        previousQuantity = newQuantity;
      });

      const flavorSelect = document.createElement('select');
      flavorSelect.classList.add('flavor-select');
      flavorSelect.innerHTML = `<option value="" disabled selected>Escolha o sabor</option>`;

      if (selectedItem.flavors) {
        selectedItem.flavors.forEach(flavor => {
          const flavorOption = document.createElement('option');
          flavorOption.value = flavor.img;
          flavorOption.textContent = flavor.name;
          flavorSelect.appendChild(flavorOption);
        });

        flavorSelect.addEventListener('change', function () {
          imgElement.src = this.value;
        });
      } else {
        flavorSelect.disabled = true;
      }

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remover';
      removeButton.classList.add('remove-button');
      removeButton.addEventListener('click', function () {
        const quantity = parseInt(quantityInput.value) || 0;
        updateTotal(-quantity * selectedItem.price);
        itemWrapper.remove();
        warningMessage.classList.add('hidden');
      });

      const itemWrapper = document.createElement('div');
      itemWrapper.classList.add('item-wrapper');

      const inputContainer = document.createElement('div');
      inputContainer.classList.add('input-container');
      inputContainer.appendChild(quantityInput);
      inputContainer.appendChild(flavorSelect);

      itemWrapper.appendChild(imgElement);
      itemWrapper.appendChild(itemTitle);
      itemWrapper.appendChild(itemPrice);
      itemWrapper.appendChild(inputContainer);
      itemWrapper.appendChild(removeButton);

      imageContainer.appendChild(itemWrapper);
      imageContainer.classList.remove('hidden');

      this.selectedIndex = 0;
      updateTotal(selectedItem.price);
    } else {
      warningMessage.textContent = `${itemName} já foi adicionado.`;
      warningMessage.classList.remove('hidden');
      warningMessage.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return select;
}
