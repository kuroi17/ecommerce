import { menuData } from "./product.js";
import { cart, ClearCart, LoadFromLocalStorage } from "./cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "./deliveryOptions.js";
const today = dayjs();

function findProduct(productId) {
  for (const category in menuData) {
    const product = menuData[category].find(function (p) {
      return p.id === productId;
    });
    if (product) return product;
  }
  return null;
}
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
function CalculateTotalItems(cart) {
  return cart.reduce(function (sum, item) {
    const product = findProduct(item.menuDataId);
    return sum + product.price * item.quantity;
  }, 0);
}

function updatePaymentSummary(deliveryFee) {
  const DeliveryFeeElement = document.querySelector(".js-delivery-fee");
  const TotalBeforeTaxElement = document.querySelector(".js-total-before-tax");
  const TotalAfterTaxElement = document.querySelector(".js-total-after-tax");
  const FinalAmountElement = document.querySelector(".js-final-amount");

  const itemsTotal = CalculateTotalItems(cart);

  const totalBeforeTax = itemsTotal + deliveryFee;
  const taxAmount = totalBeforeTax * 0.12;
  const finalAmount = totalBeforeTax + taxAmount;

  DeliveryFeeElement.textContent = `₱${deliveryFee.toFixed(2)}`;
  TotalBeforeTaxElement.textContent = `₱${(totalBeforeTax / 100).toFixed(2)}`;
  TotalAfterTaxElement.textContent = `₱${(taxAmount / 100).toFixed(2)}`;
  FinalAmountElement.textContent = `₱${(finalAmount / 100).toFixed(2)}`;
}
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

  const updatedCart = [];

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].menuDataId === productId) {
      updatedCart.push({
        ...cart[i], // Keep all existing properties
        quantity: newQuantityNumber, // Update quantity
      });
    } else {
      updatedCart.push(cart[i]);
    }
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  LoadFromLocalStorage();

  let totalItems = 0;
  for (const item of cart) {
    totalItems += item.quantity;
  }
  document.querySelector(
    ".js-item-counter"
  ).textContent = `Items (${totalItems}):`;

  let checkoutHtml = " ";
  cart.forEach((item) => {
    const productId = item.menuDataId;

    let deliveryOptionsHtml = "";
    for (let i = 0; i < deliveryOptions.length; i++) {
      deliveryOptionsHtml += generateDeliveryOptionHtml(
        deliveryOptions[i],
        productId
      );
    }

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
                <div class="product-price">₱${(
                  matchingItem.price / 100
                ).toFixed(2)}  </div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    item.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${productId}" tabindex="0">Update</span>
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

  // Calculate values before generating HTML
  const itemsTotal = CalculateTotalItems(cart);
  const deliveryFee = 0; // Initial delivery fee
  const totalBeforeTax = itemsTotal + deliveryFee;
  const taxAmount = totalBeforeTax * 0.12;
  const finalAmount = totalBeforeTax + taxAmount;

  let paymentSummaryHtml = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div class="js-item-counter">Items (${totalItems}):</div>
      <div class="payment-summary-money js-total-amount">₱${(
        itemsTotal / 100
      ).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Delivery Fee:</div>
      <div class="payment-summary-money js-delivery-fee">₱${(
        deliveryFee / 100
      ).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money js-total-before-tax">₱${(
        totalBeforeTax / 100
      ).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (12% VAT):</div>
      <div class="payment-summary-money js-total-after-tax">₱${(
        taxAmount / 100
      ).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-final-amount">₱${(
        finalAmount / 100
      ).toFixed(2)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector(".js-checkout-items").innerHTML = checkoutHtml;
  document.querySelector(".payment-summary").innerHTML = paymentSummaryHtml;
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

  // the key for update button input, either clicked by enter or clicked by mouse
  document.querySelectorAll(".js-update-link").forEach(function (link) {
    link.addEventListener("click", function () {
      updateQuantity(link);
    });
    link.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        updateQuantity(link);
      }
    });
  });
  // update button in the checkout page
  document.querySelectorAll(".delivery-option-input").forEach((input) => {
    if (input.value === "1") {
      input.checked = true;
      updatePaymentSummary(0);
    }

    input.addEventListener("change", function (event) {
      // Get event parameter
      // Store the input value before using find
      const inputValue = event.target.value; // or this.value

      const selectedOption = deliveryOptions.find(function (option) {
        return option.id === inputValue; // Use stored value instead of this.value
      });

      if (selectedOption) {
        updatePaymentSummary(selectedOption.price);

        const productId = this.getAttribute("name").replace(
          "delivery-option-",
          ""
        );
        const cartItem = cart.find(function (item) {
          return item.menuDataId === productId;
        });

        if (cartItem) {
          cartItem.selectedDeliveryOptionId = selectedOption.id;
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    });
  });
});
