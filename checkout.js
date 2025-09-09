import { menuData } from "./product.js";
import { cart } from "./cart.js";

cart.forEach((item) => {
  const productId = item.menuData.id;

  let matchingItem;
  menuData.forEach((product) => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });
  console.log(matchingItem);
  `
  <div class="cart-item-container">
            <div class="delivery-date">Delivery date: Tuesday, Sept 10</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src=""${matchingItem.image}
                alt="Chickenjoy"
              />

              <div class="cart-item-details">
                <div class="product-name"> ${matchingItem.name}t</div>
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
