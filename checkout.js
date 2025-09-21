import { menuData } from "./product.js";
import { cart, ClearCart, LoadFromLocalStorage } from "./cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "./deliveryOptions.js";
import {
  updatePaymentSummary,
  paymentSummaryHtml,
} from "./renderPayment.js";

const today = dayjs();

// Helper function moved outside DOMContentLoaded
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

  // Attach event listeners for delete buttons
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      if (!productId) {
        console.error("delete link missing data-product-id");
        return;
      }
      ClearCart(productId);
      location.reload();
    });
  });

  // Attach event listeners for update buttons
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => updateQuantity(link));
    link.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        updateQuantity(link);
      }
    });
  });

  // Attach event listeners for delivery options
  document.querySelectorAll(".delivery-option-input").forEach((input) => {
    input.addEventListener("change", function () {
      const selectedOption = deliveryOptions.find(
        (option) => option.id === this.value
      );
      if (selectedOption) {
        updatePaymentSummary(selectedOption.price);

        const productId = this.getAttribute("name").replace(
          "delivery-option-",
          ""
        );
        const cartItem = cart.find((item) => item.menuDataId === productId);
        if (cartItem) {
          cartItem.selectedDeliveryOptionId = selectedOption.id;
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    });
  });
});

function updateQuantity(link) {
  const productId = link.dataset.productId;
  const quantityDisplay = link.parentElement.querySelector(".quantity-label");
  const oldQuantity = parseInt(quantityDisplay.textContent);
  const newQuantity = prompt("Enter new quantity: ", oldQuantity);

  if (newQuantity === null) return;
  const newQuantityNumber = parseInt(newQuantity);

  if (isNaN(newQuantityNumber) || newQuantityNumber <= 0) {
    alert("Please enter a valid quantity!");
    return;
  }

  const updatedCart = cart.map((item) => {
    if (item.menuDataId === productId) {
      return { ...item, quantity: newQuantityNumber };
    }
    return item;
  });

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  location.reload();
}
