import { menuData } from "./product.js";
import { cart, ClearCart, LoadFromLocalStorage } from "./cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "./deliveryOptions.js";
const today = dayjs();

document.addEventListener("DOMContentLoaded", () => {
  LoadFromLocalStorage();
  let checkoutHtml = " ";
  cart.forEach((item) => {
    const productId = item.menuDataId;
    function generateDeliveryOptionHtml(option, productId) {
      const deliveryTime = today
        .add(option.deliveryTime, "minute")
        .format("dddd, MMM D [at] h:mm A");

      let checkedAttribute = "";
      if (option.id === "1") {
        checkedAttribute = "checked";
      }
      let priceText = "";

      if (option.price === 0) {
        priceText = "FREE Delivery";
      } else {
        priceText = `₱${option.price} Delivery Fee`;
      }

      return `
      <div class="delivery-option">
                  <input 
                    type="radio"
                    ${checkedAttribute}
                    class="delivery-option-input"
                    name="delivery-option-${productId}"
                    value="${option.id}"
                  />
                  <div>
                    <div class="delivery-option-date">${deliveryTime}</div>
                    <div class="delivery-option-price">${priceText}</div>
                  </div>
                </div>
      `;
    }

    let deliveryOptionsHtml = "";
    for (let i = 0; i < deliveryOptions.length; i++) {
      deliveryOptionsHtml += generateDeliveryOptionHtml(
        deliveryOptions[i], productId
      );
    } // the variable deliveryOptionsHtml is the one that holds the generated HTML for all delivery options
    // from the function generateDeliveryOptionHtml

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
                alt="${matchingItem.name}"
              />

              <div class="cart-item-details">
                <div class="product-name"> ${matchingItem.name}</div>
                <div class="product-price">${matchingItem.price}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${item.quantity}</span> </span>
                  <span class="update-quantity-link link-primary">Update</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">Delete</span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHtml} 
              </div>
            </div>
          </div>
  `;
  });
  document.querySelector(".js-checkout-items").innerHTML = checkoutHtml;

  document.querySelectorAll(".js-delete-link").forEach(function (link) {
    link.addEventListener("click", function () {
      const productId = link.dataset.productId;
      if (!productId) {
        console.error("delete link missing data-product-id");
        return;
      }
      ClearCart(productId);
      location.reload();
    });
  });
});
