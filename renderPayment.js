import { menuData } from "./product.js";
import { cart } from "./cart.js";
import { deliveryOptions } from "./deliveryOptions.js";

console.log("wow");

const itemsTotal = CalculateTotalItems(cart);
const initialDeliveryFee = 0;
const totalBeforeTax = itemsTotal + initialDeliveryFee;
const taxAmount = totalBeforeTax * 0.12;
const finalAmount = totalBeforeTax + taxAmount;

//  Show total items
function counter() {
  let totalItems = 0;
  for (const item of cart) {
    totalItems += item.quantity;
  }
  return totalItems;
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

export function CalculateTotalItems(cart) {
  return cart.reduce(function (sum, item) {
    const product = findProduct(item.menuDataId);
    return sum + product.price * item.quantity;
  }, 0);
}

//  Update payment summary
export function updatePaymentSummary() {
  const DeliveryFeeElement = document.querySelector(".js-delivery-fee");
  const TotalBeforeTaxElement = document.querySelector(".js-total-before-tax");
  const TotalAfterTaxElement = document.querySelector(".js-total-after-tax");
  const FinalAmountElement = document.querySelector(".js-final-amount");

  const itemsTotal = CalculateTotalItems(cart);

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

  DeliveryFeeElement.textContent = `₱${(totalDeliveryfee / 100).toFixed(2)}`;
  TotalBeforeTaxElement.textContent = `₱${(totalBeforeTax / 100).toFixed(2)}`;
  TotalAfterTaxElement.textContent = `₱${(taxAmount / 100).toFixed(2)}`;
  FinalAmountElement.textContent = `₱${(finalAmount / 100).toFixed(2)}`;
}

export function paymentsummaryhtml() {
  let totalItems = counter();
  let paymentSummaryHtml = `<div class="payment-summary-title">Order Summary</div>
    <div class="payment-summary-row">
      <div class="js-item-counter">Items (${totalItems}):</div>
      <div class="payment-summary-money js-total-amount">₱${(
        itemsTotal / 100
      ).toFixed(2)}</div>
    </div>
    <div class="payment-summary-row">
      <div>Delivery Fee:</div>
      <div class="payment-summary-money js-delivery-fee">₱ ${initialDeliveryFee.toFixed(
        2
      )}
       </div>
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
    <button class="place-order-button button-primary">Place your order</button>`;

  document.querySelector(".payment-summary").innerHTML = paymentSummaryHtml;
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
        // function (option) {
        //   return option.id === this.value;
        // }
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
