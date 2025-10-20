// Import your product data (like menuData.mainDishes, menuData.drinks, etc.)
import { menuData } from "./product.js";

// ====== FAKE DATABASE ======
// This object acts like your product stock database
const stockData = {
  chickenjoy: { stock: 45, sold: 23 },
  spaghetti: { stock: 32, sold: 18 },
  burgersteak: { stock: 28, sold: 12 },
  burger: { stock: 15, sold: 35 },
  fries: { stock: 22, sold: 28 },
  coke: { stock: 50, sold: 45 },
  pineapple: { stock: 8, sold: 12 },
  water: { stock: 100, sold: 25 },
  mangopie: { stock: 0, sold: 8 },
  cokefloat: { stock: 18, sold: 14 },
};

// ====== CHECK STOCK STATUS ======
// This tells if a product is "In Stock", "Low Stock", or "Out of Stock"
function getStockStatus(stock) {
  if (stock === 0) {
    return { class: "status-out-of-stock", text: "Out of Stock" };
  } else if (stock < 15) {
    return { class: "status-low-stock", text: "Low Stock" };
  } else {
    return { class: "status-in-stock", text: "In Stock" };
  }
}

// ====== RENDER PRODUCT CARDS ======
// This shows all products (name, price, stock, etc.) in the admin dashboard
function renderProductAdmin(products, containerSelector) {
  // Find the section in HTML where we’ll show the products
  const container = document.querySelector(containerSelector);
  let productsHTML = "";

  // Loop through each product manually (no forEach)
  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    // Get stock info, if not found use 0
    let stockInfo = stockData[product.id];
    if (!stockInfo) {
      stockInfo = { stock: 0, sold: 0 };
    }

    // Get status (In Stock / Low Stock / Out of Stock)
    const status = getStockStatus(stockInfo.stock);

    // Build the HTML for one product card
    productsHTML +=
      '<div class="product-admin-card">' +
      '<div class="product-admin-header">' +
      '<img src="' + product.image + '" alt="' + product.name + '" class="product-admin-image">' +
      '<div class="product-admin-info">' +
      '<div class="product-admin-name">' + product.name + '</div>' +
      '<div class="product-admin-price">₱' + (product.price / 100).toFixed(2) + '</div>' +
      '</div></div>' +

      '<div class="product-stock-info">' +
      '<div class="stock-item"><div class="stock-label">Current Stock</div><div class="stock-value">' + stockInfo.stock + '</div></div>' +
      '<div class="stock-item"><div class="stock-label">Total Sold</div><div class="stock-value">' + stockInfo.sold + '</div></div>' +
      '</div>' +

      '<div class="stock-status ' + status.class + '">' + status.text + '</div>' +

      '<div class="stock-quantity-container">' +
      '<input type="number" class="stock-input" value="' + stockInfo.stock + '" min="0" data-product-id="' + product.id + '">' +
      '<button class="update-stock-btn" data-product-id="' + product.id + '">Update</button>' +
      '</div>' +

      '<div class="product-actions">' +
      '<button class="action-btn edit-btn" data-product-id="' + product.id + '">Edit</button>' +
      '<button class="action-btn restock-btn" data-product-id="' + product.id + '">Restock</button>' +
      '<button class="action-btn delete-btn" data-product-id="' + product.id + '">Delete</button>' +
      '</div>' +
      '</div>';
  }

  // Display all products in the container
  container.innerHTML = productsHTML;
}

// ====== SHOW PRODUCTS WHEN PAGE LOADS ======
renderProductAdmin(menuData.mainDishes, ".js-main-dishes-admin");
renderProductAdmin(menuData.drinks, ".js-drinks-admin");
renderProductAdmin(menuData.desserts, ".js-desserts-admin");

// ====== UPDATE ONE PRODUCT CARD ======
function updateProductCard(productId) {
  // Match each category to its section in HTML
  const containerSelectors = {
    mainDishes: ".js-main-dishes-admin",
    drinks: ".js-drinks-admin",
    desserts: ".js-desserts-admin",
  };

  // Loop through each category name (like "mainDishes", "drinks", etc.)
  for (let categoryName in menuData) {
    const products = menuData[categoryName];

    // Loop through each product manually
    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      // Check if this product’s ID matches the one we want to update
      if (product.id === productId) {
        const containerSelector = containerSelectors[categoryName];
        renderProductAdmin(products, containerSelector);
        return; // Stop once done
      }
    }
  }
}

// ====== HANDLE BUTTON CLICKS ======
document.addEventListener("click", function (event) {
  const clickedElement = event.target;
  const productId = clickedElement.getAttribute("data-product-id");
  const elementClass = clickedElement.getAttribute("class");

  // --- Update Stock Button ---
  if (elementClass && elementClass.indexOf("update-stock-btn") !== -1) {
    const stockInput = document.querySelector('input[data-product-id="' + productId + '"]');
    const newStockValue = parseInt(stockInput.value);

    if (stockData[productId]) {
      stockData[productId].stock = newStockValue;
      updateProductCard(productId);
      console.log("Updated stock for " + productId + " to " + newStockValue);
    }
  }

  // --- Edit Button ---
  else if (elementClass && elementClass.indexOf("edit-btn") !== -1) {
    console.log("Edit product " + productId);
    // Later: add form to edit product
  }

  // --- Restock Button ---
  else if (elementClass && elementClass.indexOf("restock-btn") !== -1) {
    if (stockData[productId]) {
      stockData[productId].stock += 25;
      updateProductCard(productId);
      console.log("Restocked " + productId + " (+25 items)");
    }
  }

  // --- Delete Button ---
  else if (elementClass && elementClass.indexOf("delete-btn") !== -1) {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      console.log("Deleted product " + productId);
      // Later: remove it from data and re-render
    }
  }
});

// ====== ADD NEW PRODUCT BUTTON ======
document.addEventListener("DOMContentLoaded", function () {
  const addProductButton = document.querySelector(".add-product-btn");

  if (addProductButton) {
    addProductButton.addEventListener("click", function () {
      console.log("Add new product clicked");
      // Later: show add product form
    });
  }
});
