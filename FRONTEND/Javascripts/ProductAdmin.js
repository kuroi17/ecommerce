import { menuData } from "./product.js";

const stockData = {
    chickenjoy: {
        stock: 0,
        sold: 0
    },
    spaghetti: {
        stock: 0,
        sold: 0
    },
    burgersteak: {
        stock: 0,
        sold: 0
    },
    burger : {
        stock: 0,
        sold: 0
    },
    fries: {
        stock: 0,
        sold: 0
    },
     coke: {
        stock: 0,
        sold: 0
    },
     pineapple: {
        stock: 0,
        sold: 0
    },
     water: {
        stock: 0,
        sold: 0
    },
     mangopie: {
        stock: 0,
        sold: 0
    },
     cokefloat: {
        stock: 0,
        sold: 0
    }
};

function StockStatus (stock){
    if (stock === 0){
        return {
            class: 'status-out-of-stock', 
            text: 'Out of Stock'
        };
    }
    else if (stock < 15){
        return {
            class: 'status-low-stock', 
            text: 'Out of Stock'
        }
    }
    else{
        return {
            class: 'status-in-stock',
            text: 'In Stock'
        }
    }
}

function renderProductAdmin (products, containerSelector){
    const container = document.querySelector(containerSelector);
    let productsHTML = ' ';

    products.forEach((product) => {
        // Get the stock information for the product
        const stock = stockData[product.id] ||
        {
            stock: 0,
            sold: 0
        }
        const stockStatus = StockStatus(stock.stock);

        productsHTML += `
         <div class="product-admin-card">
                <div class="product-admin-header">
                  <img src="${product.image}" alt="${product.name}" class="product-admin-image" />
                  <div class="product-admin-info">
                    <div class="product-admin-name">${product.name}</div>
                    <div class="product-admin-price">${product.price}</div>
                  </div>
                </div>
                
                <div class="product-stock-info">
                  <div class="stock-item">
                    <div class="stock-label">${stock.stock}</div>
                    <div class="stock-value">45</div>
                  </div>
                  <div class="stock-item">
                    <div class="stock-label">Total Sold</div>
                    <div class="stock-value">23</div>
                  </div>
                </div>
                
                <div class="stock-status ${status.class}">
                  ${status.text}
                </div>
                
                <div class="stock-quantity-container">
                  <input type="number" class="stock-input" value="45" min="0">
                  <button class="update-stock-btn">Update</button>
                </div>
                
                <div class="product-actions">
                  <button class="action-btn edit-btn">Edit</button>
                  <button class="action-btn restock-btn">Restock</button>
                  <button class="action-btn delete-btn">Delete</button>
                </div>
              </div>
        `;

    });
    container.innerHTML = productsHTML;
    
}