import { API_ENDPOINTS } from "./CONFIGJS.js";

const orderTableHTML = document.querySelector(".js-HistoryOrderTable");

// Main fetch function (source of truth)
export async function fetchOrderTable() {
  try {
    const response = await fetch(`${API_ENDPOINTS.tableOrder}?limit=all`);
    const data = await response.json();
     console.log("Fetched order data:", data);
    if (data.success) {
      return data.orders;
    } else {
      console.error("Error fetching order table:", data.error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching order table:", error);
    return [];
  }
}

// Full version with View/Edit buttons (for OrderHistory page)
export async function renderOrderTableHTML() {
  const orders = await fetchOrderTable();

  let tablehtml = "";
  if (orders.length == 0) {
    tablehtml = `<tr>
      <td colspan="6" style="text-align: center; padding: 2rem;">
        No orders found
      </td>
    </tr>`;
  } else {
    orders.forEach(function (order) {
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
      tablehtml += `
        <tr>
          <td>#${order.id}</td>
          <td>${order.items}</td>
          <td>₱${order.total.toLocaleString()}</td>
          <td><span class="${statusClass}">${
        order.status.charAt(0).toUpperCase() + order.status.slice(1)
      }</span></td>
          <td>${order.time}</td>
          <td>
            <button class="action-btn view" onclick="viewOrder(${
              order.id
            })">View</button>
            <button class="action-btn edit" onclick="editOrder(${
              order.id
            })">Edit</button>
          </td>
        </tr>
      `;
    });
  }
  orderTableHTML.innerHTML = tablehtml;
  console.log("Full order table rendered:", orders);
}

// Dashboard version (simplified - no buttons, recent only)


// View/Edit functions (only for OrderHistory page)
window.viewOrder = function (orderId) {
  console.log(`Viewing order #${orderId}`);
  alert(
    `📋 Viewing Order #${orderId}\n\nComplete order details will be shown here.\n\n🚀 Coming Soon!`
  );
};

window.editOrder = function (orderId) {
  console.log(`Editing order #${orderId}`);
  alert(
    `✏️ Editing Order #${orderId}\n\nModify order details, quantities, and status.\n\n🚀 Coming Soon!`
  );
};

// Initialize OrderHistory page
document.addEventListener("DOMContentLoaded", () => {
  renderOrderTableHTML(); // Full version with buttons
});

setInterval(() => {
  renderOrderTableHTML();
}, 60000);
