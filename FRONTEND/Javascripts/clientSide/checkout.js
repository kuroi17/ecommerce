import { menuData } from "./product.js";
import { cart, LoadFromLocalStorage } from "./cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "./deliveryOptions.js";
import { paymentSummaryHtml } from "./renderPayment.js";
import {
  deleteProductButton,
  updateQuantityButton,
  generateDeliveryOptionHtml,
  deliveryOptionButtons,
} from "./renderOrder.js";

const today = dayjs();

document.addEventListener("DOMContentLoaded", () => {
  LoadFromLocalStorage();

  // Generate checkout items
  let checkoutHtml = "";
  cart.forEach((item) => {
    const productId = item.menuDataId;

    // Generate delivery options HTML
    let deliveryOptionsHtml = "";
    for (let i = 0; i < deliveryOptions.length; i++) {
      deliveryOptionsHtml += generateDeliveryOptionHtml(
        deliveryOptions[i],
        productId
      );
    }

    // Find product in menuData
    let matchingItem;
    for (const category in menuData) {
      matchingItem = menuData[category].find(
        (product) => product.id === productId
      );
      if (matchingItem) break;
    }

    if (!matchingItem) {
      console.error(`Product with ID ${productId} not found in menuData.`);
      return;
    }

    checkoutHtml += `
      <div class="cart-item-container">
        <div class="delivery-date">Order date: ${today.format(
          "dddd, MMM D"
        )}</div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingItem.image}" alt="${
      matchingItem.name
    }" />
          <div class="cart-item-details">
            <div class="product-name">${matchingItem.name}</div>
            <div class="product-price">₱${(matchingItem.price / 100).toFixed(
              2
            )}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label">${
                item.quantity
              }</span></span>
              <span class="update-quantity-link link-primary js-update-link" 
                data-product-id="${productId}" tabindex="0">Update</span>
              <span class="delete-quantity-link link-primary js-delete-link" 
                data-product-id="${productId}">Delete</span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">Choose Delivery Option</div>
            ${deliveryOptionsHtml}
          </div>
        </div>
      </div>
    `;
  });

  // Insert checkout HTML
  document.querySelector(".js-checkout-items").innerHTML = checkoutHtml;

  // Generate and insert payment summary
  paymentSummaryHtml();

  deleteProductButton();

  // Attach event listeners for update buttons
  updateQuantityButton();

  // Attach event listeners for delivery options
  deliveryOptionButtons();
});
