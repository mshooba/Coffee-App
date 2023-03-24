let order = JSON.parse(localStorage.getItem("order")) || [];

function addItemToOrder(item) {
  //check if the item is in the array
  const existingItemIndex = order.findIndex((i) => i.id === item.id);

  if (existingItemIndex !== -1) {
    //increase  quantity of item
    order[existingItemIndex].quantity++;
  } else {
    //add  selected item to the  array
    item.quantity = 1;
    order.push(item);
  }
  localStorage.setItem("order", JSON.stringify(order));
}

const selectedID = localStorage.getItem("Selected Item");
const selectedItems = selectedID ? JSON.parse(selectedID) : null;

const customization = selectedItems
  ? localStorage.getItem(`Customization ${selectedItems.id}`)
  : null;

if (selectedItems) {
  addItemToOrder({ ...selectedItems, customization });
}

function backToMenu() {
  // redirect to the menu page
  window.location.href = "menu.html";
}

// display order
function displayOrder() {
  const cart = document.getElementById("cart-items");
  let output = "";

  // Loop through the order items and add the HTML for each item
  for (let item of order) {
    output += `
    <div class="menu-item item">
    <div class="item-details">
       <div class="name"><h2>${item.name}</h2></div>
       <p class="description">${item.description}</p>
       <h4 class="price">${item.price}</h4>

    <div class="cart-item-details">
       <p class="customization description">${item.customization}</p>
       <p class="quantity">Quantity: ${item.quantity}</p>
    </div>
    
   </div>

    <img class="item-photo" src="${item.image}">

  </div>
`;
  }

  // Add the HTML for the cart items to the cart element
  cart.innerHTML = output;
}

// Call the displayOrder function to display the order items in the cart
displayOrder();
