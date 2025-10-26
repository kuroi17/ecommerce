import { menuData } from "./product.js";
import { stockData,renderAllCategories,showPopup,refreshExistingProductDropdown, generateOptionsModalExisting, } from "./ProductAdmin.js";
export function modalGenerator (){

// 🔹 Generate options for hidden (deleted) products

    
// 🔹 Refresh dropdown dynamically
 

// 🔹 Add button logic for restoring hidden products
function addExistingProductButton() {
  const addButton = document.querySelector(".addProductBtn"); 
  const select = document.getElementById("existing-product-select");

  if (!addButton || !select) return;

  addButton.addEventListener("click", function () {
    const selectedProduct = select.value;
    if (selectedProduct === "") {
      alert("Please select a product first.");
      return;
    }

    if (stockData[selectedProduct] && stockData[selectedProduct].hidden) {
      stockData[selectedProduct].hidden = false;
      renderAllCategories();
      refreshExistingProductDropdown(); // 🔹 update dropdown instantly

      const existingModal = document.getElementById("existingProductModal");
      existingModal.style.display = "none";

      showPopup(`Product ${selectedProduct} restored to display!`);
    } else {
      alert("Product not found or already displayed.");
    }
  });
}

// 🔹 Inject modal containers
const ModalContainer = document.querySelector(".js-modalContainer");
let modalContainerHTML = `
  <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h3>Add Product</h3>
      <button class="addNewProduct">Add a new product</button>
      <button class="existingProduct">Add an existing product</button>
    </div>
  </div>

  <div id="addNewProductModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h3>Add New Product</h3>
      <form id="newProductForm">
        <input class="js-productName" type="text" placeholder="Product Name" /> <br /><br />
        <input class="js-productPrice" type="number" placeholder="Price" /> <br /><br />
        <select id="productCategory" required>
          <option value="">Select Category</option>
          <option value="mainDishes">Main Dishes</option>
          <option value="drinks">Drinks</option>
          <option value="desserts">Desserts</option>
        </select>
        <br /><br />
        <input type="file" id="productImage" class="productImage" accept="image/*" required />
        <br /><br />
        <button class="saveProduct">Save Product</button>
      </form>
    </div>
  </div>

  <div id="existingProductModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h3>Existing Product</h3>
      <p>Select a product to add</p>
      <select id="existing-product-select">
        ${generateOptionsModalExisting()}
      </select>
      <br /><br />
      <button class="addProductBtn">Add</button>
    </div>
  </div>
`;

ModalContainer.innerHTML += modalContainerHTML;
addExistingProductButton();

// the modals of the buttons
document.addEventListener("DOMContentLoaded", function () {
  const addProductButtons = document.querySelectorAll("[data-modal-trigger='add-product']");
  const modalMain = document.getElementById("myModal");
  const addNewProductForm = document.getElementById("addNewProductModal");
  const existingNewProductForm = document.getElementById(
    "existingProductModal"
  );

  addProductButtons.forEach(button => {
    button.addEventListener("click", function () {
      modalMain.style.display = "block";
    });
  });
  // buttons of modals
  const closeBtn = document.querySelectorAll(".close");
  const addNewProduct = document.querySelector(".addNewProduct");
  const existingProduct = document.querySelector(".existingProduct");

    if (addProductButtons) {
      addProductButtons.forEach(button => {
        button.addEventListener("click", function () {
          modalMain.style.display = "block";
        });
      });
    }

  for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener("click", function () {
      modalMain.style.display = "none";
      addNewProductForm.style.display = "none";
      existingNewProductForm.style.display = "none";
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === modalMain) {
      modalMain.style.display = "none";
    } else if (event.target === addNewProductForm) {
      addNewProductForm.style.display = "none";
    } else if (event.target === existingNewProductForm) {
      existingNewProductForm.style.display = "none";
    }
  });

  if (addNewProduct) {
    addNewProduct.addEventListener("click", () => {
      modalMain.style.display = "none";
      addNewProductForm.style.display = "block";
    });
  }

  if (existingProduct) {
    existingProduct.addEventListener("click", () => {
      modalMain.style.display = "none";
      existingNewProductForm.style.display = "block";
      refreshExistingProductDropdown(); // 🔹 Refresh every time modal opens
    });
  }

  const saveProductBtnFromNewProductModal =
    document.querySelector(".saveProduct");
  if (saveProductBtnFromNewProductModal) {
    saveProductBtnFromNewProductModal.addEventListener(
      "click",
      function (event) {
        event.preventDefault();

        const productNameInput = document.querySelector(".js-productName");
        const productPriceInput = document.querySelector(".js-productPrice");
        const productCategorySelect =
          document.getElementById("productCategory");
        const productImageInput = document.getElementById("productImage");

        const newProductPrice = parseInt(productPriceInput.value);
        const newProductName = productNameInput.value;
        const newProductCategory = productCategorySelect.value;
        const productImageFile = productImageInput.files[0];

        if (!newProductName) {
          alert("Please enter a product name!");
          return;
        }

        if (isNaN(newProductPrice) || newProductPrice <= 0) {
          alert("Please enter a valid price greater than 0!");
          return;
        }

        if (!newProductCategory) {
          alert("Please select a product category!");
          return;
        }

        if (!productImageFile) {
          alert("Upload a product image! ");
          return;
        }

        const productId = newProductName
          .toLowerCase()
          .replace(/\s+/g, "")
          .replace(/[^a-z0-9]/gi, "");
        const imageURL = URL.createObjectURL(productImageFile);
        stockData[productId] = {
          stock: 0,
          sold: 0,
          hidden: false,
        };

        const newProduct = {
          id: productId,
          name: newProductName,
          price: newProductPrice,
          image: imageURL,
        };

        if (menuData[newProductCategory]) {
          menuData[newProductCategory].push(newProduct);
        } else {
          console.error("Invalid category selected.");
          return;
        }

        renderAllCategories();

        // 🔹 CLOSE MODAL AND RESET FORM
        const addNewProductModal =
          document.getElementById("addNewProductModal");
        addNewProductModal.style.display = "none";

        // Reset form
        productNameInput.value = "";
        productPriceInput.value = "";
        productCategorySelect.value = "";
        productImageInput.value = "";

        // 🔹 SUCCESS FEEDBACK
        showPopup(`✅ Added new product: ${newProductName}!`);
        console.log(
          `Added new product: ${newProductName} (${productId}) to ${newProductCategory}`
        );
      }
    );
  }
});


}