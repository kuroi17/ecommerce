import { menuData } from "./product.js";

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
          <input type="number" class="stock-input" value="${
            stockInfo.stock
          }" min="0" data-product-id="${product.id}">
          
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
attachKeyEventListener();

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
        attachKeyEventListener(); // Reattach event listeners after re-rendering

        return;
      }
    }
  }
}

// function that would let enter key (from keyboard) to update stock
function attachKeyEventListener() {
  const stockInputs = document.querySelectorAll(".stock-input");
  for (let i = 0; i < stockInputs.length; i++) {
    const input = stockInputs[i];
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const productId = input.getAttribute("data-product-id");
        const newStockValue = parseInt(input.value);
        if (stockData[productId]) {
          // ✅ Added safety check
          stockData[productId].stock = newStockValue;

          // Update the visual display
          updateProductCard(productId);

          console.log(`Updated stock for ${productId} to ${newStockValue}`);
        }
      }
    });
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

  function showPopup(message) {
    const popup = document.getElementById("popup");
    popup.textContent = message;
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000); // disappear after 3 seconds
  }

  // DELETE BUTTON CLICK
  if (elementClass && elementClass.indexOf("delete-btn") !== -1) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      console.log(`Deleted product ${productId}`);
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

// for (let products in stockData){
//   products
// }

function generateOptionsModalExisting() {
  let optionsHTML = `<option value="">Choose Product...</option> `;

  for (let Eachproduct in stockData) {
    // const productInfo = stockData[Eachproduct];
    optionsHTML += `<option value="${Eachproduct}">${Eachproduct}</option>`;
  }
  return optionsHTML;
}

function addExistingProductButton() {
  const addButton = document.querySelector(".addProductBtn");
  const select = document.getElementById("existing-product-select");

  if (!addButton || !select) return;

  addButton.addEventListener("click", function () {
    const selectedProduct = select.value;

    // Check if a valid product is selected
    if (selectedProduct === "") {
      alert("Please select a product first.");
      return;
    }

    // Find which category the product belongs to (mainDishes, drinks, or desserts)
    for (let categoryName in menuData) {
      const products = menuData[categoryName];

      for (let i = 0; i < products.length; i++) {
        const product = products[i];

        if (product.id === selectedProduct) {
          // If product already exists, just show it again on the page
          const containerSelectors = {
            mainDishes: ".js-main-dishes-admin",
            drinks: ".js-drinks-admin",
            desserts: ".js-desserts-admin",
          };

          const container = document.querySelector(
            containerSelectors[categoryName]
          );

          if (container) {
            renderProductAdmin(products, containerSelectors[categoryName]);
            attachKeyEventListener();
            console.log(`✅ Added existing product: ${selectedProduct}`);
          }

          // Close modal after adding
          const existingModal = document.getElementById("existingProductModal");
          existingModal.style.display = "none";

          return; // stop after adding one product
        }
      }
    }
  });
}

const ModalContainer = document.querySelector(".js-modalContainer");
let modalContainerHTML = ` 
          <!-- main modal -->
            <div id="myModal" class="modal">
              <div class="modal-content">
                <span class="close"> &times;</span>
                <h3>Add Product</h3>
                <button class="addNewProduct">Add a new product</button>
                <!-- the button to add a new product -->
                <button class="existingProduct">Add a existing product</button>
                <!-- the button to add a existing product -->
              </div>
            </div>

            <div id="addNewProductModal" class="modal">
              <div class="modal-content">
                <span class="close"> &times;</span>
                <h3>Add New Product</h3>

                <form id="newProductForm">
                  <!-- the modal form -->
                  <input type="text" placeholder="Product Name" /> <br /><br />
                  <input type="number" placeholder="Price" /> <br /><br />

                  <select id="productCategory" required>
                    <option value="">Select Category</option>
                    <option value="mainDishes">Main Dishes</option>
                    <option value="drinks">Drinks</option>
                    <option value="desserts">Desserts</option>
                  </select>
                  <br /><br />

                  <input
                    type="file"
                    id="productImage"
                    class="productImage"
                    accept="image/*"
                    required
                  />
                  
                  
                  <br /><br />
                  <button class="saveProduct">Save Product</button>
                </form>
              </div>
            </div>

            <div id="existingProductModal" class="modal">
              <!-- the modal form -->
              <div class="modal-content">
                <span class="close"> &times;</span>
                <h3>Existing Product</h3>
                <p>Select a product to add</p>
                <select id="existing-product-select">
                  ${generateOptionsModalExisting()}
                  <!-- options rendered by js -->
                </select>
                <br /><br />
                <button class="addProductBtn">Add</button>
              </div>
            </div>
          `;

ModalContainer.innerHTML += modalContainerHTML;
addExistingProductButton();

// ADD NEW PRODUCT BUTTON CLICK
document.addEventListener("DOMContentLoaded", function () {
  const addProductButton = document.querySelector(".add-product-btn");

  // modals of the buttons
  const modalMain = document.getElementById("myModal");
  const addNewProductform = document.getElementById("addNewProductModal");
  const existingNewProductform = document.getElementById(
    "existingProductModal"
  );

  //buttons of the modals
  const closeBtn = document.querySelectorAll(".close");
  const addNewProduct = document.querySelector(".addNewProduct");
  const existingProduct = document.querySelector(".existingProduct");

  if (addProductButton) {
    addProductButton.addEventListener("click", function () {
      console.log("Add new product clicked");
      modalMain.style.display = "block";
    });
  }

  for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener("click", function () {
      modalMain.style.display = "none";
      addNewProductform.style.display = "none";
      existingNewProductform.style.display = "none";
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === modalMain) {
      modalMain.style.display = "none";
    } else if (event.target === addNewProductform) {
      addNewProductform.style.display = "none";
    } else if (event.target === existingNewProductform) {
      existingNewProductform.style.display = "none";
    }
  });

  if (addNewProduct) {
    // if we clicked the add new product button
    console.log("add product in the future");
    addNewProduct.addEventListener("click", () => {
      if (modalMain.style.display === "block") {
        modalMain.style.display = "none";
        addNewProductform.style.display = "block";
      }
    });
  }
  if (existingProduct) {
    // if we clicked the existing product button
    console.log("existing product in the future");
    existingProduct.addEventListener("click", () => {
      if (modalMain.style.display === "block") {
        modalMain.style.display = "none";
        existingNewProductform.style.display = "block";
      }
    });
  }
});
