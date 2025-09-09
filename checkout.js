import { menuData } from "./product.js";
import { cart } from "./cart.js";

let checkoutHtml = " ";
cart.forEach((item) => {
  const productId = item.menuDataId; // i-eequate ang lahat ng id na nasa cart into productId

  let matchingItem;
  for (const category in menuData) {
    matchingItem = menuData[category].find(function (product) {
      return product.id === productId;
    });
    if (matchingItem) break;
  }

  if (!matchingItem) {
    console.error(`Product with ID ${productId} not found in menuData.`);
    return;
  }

  checkoutHtml += `
  <div class="cart-item-container">
            <div class="delivery-date">Delivery date: Tuesday, Sept 10</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingItem.image}"
                alt="Chickenjoy"
              />

              <div class="cart-item-details">
                <div class="product-name"> ${matchingItem.name}</div>
                <div class="product-price">${matchingItem.price}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${item.quantity}</span> </span>
                  <span class="update-quantity-link link-primary">Update</span>
                  <span class="delete-quantity-link link-primary">Delete</span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-1"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, Sept 10</div>
                    <div class="delivery-option-price">FREE Delivery</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, Sept 9</div>
                    <div class="delivery-option-price">₱49 Delivery Fee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
});
document.querySelector(".order-summary").innerHTML = checkoutHtml;
