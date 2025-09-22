import { menuData } from "./product.js";
import { cart, ClearCart } from "./cart.js";
import { deliveryOptions } from "./deliveryOptions.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { updatePaymentSummary } from "./renderPayment.js";

const today = dayjs();

// Helper function moved outside DOMContentLoaded
export function generateDeliveryOptionHtml(option, productId) {
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

export function deliveryOptionButtons() {
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
}

export function deleteProductButton() {
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
}

// Attach event listeners for update buttons
export function updateQuantityButton() {
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => updateQuantity(link));
    link.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        updateQuantity(link);
      }
    });
  });
}

export function updateQuantity(link) {
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
