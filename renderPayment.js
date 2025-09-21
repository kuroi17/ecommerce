import { menuData } from "./product.js";
import { cart } from "./cart.js";
import { deliveryOptions } from "./deliveryOptions.js";


  console.log("wow");

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
    const TotalBeforeTaxElement = document.querySelector(
      ".js-total-before-tax"
    );
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

