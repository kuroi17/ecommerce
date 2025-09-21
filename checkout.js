import { menuData } from "./product.js";
import { cart, ClearCart, LoadFromLocalStorage } from "./cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "./deliveryOptions.js";
import {
  CalculateTotalItems,
  updatePaymentSummary,
  paymentsummaryhtml,
} from "./renderPayment.js";

const today = dayjs();

//  Helper to find product

document.addEventListener("DOMContentLoaded", () => {
  LoadFromLocalStorage();

  //  Generate checkout items
  let checkoutHtml = "";
  cart.forEach((item) => {
    const productId = item.menuDataId;

    // generate delivery option, (THE HTML WITH ITS INFO GETTING FILLED IN)
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
        priceText = `₱${(option.price / 100).toFixed(2)} Delivery Fee`;
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

    // loop throughevery delivery options
    let deliveryOptionsHtml = "";
    for (let i = 0; i < deliveryOptions.length; i++) {
      deliveryOptionsHtml += generateDeliveryOptionHtml(
        deliveryOptions[i],
        productId
      );
    }

    // find product in menuData
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

    // add cart item html
    checkoutHtml += `
      <div class="cart-item-container">
        <div class="delivery-date">Delivery date: ${today.format(
          "dddd of MMM D" // deliveryTime sana kaso ayaw
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
              <span> Quantity: <span class="quantity-label">${
                item.quantity
              }</span> </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${productId}" tabindex="0">Update</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">Delete</span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose Delivery Option </div>
            ${deliveryOptionsHtml} 
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".js-checkout-items").innerHTML = checkoutHtml;

  // Delete item by delete button and using clearcart function from cart.js
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      if (!productId) {
        console.error("delete link missing data-product-id");
        return;
      }
      ClearCart(productId); // from cart.js
      location.reload();
    });
  });

  // Update item quantity
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => updateQuantity(link)); // by click
    link.addEventListener("keydown", (event) => {
      // from keyboard
      if (event.key === "Enter") updateQuantity(link); // if enter key is cliked
    });
  });

  // the function that will update the quantity
  function updateQuantity(link) {
    const productId = link.dataset.productId;
    const quantityDisplay = link.parentElement.querySelector(".quantity-label"); // span that shows the quantity is stored in variable
    const oldQuantity = parseInt(quantityDisplay.textContent);
    const newQuantity = prompt("Enter new quantity: ", oldQuantity); // the prompt

    if (newQuantity === null) return;
    const newQuantityNumber = parseInt(newQuantity);

    if (isNaN(newQuantityNumber) || newQuantityNumber <= 0) {
      alert("Please enter a valid quantity!");
      return;
    }

    const updatedCart = [];

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].menuDataId === productId) {
        updatedCart.push({
          menuDataId: cart[i].menuDataId,
          selectedDeliveryOptionId: cart[i].selectedDeliveryOptionId,
          quantity: newQuantityNumber, // Only this property is changed
        });
      } else {
        updatedCart.push(cart[i]);
      }
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    location.reload();
  }

  //  Payment summary
  paymentsummaryhtml();
});
