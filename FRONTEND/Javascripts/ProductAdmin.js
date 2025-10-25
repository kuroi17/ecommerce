import { menuData } from "./product.js";
import {modalGenerator } from "./modals.js";

// 🔹 Stock data with hidden property
export const stockData = {
  chickenjoy: { stock: 45, sold: 23, hidden: false },
  spaghetti: { stock: 32, sold: 18, hidden: false },
  burgersteak: { stock: 28, sold: 12, hidden: false },
  burger: { stock: 15, sold: 35, hidden: false },
  fries: { stock: 22, sold: 28, hidden: false },
  coke: { stock: 50, sold: 45, hidden: false },
  pineapple: { stock: 8, sold: 12, hidden: false },
  water: { stock: 100, sold: 25, hidden: false },
  mangopie: { stock: 0, sold: 8, hidden: false },
  cokefloat: { stock: 18, sold: 14, hidden: false },
};

// 🔹 Helper: Get stock status with if-else
function getStockStatus(stock) {
  if (stock === 0) {
    return { class: "status-out-of-stock", text: "Out of Stock" };
  } else if (stock < 15) {
    return { class: "status-low-stock", text: "Low Stock" };
  } else {
    return { class: "status-in-stock", text: "In Stock" };
  }
}

// 🔹 Render products per category (admin view)
function renderProductAdmin(products, containerSelector) {
  const container = document.querySelector(containerSelector);
  let productsHTML = "";

  const visibleProducts = products.filter((product) => {
    const productData = stockData[product.id];
    return !productData || productData.hidden === false;
  });

  visibleProducts.forEach((product) => {
    const stockInfo = stockData[product.id] || { stock: 0, sold: 0 };
    const status = getStockStatus(stockInfo.stock);

    productsHTML += `
      <div class="product-admin-card">
        <div class="product-admin-header">
          <img src="${product.image}" alt="${
      product.name
    }" class="product-admin-image" />
          <div class="product-admin-info">
            <div class="product-admin-name">${product.name}</div>
            <div class="product-admin-price">₱${(product.price / 100).toFixed(
              2
            )}</div>
          </div>  
        </div>
        
        <div class="product-stock-info">
          <div class="stock-item">
            <div class="stock-label">Current Stock</div>
            <div class="stock-value">${stockInfo.stock}</div>
          </div>
          <div class="stock-item">
            <div class="stock-label">Total Sold</div>
            <div class="stock-value">${stockInfo.sold}</div>
          </div>
        </div>
        
        <div class="stock-status ${status.class}">
          ${status.text}
        </div>

        <div class="stock-quantity-container">
          <input type="number" class="stock-input" value="${
            stockInfo.stock
          }" min="0" data-product-id="${product.id}">
        </div>
        
        <div class="product-actions">
          <button class="action-btn update-stock-btn" data-product-id="${
            product.id
          }">Update</button>
          <button class="action-btn delete-btn" data-product-id="${
            product.id
          }">Delete</button>
        </div>
      </div>
    `;
  });

  container.innerHTML = productsHTML;
}

// 🔹 Render all categories
export function renderAllCategories() {
  renderProductAdmin(menuData.mainDishes, ".js-main-dishes-admin");
  renderProductAdmin(menuData.drinks, ".js-drinks-admin");
  renderProductAdmin(menuData.desserts, ".js-desserts-admin");
  attachKeyEventListener();
}

// 🔹 Show popup feedback
export function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.style.display = "block";
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => {
      popup.style.display = "none";
    }, 300);
  }, 3000);
}

// 🔹 Update only one card when stock changes
function updateProductCard(productId) {
  const containerSelectors = {
    mainDishes: ".js-main-dishes-admin",
    drinks: ".js-drinks-admin",
    desserts: ".js-desserts-admin",
  };

  for (let categoryName in menuData) {
    const products = menuData[categoryName];
    for (let i = 0; i < products.length; i++) {
      const eachProduct = products[i];
      if (eachProduct.id === productId) {
        const containerSelector = containerSelectors[categoryName];
        renderProductAdmin(products, containerSelector);
        attachKeyEventListener();
        return;
      }
    }
  }
}

// 🔹 Allow "Enter" key to update stock
function attachKeyEventListener() {
  const stockInputs = document.querySelectorAll(".stock-input");
  for (let i = 0; i < stockInputs.length; i++) {
    const input = stockInputs[i];
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const productId = input.getAttribute("data-product-id");
        const newStockValue = parseInt(input.value);
        if (stockData[productId]) {
          stockData[productId].stock = newStockValue;
          updateProductCard(productId);
          console.log(`Updated stock for ${productId} to ${newStockValue}`);
        }
      }
    });
  }
}

// 🔹 Click listeners for update + delete
document.addEventListener("click", function (event) {
  const clickedElement = event.target;
  const productId = clickedElement.dataset.productId;
  const elementClass = clickedElement.getAttribute("class");

  // UPDATE BUTTON
  if (elementClass && elementClass.indexOf("update-stock-btn") !== -1) {
    const stockInput = document.querySelector(
      `input[data-product-id="${productId}"]`
    );
    const newStockValue = parseInt(stockInput.value);

    if (stockData[productId]) {
      stockData[productId].stock = newStockValue;
      updateProductCard(productId);
      console.log(`Updated stock for ${productId} to ${newStockValue}`);
    }
  }

  // DELETE BUTTON
  if (elementClass && elementClass.indexOf("delete-btn") !== -1) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      if (stockData[productId]) {
        stockData[productId].hidden = true;
      }

      renderAllCategories();
      refreshExistingProductDropdown(); // 🔹 update dropdown instantly
      showPopup(`Product ${productId} removed from display.`);
    }
  }
});

export function generateOptionsModalExisting() {
  let optionsHTML = `<option value="">Choose Product...</option>`;
  for (let productId in stockData) {
    if (stockData[productId].hidden) {
      optionsHTML += `<option value="${productId}">${productId}</option>`;
    }
  }
  return optionsHTML;
}
// // 🔹 Generate options for hidden (deleted) products
// function generateOptionsModalExisting() {
//   let optionsHTML = `<option value="">Choose Product...</option>`;
//   for (let productId in stockData) {
//     if (stockData[productId].hidden) {
//       optionsHTML += `<option value="${productId}">${productId}</option>`;
//     }
//   }
//   return optionsHTML;
// }

export function refreshExistingProductDropdown() {
  const select = document.getElementById("existing-product-select");
  if (select) {
    select.innerHTML = generateOptionsModalExisting();
  }
}
// // 🔹 Refresh dropdown dynamically
// function refreshExistingProductDropdown() {
//   const select = document.getElementById("existing-product-select");
//   if (select) {
//     select.innerHTML = generateOptionsModalExisting();
//   }
// }

// 🔹 Inject modal generator
modalGenerator();

// 🔹 Initial render
renderAllCategories();
