import { menuData } from "./product.js";

// Mock stock data - simulates database information about product inventory
// In a real application, this would come from a backend API/database
const stockData = {
  chickenjoy: { stock: 45, sold: 23 },    // Example: 45 items in stock, 23 sold
  spaghetti: { stock: 32, sold: 18 },
  burgersteak: { stock: 28, sold: 12 },
  burger: { stock: 15, sold: 35 },        // Low stock example
  fries: { stock: 22, sold: 28 },
  coke: { stock: 50, sold: 45 },
  pineapple: { stock: 8, sold: 12 },      // Low stock example
  water: { stock: 100, sold: 25 },
  mangopie: { stock: 0, sold: 8 },        // Out of stock example
  cokefloat: { stock: 18, sold: 14 },
};

/**
 * Determines the stock status based on current inventory levels
 * @param {number} stock - Current number of items in stock
 * @returns {object} - Object containing CSS class and display text
 */
function getStockStatus(stock) {
  if (stock === 0) {
    return {
      class: "status-out-of-stock",
      text: "Out of Stock",
    };
  } else if (stock < 15) {  // Less than 15 items = low stock
    return {
      class: "status-low-stock",
      text: "Low Stock",      // ✅ Fixed: was "Out of Stock"
    };
  } else {
    return {
      class: "status-in-stock",
      text: "In Stock",
    };
  }
}

/**
 * Renders product cards for the admin dashboard
 * @param {Array} products - Array of product objects from menuData
 * @param {string} containerSelector - CSS selector for the container element
 */
function renderProductAdmin(products, containerSelector) {
  // Find the HTML element where we'll insert the product cards
  const container = document.querySelector(containerSelector);
  let productsHTML = "";  // ✅ Fixed: removed extra space

  // Loop through each product and create HTML for it
  products.forEach((product) => {
    // Get the stock information for this specific product
    // If product doesn't exist in stockData, use default values
    const stock = stockData[product.id] || { stock: 0, sold: 0 };
    
    // Get the appropriate status (In Stock/Low Stock/Out of Stock)
    const status = getStockStatus(stock.stock);  // ✅ Fixed: renamed variable

    // Build HTML string for this product card
    productsHTML += `
      <div class="product-admin-card">
        <!-- Product header with image and basic info -->
        <div class="product-admin-header">
          <img src="${product.image}" alt="${product.name}" class="product-admin-image" />
          <div class="product-admin-info">
            <div class="product-admin-name">${product.name}</div>
            <div class="product-admin-price">₱${(product.price / 100).toFixed(2)}</div>
          </div>
        </div>
        
        <!-- Stock information display -->
        <div class="product-stock-info">
          <div class="stock-item">
            <div class="stock-label">Current Stock</div>
            <div class="stock-value">${stock.stock}</div>
          </div>
          <div class="stock-item">
            <div class="stock-label">Total Sold</div>
            <div class="stock-value">${stock.sold}</div>
          </div>
        </div>
        
        <!-- Status badge (color-coded) -->
        <div class="stock-status ${status.class}">
          ${status.text}
        </div>
        
        <!-- Input field and button to update stock quantity -->
        <!-- spinner input for number only -->
        <div class="stock-quantity-container">
          <input type="number" class="stock-input" value="${stock.stock}" min="0" data-product-id="${product.id}">
          <button class="update-stock-btn" data-product-id="${product.id}">Update</button>
        </div>
        
        <!-- Action buttons for managing the product -->
        <div class="product-actions">
          <button class="action-btn edit-btn" data-product-id="${product.id}">Edit</button>
          <button class="action-btn restock-btn" data-product-id="${product.id}">Restock</button>
          <button class="action-btn delete-btn" data-product-id="${product.id}">Delete</button>
        </div>
      </div>
    `;
  });
  
  // Insert all the generated HTML into the container
  container.innerHTML = productsHTML;
}

// Render all product categories when page loads
renderProductAdmin(menuData.mainDishes, ".js-main-dishes-admin");   // ✅ Fixed selectors
renderProductAdmin(menuData.drinks, ".js-drinks-admin");
renderProductAdmin(menuData.desserts, ".js-desserts-admin");

/**
 * Updates a single product card after changes are made
 * @param {string} productId - The ID of the product to update
 */
function updateProductCard(productId) {
  // Define mapping between category names and their CSS selectors
  const containerSelectors = {
    mainDishes: ".js-main-dishes-admin",
    drinks: ".js-drinks-admin", 
    desserts: ".js-desserts-admin",
  };

  // Search through all categories to find which one contains this product
  for (const [categoryName, products] of Object.entries(menuData)) {
    // Look for the product in this category
    const product = products.find(p => p.id === productId);
    
    if (product) {
      // Found the product! Re-render just this product's section
      const containerSelector = containerSelectors[categoryName];
      renderProductAdmin(products, containerSelector);  // Re-render entire category
      return; // Exit once we've updated the right section
    }
  }
}
// clicked element means the button that was clicked
// Event delegation - handle all button clicks with one listener
document.addEventListener("click", function (event) {
  const clickedElement = event.target;
  const productId = clickedElement.dataset.productId;  // Get product ID from data attribute

  // Handle "Update Stock" button clicks
  if (clickedElement.classList.contains("update-stock-btn")) {
    // Find the input field for this specific product
    const stockInput = document.querySelector(`input[data-product-id="${productId}"]`);
    const newStockValue = parseInt(stockInput.value);
    
    // Update our local data
    if (stockData[productId]) {  // ✅ Added safety check
      stockData[productId].stock = newStockValue;
      
      // Update the visual display
      updateProductCard(productId);
      
      console.log(`Updated stock for ${productId} to ${newStockValue}`);
    }
  }

  // Handle "Edit" button clicks
  if (clickedElement.classList.contains("edit-btn")) {
    console.log(`Edit product ${productId}`);
    // TODO: Open edit modal or navigate to edit page
  }

  // Handle "Restock" button clicks (quick add inventory)
  if (clickedElement.classList.contains("restock-btn")) {
    if (stockData[productId]) {  // ✅ Added safety check
      stockData[productId].stock += 25; // Add 25 items quickly
      updateProductCard(productId);
      console.log(`Restocked product ${productId} (+25 items)`);
    }
  }

  // Handle "Delete" button clicks
  if (clickedElement.classList.contains("delete-btn")) {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      console.log(`Deleted product ${productId}`);
      // TODO: Actually remove from data and re-render
    }
  }
});

// Handle "Add New Product" button click
document.addEventListener('DOMContentLoaded', function() {  // ✅ Wait for DOM to load
  const addProductButton = document.querySelector('.add-product-btn');
  
  if (addProductButton) {  // ✅ Check if button exists
    addProductButton.addEventListener('click', function() {
      console.log('Add new product clicked');
      // TODO: Open add product modal or form
    });
  }
});