const xhr = new XMLHttpRequest();
const url = "menu.json";

xhr.addEventListener("load", function () {
  let output = ""; //
  if (xhr.readyState === 4 && xhr.status === 200) {
    //if we are not getting an error

    //parse the menu items
    const menuItems = JSON.parse(xhr.response);

    // this just sets the entire response into localStorage
    localStorage.setItem("Menu Items", JSON.stringify(menuItems));

    //loop through the items and add output to the template
    for (let item of menuItems) {
      output += menuItemTemplate(item);
      const radioButtons = document.getElementsByName(
        `customization${item.id}`
      );
      radioButtons.forEach((button) => {
        button.addEventListener("change", () => {
          localStorage.setItem(`Customization ${item.id}`, button.value);
        });
      });
    }
    addMenuItemElements(output);
  }
});

xhr.open("GET", url, true);
xhr.send();

//template literal for the menu and customizations
function menuItemTemplate(item) {
  return `
       <div class="menu-item item">
         <div class="item-details">
            <div class="name"><h2>${item.name}</h2></div>
            <p class="description">${item.description}</p>
            <h4 class="price">${item.price}</h4>

            <div class="customizations">
              <input type="radio" id="whole-milk-${item.id}" name="customization-${item.id}" value="whole milk">
              <label for="whole-milk-${item.id}">whole milk</label><br>

              <input type="radio" id="skim-milk-${item.id}" name="customization-${item.id}" value="skim milk">
              <label for="skim-milk-${item.id}">skim milk</label><br>
                        
              <input type="radio" id="soy-milk-${item.id}" name="customization-${item.id}" value="soy milk">
              <label for="soy-milk-${item.id}">soy milk</label>
          </div>

            
          <button class="add-to-cart" onclick="saveSelection(${item.id})">Add to Cart</button>



        </div>

         <img class="item-photo" src="${item.image}">

       </div>
    `;
}

function addItemToCart(item) {
  const customizationRadioButtons = document.getElementsByName(
    `customization-${item.id}`
  );
  let selectedCustomization = null;
  for (let radioButton of customizationRadioButtons) {
    if (radioButton.checked) {
      selectedCustomization = radioButton.value;
      break;
    }
  }
  addItemToOrder({ ...item, customization: selectedCustomization });
}

function addMenuItemElements(data_input) {
  // create a new div element, append it to main
  const newDiv = document.createElement("div");
  newDiv.id = "display";
  newDiv.insertAdjacentHTML("afterbegin", data_input);

  //set the current div to be the card_list
  let currentDiv = document.getElementById("card_list");
  //if we are not the cardlist, create another element and append
  if (!currentDiv) {
    currentDiv = document.createElement("div");
    currentDiv.id = "card_details";
    document.body.appendChild(currentDiv);
  }
  //apend to the aprent container
  currentDiv.appendChild(newDiv);
}

//passes id of the selected item to the details page
function saveSelection(sel) {
  const menuItems = JSON.parse(localStorage.getItem("Menu Items"));
  const item = menuItems.find((item) => item.id === sel);
  // get the selected customization
  const customization = document.querySelector(
    `input[name='customization-${item.id}']:checked`
  ).value;

  // save the selected item and customization to localStorage
  localStorage.setItem("Selected Item", JSON.stringify(item));
  localStorage.setItem(`Customization ${item.id}`, customization);

  window.location.href = "cart.html";
}
