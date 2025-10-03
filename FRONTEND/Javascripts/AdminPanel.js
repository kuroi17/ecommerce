import { API_ENDPOINTS } from "./CONFIGJS.js";
import {renderDashboardOrdersTable } from "./OrderHistory.js";
const OrderHTML = document.querySelector(".js-order");
const RevenueHTML = document.querySelector(".js-revenue");
const ProductsHTML = document.querySelector(".js-products");
const CustomersHTML = document.querySelector(".js-customers");


async function fetchOrderCount() {
  try {
    const response = await fetch(API_ENDPOINTS.orderCounter);
    const data = await response.json();

    if (data.success) {
      return {
        count: data.orderCounter,
        change: data.percentage_change,
      };
    } else {
      console.error(
        "Error fetching order count:",
        data.error || "Unknown error"
      );
      return { count: 0, change: 0 };
    }
  } catch (error) {
    console.error("Error fetching order count:", error);
    return { count: 0, change: 0 };
  }
}

async function renderOrderHTML() {
  const orderData = await fetchOrderCount();

  let Orderhtml = `
            <div class="stats-icon">📦</div>
            <div class="stat-info">
              <h3>Total Orders</h3>
              <div class="stat-number">${orderData.count}</div>
              <div class="change-stat">+${orderData.change}% performance</div>
            </div> 
          `;

  OrderHTML.innerHTML = Orderhtml;
  console.log(orderData);
}

async function fetchRevenueCount() {
  try {
    const response = await fetch(API_ENDPOINTS.totalRevenue);
    const data = await response.json();

    if (data.success) {
      return {
        count: data.revenueCounter,
        change: data.revenueChange,
      };
    } else {
      console.error("Error fetching revenue count:", error);
      return { count: 0, change: 0 };
    }
  } catch (error) {
    console.error("Error fetching revenue count:", error);
    return { count: 0, change: 0 };
  }
}

async function renderRevenueHTML() {
  const revenueData = await fetchRevenueCount();

  let Revenuehtml = ` 
   <div class="stats-icon">💰</div>
            <div class="stat-info">
              <h3>Revenue</h3>
              <div class="stat-number">₱${revenueData.count.toLocaleString()}</div>
              <div class="change-stat">+${revenueData.change}% performance</div>
            </div>
            `;

  RevenueHTML.innerHTML = Revenuehtml;
  console.log(revenueData);
}

async function fetchProductsCount() {
  try {
    const response = await fetch(API_ENDPOINTS.productCounter);
    const data = await response.json();

    if (data.success) {
      return {
        count: data.productsCounter,
        change: data.productsChange,
      };
    } else {
      console.error("Error fetching product count:", error);
      return { count: 0, change: 0 };
    }
  } catch (error) {
    console.error("Error fetching product count:", error);
    return { count: 0, change: 0 };
  }
}

async function renderProductHTML() {
  const productData = await fetchProductsCount();

  let Producthtml = `
    <div class="stats-icon">🍔</div>
    <div class="stat-info">
      <h3>Total Products</h3>
      <div class="stat-number">${productData.count}</div>
      <div class="change-stat">Active menu</div>
    </div>
  `;

  ProductsHTML.innerHTML = Producthtml;
}

async function fetchCustomersCount() {
  try {
    const response = await fetch(API_ENDPOINTS.customerCounter);
    const data = await response.json();

    if (data.success) {
      return {
        count: data.customersCounter,
        change: data.customersChange,
      };
    } else {
      return { count: 0, change: 0 };
    }
  } catch (error) {
    return { count: 0, change: 0 };
  }
}

async function renderCustomersHTML() {
  const customersData = await fetchCustomersCount();

  let customershtml = `
   <div class="stats-icon">👥</div>
            <div class="stat-info">
              <h3>Costumer</h3>
              <div class="stat-number">${customersData.count}</div>
              <div class="change-stat">+${customersData.change} new today</div>
            </div>
  `;

  CustomersHTML.innerHTML = customershtml;
  console.log(customersData);
}

document.addEventListener("DOMContentLoaded", () => {
  renderOrderHTML();
  renderRevenueHTML();
  renderProductHTML();
  renderCustomersHTML();
  renderDashboardOrdersTable();
});
setInterval(() => {
  renderOrderHTML();
  renderRevenueHTML();
  renderProductHTML();
  renderCustomersHTML();
  renderDashboardOrdersTable(); 
}, 621130000); //60000
