import { AddToCart, RemoveFromCart, TempHolder, cart } from "./cart.js";
import { menuData } from "./product.js";

const mainDishesContainer = document.querySelector(".js-main-dishes");
let mainDisheshtml = " ";
menuData.mainDishes.forEach((menudata) => {
  mainDisheshtml += `
     <article class="product-container">
              <div class="image-container">
                <img
                  src="${menudata.image}"
                  class="product-image"
                />
              </div>

              <div class="product-info">${menudata.name}</div>

              <div class="product-price">${(menudata.price / 100).toFixed(
                2
              )}pesos</div>
              <button class="AddQuantity" data-menudata-id="${menudata.id}">
                <img src="images/button-addtocart.png" class="add-to-cart-icon" />
              </button>

              <button class="SubtractQuantity" data-menudata-id="${
                menudata.id
              }">
                <img
                  src="images/minus-sign-icon-free-png.png"
                  class="remove-to-cart-icon"
                />
              </button>

              <div class="product-quantity">
    Quantity: <span class="quantity">0</span>
  </div>

              <button class="add-to-cart-text js-button" data-menudata-id="${
                menudata.id
              }">Add to cart</button>
            </article>
    `;
});
mainDishesContainer.innerHTML = mainDisheshtml;

const DrinksContainer = document.querySelector(".js-drinks");
let DrinksHtml = " ";

menuData.drinks.forEach((menudata) => {
  DrinksHtml += `
     <article class="product-container">
              <div class="image-container">
                <img
                  src="${menudata.image}"
                  class="product-image"
                />
              </div>

              <div class="product-info">${menudata.name}</div>

              <div class="product-price">${(menudata.price / 100).toFixed(
                2
              )} pesos</div>
              <button class="AddQuantity" data-menudata-id="${menudata.id}">
                <img src="images/button-addtocart.png" class="add-to-cart-icon" />
              </button>

              <button class="SubtractQuantity"data-menudata-id="${menudata.id}">
                <img
                  src="images/minus-sign-icon-free-png.png"
                  class="remove-to-cart-icon"
                />
              </button>

              
              <div class="product-quantity">
    Quantity: <span class="quantity">0</span>
  </div>

              <button class="add-to-cart-text js-button" data-menudata-id="${
                menudata.id
              }">Add to cart</button>
            </article>
    `;
});

DrinksContainer.innerHTML = DrinksHtml;

const dessertsContainer = document.querySelector(".js-desserts");
let dessertshtml = " ";
menuData.desserts.forEach((menudata) => {
  dessertshtml += `
     <article class="product-container">
              <div class="image-container">
                <img
                  src="${menudata.image}"
                  class="product-image"
                />
              </div>

              <div class="product-info">${menudata.name}</div>

              <div class="product-price">${(menudata.price / 100).toFixed(
                2
              )} pesos</div>
              <button class="AddQuantity" data-menudata-id="${menudata.id}">
                <img src="images/button-addtocart.png" class="add-to-cart-icon" />
              </button>

              <button class="SubtractQuantity" data-menudata-id="${
                menudata.id
              }">
                <img
                  src="images/minus-sign-icon-free-png.png"
                  class="remove-to-cart-icon"
                />
              </button>

              
              <div class="product-quantity">
    Quantity: <span class="quantity">0</span>
  </div>

              <button class="add-to-cart-text js-button" data-menudata-id="${
                menudata.id
              }"
              
              >Add to cart</button>
            </article>
    `;
});

dessertsContainer.innerHTML = dessertshtml;

document.querySelectorAll(".AddQuantity").forEach((button) => {
  const quantityElement = button.parentElement.querySelector(".quantity");
  button.addEventListener("click", () => {
    const productId = button.dataset.menudataId; // once clicked, it shows the id attributes

    let matchingitem;
    TempHolder.forEach((item) => {
      // for each item in the tempholder array
      if (item.menuDataId === productId) {
        // it checks if the productid matches the id in the tempholder
        matchingitem = item;
      }
    });

    matchingitem = AddToCart(productId, matchingitem);

    quantityElement.textContent = matchingitem.quantity;
    console.log(TempHolder);
  });
});

document.querySelectorAll(".SubtractQuantity").forEach((button) => {
  const quantityElement = button.parentElement.querySelector(".quantity");
  button.addEventListener("click", () => {
    const productId = button.dataset.menudataId;

    let matchingitem;
    TempHolder.forEach((item) => {
      if (item.menuDataId === productId) {
        matchingitem = item;
      }
    });
    RemoveFromCart(productId, matchingitem);
    quantityElement.textContent = matchingitem.quantity;

    console.log(TempHolder);
  });
});

function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000); // disappear after 3 seconds
}

document.querySelectorAll(".js-button").forEach(function (button) {
  button.addEventListener("click", function () {
    const productId = button.dataset.menudataId;

    //find the product details from menuData using the productId
    let product;
    for (const category in menuData) {
      product = menuData[category].find(function (item) {
        return item.id === productId;
      });
      if (product) break;
    }

    let tempItem = TempHolder.find(function (item) {
      return item.menuDataId === productId;
    });

    if (!tempItem || tempItem.quantity === 0) {
      showPopup(`PLS SELECT QUANTITY OF ${product.name} FIRST!`);
      return;
    }

    let cartItem = cart.find(function (item) {
      return item.menuDataId === productId;
    });
    if (cartItem) {
      cartItem.quantity += tempItem.quantity;
    } else {
      // else not found then push to cart
      cart.push({
        menuDataId: productId,
        quantity: tempItem.quantity,
      });
    }
    showPopup(`${product.name} ${tempItem.quantity}x added!`); // show popup
    console.log(cart);
  });
});
