import { API_ENDPOINTS } from "./CONFIGJS.js";
const OrderHTML = document.querySelector(".js-order");
const RevenueHTML = document.querySelector(".js-revenue");
const ProductsHTML = document.querySelector(".js-products");
const CustomersHTML = document.querySelector(".js-customers");

async function renderDashboardOrdersTable() {
  try {
    // Fetch with limit=5 for dashboard
    const response = await fetch(`${API_ENDPOINTS.tableOrder}?limit=5`);
    const data = await response.json();

    if (data.success) {
      const orders = data.orders; // This is your data

      let tablehtml = "";
      if (orders.length == 0) {
        // Use 'orders', not 'recentOrders'
        tablehtml = `<tr>
          <td colspan="5" style="text-align: center; padding: 2rem;">
            No recent orders found
          </td>
        </tr>`;
      } else {
        orders.forEach(function (order) {
          // Use 'orders', not 'recentOrders'
          let statusClass = "status ";
          switch (order.status) {
            case "pending":
              statusClass += "pending";
              break;
            case "preparing":
              statusClass += "preparing";
              break;
            case "completed":
              statusClass += "completed";
              break;
            default:
              statusClass += "pending";
          }

          // NO ACTION BUTTONS - just info
          tablehtml += `
            <tr>
              <td>#${order.id}</td>
              <td>${order.items}</td>
              <td>₱${order.total.toLocaleString()}</td>
              <td><span class="${statusClass}">${
            order.status.charAt(0).toUpperCase() + order.status.slice(1)
          }</span></td>
              <td>${order.time}</td>
            </tr>
          `;
        });
      }

      const dashboardOrderTable = document.querySelector(
        ".js-DashboardOrderTable"
      );
      if (dashboardOrderTable) {
        dashboardOrderTable.innerHTML = tablehtml;
      }
      console.log("Dashboard orders rendered:", orders.length, "recent orders");
    }
  } catch (error) {
    console.error("Error fetching dashboard orders:", error);
  }
}

const quickActionsContainer = document.querySelector(".js-quick-actions-section");
let quickActionsHTML = "";
quickActionsHTML += `
  <h3>Quick Actions</h3>
          <div class="quick-actions">
            <button class="quick-action-btn">
              <span class="action-icon">➕</span>
              Add New Product
            </button>
            <button class="quick-action-btn">
              <span class="action-icon">📊</span>
              Generate Sales Report
            </button>
            <button class="quick-action-btn">
              <span class="action-icon">🔔</span>
              Send Notification
            </button>
            <button class="quick-action-btn">
              <span class="action-icon">⚙️</span>
              Settings
            </button>
          </div>`;

          quickActionsContainer.innerHTML = quickActionsHTML;


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
}, 60000); //60000
