const menuItems = {
  salgado: [
    { name: 'Bauruzinho', img: 'img/bauruzinho.png' },
    { name: 'Esfiha de carne', img: 'img/esfiha.png' },
    { name: 'Esfiha de frango', img: 'img/esfiha.png' },
    { name: 'Esfiha de calabresa', img: 'img/esfiha.png' },
    { name: 'Pão de queijo', img: 'img/pao_de_queijo.png' },
    { name: 'Pão de batata', img: 'img/pao_de_batata.png' },
    { name: 'Pão de batata de calabresa', img: 'img/pao_de_batata_de_calabresa.png' },
    { name: 'Hamburgão', img: 'img/hamburgao.png' },
    { name: 'Pizza', img: 'img/pizza.png' }
  ],
  doce: [
    { name: 'Croissant de chocolate', img: 'img/croissant_de_chocolate.png' },
    { name: 'Donuts', img: 'img/donuts.png' }
  ],
  bebida: [
    { name: 'Toddynho', img: 'img/toddynho.png' },
    { name: 'Suco de caixinha', img: 'img/suco_de_caixinha.png' },
    { name: 'Refrigerante de lata', img: 'img/refrigerante_lata.png' },
    { name: 'Água', img: 'img/garrafa_de_agua.png' }
  ]
};



const checkboxes = document.querySelectorAll('.filter-checkbox');
const selectContainer = document.getElementById('select-container');
const imageContainer = document.getElementById('image-container');
const selectedItems = new Set();

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    selectContainer.innerHTML = '';

    const selectedCategories = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);

    if (selectedCategories.length > 0) {
      selectedCategories.forEach(category => {
        const select = document.createElement('select');
        select.id = `${category}-select`;
        select.innerHTML = `<option value="" disabled selected>Selecione um item de ${category}</option>`;


        menuItems[category].forEach(item => {
          const option = document.createElement('option');
          option.value = item.img;
          option.textContent = item.name;
          select.appendChild(option);
        });

        select.addEventListener('change', function () {
          const selectedImage = this.value;
          const itemName = this.options[this.selectedIndex].text;

          if (!selectedItems.has(itemName)) {
            selectedItems.add(itemName);

            const imgElement = document.createElement('img');
            imgElement.src = selectedImage;
            imgElement.alt = itemName;
            imgElement.classList.add('item-image');

            const itemTitle = document.createElement('p');
            itemTitle.textContent = itemName;
            itemTitle.classList.add('item-title');

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = 1;
            quantityInput.min = 1;
            quantityInput.classList.add('item-quantity');

            select.addEventListener('change', function() {
              const selectedImage = this.value;
              const itemName = this.options[this.selectedIndex].text;
            
              if (!selectedItems.has(itemName)) {
                selectedItems.add(itemName);
            
                // (O código para criar e adicionar o item permanece o mesmo)
            
              } else {
                // Rolar até a mensagem de aviso
                warningMessage.textContent = `${itemName} já foi adicionado!`;
                warningMessage.classList.remove('hidden');
            
                // Scroll até a mensagem
                warningMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
                // Esconder a mensagem após 4 segundos
                setTimeout(() => {
                  warningMessage.classList.add('hidden');
                }, 4000);
              }
            });

            const itemWrapper = document.createElement('div');
            itemWrapper.classList.add('item-wrapper');
            itemWrapper.appendChild(imgElement);
            itemWrapper.appendChild(itemTitle);
            itemWrapper.appendChild(quantityInput);
            itemWrapper.appendChild(removeButton);

            imageContainer.appendChild(itemWrapper);
            imageContainer.classList.remove('hidden');
          } else {
            alert(`${itemName} já foi adicionado!`);
          }
        });

        selectContainer.appendChild(select);
        selectContainer.classList.remove('hidden');
      });
    } else {
      selectContainer.classList.add('hidden');
    }
  });
});


const warningMessage = document.getElementById('warning-message');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    selectContainer.innerHTML = '';
    warningMessage.classList.add('hidden');

    const selectedCategories = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);

    if (selectedCategories.length > 0) {
      selectedCategories.forEach(category => {
        const select = document.createElement('select');
        select.id = `${category}-select`;
        select.innerHTML = `<option value="" disabled selected>Selecione um item de ${category}</option>`;

        menuItems[category].forEach(item => {
          const option = document.createElement('option');
          option.value = item.img;
          option.textContent = item.name;
          select.appendChild(option);
        });

        select.addEventListener('change', function () {
          const selectedImage = this.value;
          const itemName = this.options[this.selectedIndex].text;

          if (!selectedItems.has(itemName)) {
            selectedItems.add(itemName);

            const imgElement = document.createElement('img');
            imgElement.src = selectedImage;
            imgElement.alt = itemName;
            imgElement.classList.add('item-image');

            const itemTitle = document.createElement('p');
            itemTitle.textContent = itemName;
            itemTitle.classList.add('item-title');

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = 1;
            quantityInput.min = 1;
            quantityInput.classList.add('item-quantity');

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.classList.add('remove-button');
            removeButton.addEventListener('click', function () {
              itemWrapper.remove();
              selectedItems.delete(itemName);
              warningMessage.classList.add('hidden');
            });

            const itemWrapper = document.createElement('div');
            itemWrapper.classList.add('item-wrapper');
            itemWrapper.appendChild(imgElement);
            itemWrapper.appendChild(itemTitle);
            itemWrapper.appendChild(quantityInput);
            itemWrapper.appendChild(removeButton);

            imageContainer.appendChild(itemWrapper);
            imageContainer.classList.remove('hidden');
          } else {
            warningMessage.textContent = `${itemName} já foi adicionado!`;
            warningMessage.classList.remove('hidden');
          }
        });

        selectContainer.appendChild(select);
        selectContainer.classList.remove('hidden');
      });
    } else {
      selectContainer.classList.add('hidden');
    }
  });
});
