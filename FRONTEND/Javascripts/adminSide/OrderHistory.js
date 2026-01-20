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

${order.notes ? 'Special Notes:\n' + order.notes + '\n\n' : ''}Total Amount: ₱${order.total.toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━
  `.trim();
  
  alert(alertMessage);
};


// edit function 
window.editOrder = async function (orderId) {
  console.log(`Editing order #${orderId}`);
  
  try {
    // Fetch the raw order data including cart JSON
    const response = await fetch(`${API_ENDPOINTS.tableOrder}?raw=true&id=${orderId}`);
    const data = await response.json();
    
    if (!data.success) {
      alert("Failed to load order!");
      return;
    }
    
    const order = data.order;
    const cart = JSON.parse(order.cart);
    
    // Show current items
    let itemsList = "Current Items:\n━━━━━━━━━━━━━━━━━━━━━━\n";
    cart.forEach((item, index) => {
      const itemName = item.menuDataId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      itemsList += `${index + 1}. ${itemName} - Qty: ${item.quantity}\n`;
    });
    
    const itemIndex = prompt(itemsList + "\nWhich item number do you want to edit?\n(Enter 0 to cancel)");
    
    if (!itemIndex || itemIndex == 0) {
      return;
    }
    
    if (itemIndex < 1 || itemIndex > cart.length) {
      alert("Invalid selection!");
      return;
    }
    
    const selectedItem = cart[itemIndex - 1];
    const itemName = selectedItem.menuDataId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    const newQty = prompt(`Current quantity for ${itemName}: ${selectedItem.quantity}\n\nEnter new quantity:\n(Enter 0 to remove this item)`);
    
    if (newQty === null) {
      return; // User cancelled
    }
    
    if (isNaN(newQty) || newQty < 0) {
      alert("Invalid quantity!");
      return;
    }
    
    // Update the cart
    if (newQty == 0) {
      if (cart.length === 1) {
        alert("Cannot remove the last item! Order must have at least one item.");
        return;
      }
      cart.splice(itemIndex - 1, 1); // Remove item if qty is 0
    } else {
      cart[itemIndex - 1].quantity = parseInt(newQty);
    }
    
    // Send updated cart to backend
    const updateResponse = await fetch(`${API_ENDPOINTS.tableOrder}/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        cart: JSON.stringify(cart)
      })
    });
    
    const updateData = await updateResponse.json();
    
    if (updateData.success) {
      alert(`✅ Order #${orderId} updated successfully!`);
      renderOrderTableHTML();
    } else {
      alert(`❌ Error: ${updateData.error}`);
    }
    
  } catch (error) {
    console.error("Error editing order:", error);
    alert("❌ Failed to edit order.");
  }
};

// Initialize OrderHistory page
document.addEventListener("DOMContentLoaded", () => {
  renderOrderTableHTML(); // Full version with buttons
});

setInterval(() => {
  renderOrderTableHTML();
}, 60000);
