  import { menuData } from "./product.js";

  // Mock stock data - simulates database information about product inventory
  // In a real application, this would come from a backend API/database
  const stockData = {
    chickenjoy: { stock: 45, sold: 23 }, // Example: 45 items in stock, 23 sold
    spaghetti: { stock: 32, sold: 18 },
    burgersteak: { stock: 28, sold: 12 },
    burger: { stock: 15, sold: 35 }, // Low stock example
    fries: { stock: 22, sold: 28 },
    coke: { stock: 50, sold: 45 },
    pineapple: { stock: 8, sold: 12 }, // Low stock example
    water: { stock: 100, sold: 25 },
    mangopie: { stock: 0, sold: 8 }, // Out of stock example
    cokefloat: { stock: 18, sold: 14 },
  };
  function showPopup(message) {
    const popup = document.getElementById("popup");
    popup.textContent = message;
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000); // disappear after 3 seconds
  }

  function getStockStatus(stock) {
    if (stock === 0) {
      return {
        class: "status-out-of-stock",
        text: "Out of Stock",
      };
    } else if (stock < 15) {
      // Less than 15 items = low stock
      return {
        class: "status-low-stock",
        text: "Low Stock", // ✅ Fixed: was "Out of Stock"
      };
    } else {
      return {
        class: "status-in-stock",
        text: "In Stock",
      };
    }
  }

  function renderProductAdmin(products, containerSelector) {
    const container = document.querySelector(containerSelector);
    let productsHTML = "";

    // Loop through each product and create HTML for it
    products.forEach((product) => {
      const stockInfo = stockData[product.id] || { stock: 0, sold: 0 };

      const status = getStockStatus(stockInfo.stock);

      // Build HTML string for this product card
      productsHTML += `
        <div class="product-admin-card">
          <!-- Product header with image and basic info -->
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
          
          <!-- Stock information display -->
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
          
          <!-- Status badge (color-coded) -->
          <div class="stock-status ${status.class}">
            ${status.text}
          </div>
          
          <!-- Input field and button to update stock quantity -->
          <!-- spinner input for number only -->
          <div class="stock-quantity-container">
    <button class="quantity-btn decrease-btn" data-product-id="${
      product.id
    }">−</button>
    <input type="number" class="stock-input" value="${
      stockInfo.stock
    }" min="0" data-product-id="${product.id}">
    <button class="quantity-btn increase-btn" data-product-id="${
      product.id
    }">+</button>
            
          </div>
          
          <!-- Action buttons for managing the product -->
          <div class="product-actions">
          
            <button class="action-btn update-stock-btn" data-product-id="${
              product.id
            }">Update </button>
            <button class="action-btn delete-btn" data-product-id="${
              product.id
            }">Delete</button>
          </div>
        </div>
      `;
    });

    container.innerHTML = productsHTML;
  }

  // Render all product categories when page loads
  renderProductAdmin(menuData.mainDishes, ".js-main-dishes-admin"); // ✅ Fixed selectors
  renderProductAdmin(menuData.drinks, ".js-drinks-admin");
  renderProductAdmin(menuData.desserts, ".js-desserts-admin");

  function updateProductCard(productId) {
    const containerSelectors = {
      mainDishes: ".js-main-dishes-admin",
      drinks: ".js-drinks-admin",
      desserts: ".js-desserts-admin",
    };

    for (let categoryName in menuData) {
      const products = menuData[categoryName];

      for (let i = 0; i < products.length; i++) {
        const Eachproduct = products[i];

        if (Eachproduct.id === productId) {
          const containerSelector = containerSelectors[categoryName];
          renderProductAdmin(products, containerSelector);
          return;
        }
      }
    }
  }

  document.addEventListener("click", function (event) {
    const clickedElement = event.target;
    const productId = clickedElement.dataset.productId; // Get product ID from data attribute
    const elementClass = clickedElement.getAttribute("class");

    // UPDATE BUTTON CLICK
    if (elementClass && elementClass.indexOf("update-stock-btn") !== -1) {
      // ito pala yung class ng update button
      const stockInput = document.querySelector(
        `input[data-product-id="${productId}"]`
      );
      const newStockValue = parseInt(stockInput.value);

      // Update our local data
      if (stockData[productId]) {
        // ✅ Added safety check
        stockData[productId].stock = newStockValue;

        // Update the visual display
        updateProductCard(productId);

        console.log(`Updated stock for ${productId} to ${newStockValue}`);
      }
    }

    // DECREASE BUTTON (-1)
    if (elementClass && elementClass.indexOf("decrease-btn") !== -1) {
      const stockInput = document.querySelector(
        `input[data-product-id="${productId}"]`
      );
      let currentValue = parseInt(stockInput.value);

      if (currentValue > 0) {
        stockInput.value = currentValue - 1;
      }
    }

    // INCREASE BUTTON (+1)
    if (elementClass && elementClass.indexOf("increase-btn") !== -1) {
      const stockInput = document.querySelector(
        `input[data-product-id="${productId}"]`
      );
      let currentValue = parseInt(stockInput.value);

      stockInput.value = currentValue + 1;
    }

    // DELETE BUTTON CLICK
    if (elementClass && elementClass.indexOf("delete-btn") !== -1) {
      const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
      );
      if (confirmDelete) {
        // Loop through every category (mainDishes, drinks, desserts)
        for (let categoryName in menuData) {
          const productList = menuData[categoryName];

          // Create a new list that will store the remaining products
          const productNewList = [];

          // Variable to check if we found the product to delete
          let found = false;

          // Loop through each product manually
          for (let i = 0; i < productList.length; i++) {
            const currentProduct = productList[i];

            if (currentProduct.id === productId) {
              // ✅ Found the product we want to delete
              found = true;
              showPopup(`Product ${productId} deleted.`);
              console.log(`Product ${productId} deleted.`);
              delete stockData[productId];
            } else {
              // If not the product we want to delete, keep it
              productNewList.push(currentProduct);
            }
          }
          // If we found the product, update that category and re-render
          if (found) {
            menuData[categoryName] = productNewList;

            const containerSelectors = {
              mainDishes: ".js-main-dishes-admin",
              drinks: ".js-drinks-admin",
              desserts: ".js-desserts-admin",
            };

            const containerSelector = containerSelectors[categoryName];
            renderProductAdmin(productNewList, containerSelector);

            console.log(`✅ Deleted product ${productId} successfully!`);
            break; // Stop looping after deleting
          }
        }
      }
    }
  });

  // ADD NEW PRODUCT BUTTON CLICK
  document.addEventListener("DOMContentLoaded", function () {
    const addProductButton = document.querySelector(".add-product-btn");

    if (addProductButton) {
      addProductButton.addEventListener("click", function () {
        console.log("Add new product clicked");
        // TODO: Open add product modal or form
      });
    }
  });
