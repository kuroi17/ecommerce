import { API_ENDPOINTS } from "../CONFIGJS.js";

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

// view function
window.viewOrder = async function (orderId) {
  console.log(`Viewing order #${orderId}`);
  
  // Fetch all orders and find the specific one
  const orders = await fetchOrderTable();
  const order = orders.find(o => o.id == orderId); // Changed === to ==
  
  console.log("Looking for order ID:", orderId, "Type:", typeof orderId);
  console.log("Available orders:", orders.map(o => ({ id: o.id, type: typeof o.id })));
  console.log("Found order:", order);
  
  if (!order) {
    alert("Order not found!");
    return;
  }
  
  // Create detailed alert message
  const alertMessage = `
📋 ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━━━
Order ID: #${order.id}
Status: ${order.status.toUpperCase()}
Date & Time: ${order.time}

Items:
${order.items}

Total Amount: ₱${order.total.toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━
  `.trim();
  
  alert(alertMessage);
};


// edit function 
window.editOrder = async function (orderId) {
  console.log(`Editing order #${orderId}`);
  
  // Fetch all orders and find the specific one
  const orders = await fetchOrderTable();
  const order = orders.find(o => o.id == orderId);
  
  if (!order) {
    alert("Order not found!");
    return;
  }
  
  // Show current order info
  const currentInfo = `
Current Order #${order.id}
━━━━━━━━━━━━━━━━━━━━━━
Status: ${order.status.toUpperCase()}
Items: ${order.items}
Total: ₱${order.total.toLocaleString()}

  `;
  
  const newItemsInput = prompt(currentInfo + "\n\nEnter new items (example: 2x Burger, 1x Fries):");
  
  if (!newItemsInput) {
    return; // User cancelled
  }

  const newQuantityInput = prompt("Enter new quantity (number only):", order.quantity);

  if (!newQuantityInput || isNaN(newQuantityInput) || newQuantityInput <= 0){
    alert("Invalid amount entered!");
    return;
  }
  
  const newTotalInput = prompt("Enter new total amount (number only):", order.total);
  
  if (!newTotalInput || isNaN(newTotalInput) || newTotalInput <= 0){
    alert("Invalid total amount entered!");
    return;
  }
  
  // Update order via API
  try {
    const response = await fetch(`${API_ENDPOINTS.tableOrder}/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        items: newItemsInput,
        quantity: parseInt(newQuantityInput),
        total: parseFloat(newTotalInput)
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert(`✅ Order #${orderId} status updated successfully!`);
      renderOrderTableHTML(); // Refresh the table
    } else {
      alert(`❌ Error: ${data.error || 'Failed to update order'}`);
    }
  } catch (error) {
    console.error("Error updating order:", error);
    alert("❌ Failed to update order. Please try again.");
  }
};

// Initialize OrderHistory page
document.addEventListener("DOMContentLoaded", () => {
  renderOrderTableHTML(); // Full version with buttons
});

setInterval(() => {
  renderOrderTableHTML();
}, 60000);
