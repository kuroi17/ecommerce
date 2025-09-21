import { menuData } from "./product.js";
import { cart } from "./cart.js";


export function calculateTotalItems(cart) {
  return cart.reduce((sum, item) => {
    const product = findProduct(item.menuDataId);
    return sum + product.price * item.quantity;
  }, 0);
}

export function findProduct(productId) {
  for (const category in menuData) {
    const product = menuData[category].find((p) => p.id === productId);
    if (product) return product;
  }
  return null;
}

export function updatePaymentSummary(deliveryFee = 0) {
  const deliveryFeeElement = document.querySelector(".js-delivery-fee");
  const totalBeforeTaxElement = document.querySelector(".js-total-before-tax");
  const totalAfterTaxElement = document.querySelector(".js-total-after-tax");
  const finalAmountElement = document.querySelector(".js-final-amount");
  const totalAmountElement = document.querySelector(".js-total-amount");

  const itemsTotal = calculateTotalItems(cart);
  const totalBeforeTax = itemsTotal + deliveryFee;
  const taxAmount = totalBeforeTax * 0.12;
  const finalAmount = totalBeforeTax + taxAmount;

  totalAmountElement.textContent = `₱${(itemsTotal / 100).toFixed(2)}`;
  deliveryFeeElement.textContent = `₱${(deliveryFee / 100).toFixed(2)}`;
  totalBeforeTaxElement.textContent = `₱${(totalBeforeTax / 100).toFixed(2)}`;
  totalAfterTaxElement.textContent = `₱${(taxAmount / 100).toFixed(2)}`;
  finalAmountElement.textContent = `₱${(finalAmount / 100).toFixed(2)}`;
}

export function paymentSummaryHtml() {
  const itemsTotal = calculateTotalItems(cart);
  const initialDeliveryFee = 0;
  const totalBeforeTax = itemsTotal + initialDeliveryFee;
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
        initialDeliveryFee / 100
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
    <button class="place-order-button button-primary">Place your order</button>`;

  document.querySelector(".payment-summary").innerHTML = html;
}
