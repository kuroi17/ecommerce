import { menuData } from "./product.js";
import { cart } from "./cart.js";
import { deliveryOptions } from "./deliveryOptions.js";

export function calculateTotalItems(cart) {
  return cart.reduce((sum, item) => {
    const product = findProduct(item.menuDataId);
    return sum + product.price * item.quantity;
  }, 0);
}

export function findProduct(productId) {
  for (const category in menuData) {
    const product = menuData[category].find(function (p) {
      return p.id === productId;
    });
    if (product) return product;
  }
  return null;
}

// ✅ removed unused deliveryFee param
export function updatePaymentSummary() {
  const deliveryFeeElement = document.querySelector(".js-delivery-fee");
  const totalBeforeTaxElement = document.querySelector(".js-total-before-tax");
  const totalAfterTaxElement = document.querySelector(".js-total-after-tax");
  const finalAmountElement = document.querySelector(".js-final-amount");
  const totalAmountElement = document.querySelector(".js-total-amount");

  let totalDeliveryfee = 0;
  cart.forEach(function (item) {
    if (item.selectedDeliveryOptionId) {
      const selectedOption = deliveryOptions.find(function (option) {
        return option.id === item.selectedDeliveryOptionId;
      });
      if (selectedOption) totalDeliveryfee += selectedOption.price;
    }
  });

  const itemsTotal = calculateTotalItems(cart);
  const totalBeforeTax = itemsTotal + totalDeliveryfee;
  const taxAmount = totalBeforeTax * 0.12;
  const finalAmount = totalBeforeTax + taxAmount;

  totalAmountElement.textContent = `₱${(itemsTotal / 100).toFixed(2)}`;
  deliveryFeeElement.textContent = `₱${(totalDeliveryfee / 100).toFixed(2)}`;
  totalBeforeTaxElement.textContent = `₱${(totalBeforeTax / 100).toFixed(2)}`;
  totalAfterTaxElement.textContent = `₱${(taxAmount / 100).toFixed(2)}`;
  finalAmountElement.textContent = `₱${(finalAmount / 100).toFixed(2)}`;
}

export function paymentSummaryHtml() {
  const itemsTotal = calculateTotalItems(cart);

  // ✅ calculate delivery fee same as updatePaymentSummary
  let totalDeliveryfee = 0;
  cart.forEach(function (item) {
    if (item.selectedDeliveryOptionId) {
      const selectedOption = deliveryOptions.find(function (option) {
        return option.id === item.selectedDeliveryOptionId;
      });
      if (selectedOption) totalDeliveryfee += selectedOption.price;
    }
  });

  const totalBeforeTax = itemsTotal + totalDeliveryfee;
  const taxAmount = totalBeforeTax * 0.12;
  const finalAmount = totalBeforeTax + taxAmount;

  let totalItems = 0;
  for (const item of cart) {
    totalItems += item.quantity;
  }

  const html = `<div class="payment-summary-title">Order Summary</div>
    <div class="payment-summary-row">
      <div class="js-item-counter">Items (${totalItems}):</div>
      <div class="payment-summary-money js-total-amount">₱${(
        itemsTotal / 100
      ).toFixed(2)}</div>
    </div>
    <div class="payment-summary-row">
      <div>Delivery Fee:</div>
      <div class="payment-summary-money js-delivery-fee">₱${(
        totalDeliveryfee / 100
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
    <button class="place-order-button button-primary js-orderButton">Place your order</button>`;

  document.querySelector(".payment-summary").innerHTML = html;

  document
    .querySelector(".js-orderButton")
    .addEventListener("click", async () => {
      const response = await fetch("https://musical-space-umbrella-x5w9xr4vw4gwc6647-8000.app.github.dev/placeOrder.php", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });
      const orderInfo = await response.json();
      console.log(orderInfo);
    });

  document.querySelector(
    ".js-item-counter"
  ).textContent = `Items (${totalItems}):`;
  updatePaymentSummary();

  // Delivery option listeners
  document.querySelectorAll(".delivery-option-input").forEach((input) => {
    if (input.value === "1") {
      input.checked = true;
    }
    input.addEventListener("change", function () {
      const selectedOption = deliveryOptions.find(
        (option) => option.id === this.value
      );
      if (selectedOption) {
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
          updatePaymentSummary();
        }
      }
    });
  });
}
