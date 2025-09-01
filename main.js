const menuData = {
  mainDishes: [
    {
      name: "1PC ChickenJoy",
      price: 6600,
      image: "images/jolibee-main-meals/jolli-friedchicken.png ",
      id: "chickenjoy",
    },
    {
      name: "1PC Jolli-spaghetti",
      price: 6600,
      image: "images/jolibee-main-meals/jolli-spaghetti.png",
      id: "spaghetti",
    },

    {
      name: "1PC Burgersteak",
      price: 6600,
      image: "images/jolibee-main-meals/burgersteak.png",
      id: "burgersteak",
    },

    {
      name: "Jolli-Burger",
      price: 6600,
      image: "images/jolibee-main-meals/burger.png",
      id: "burger",
    },

    {
      name: "1PC Jolli-Fries",
      price: 6600,
      image: "images/jolibee-main-meals/fries.png",
      id: "fries",
    },
  ],

  drinks: [
    {
      name: "Jolibee Coke",
      price: 6600,
      image: "images/jolibee-drinks/coke.jpg",
      id: "coke",
    },
    {
      name: "Pineapple Juice",
      price: 6600,
      image: "images/jolibee-drinks/Pineapple-Juice-Regular.webp",
      id: "pineapple",
    },
    {
      name: "Water",
      price: 6600,
      image: "images/jolibee-drinks/water.jpg",
      id: "water",
    },
  ],

  desserts: [
    {
      name: "Mango Pie",
      price: 6600,
      image: "images/jolibee-desserts/mango pie.png",
      id: "mangopie",
    },
    {
      name: "Joli-sundae",
      price: 6600,
      image: "images/jolibee-desserts/sundae.png",
      id: "pineapple",
    },
    {
      name: "Coke Float",
      price: 6600,
      image: "images/jolibee-desserts/cokefloat.webp",
      id: "cokefloat",
    },
  ],
};
const mainDishesContainer = document.querySelector(".js-main-dishes");
let mainDisheshtml = " ";
menuData.mainDishes.forEach((menudata) => {
  mainDisheshtml += `
     <article class="product-container">
              <div class="image-container">
                <img
                  src="${menudata.image}"
                  class="product-image"
                />
              </div>

              <div class="product-info">${menudata.name}</div>

              <div class="product-price">${(menudata.price / 100).toFixed(
                2
              )}pesos</div>
              <button>
                <img src="images/button-addtocart.png" class="add-to-cart-icon" />
              </button>

              <button>
                <img
                  src="images/minus-sign-icon-free-png.png"
                  class="remove-to-cart-icon"
                />
              </button>

              <button class="add-to-cart-text js-button" data-menudata-id="${
                menudata.id
              }">Add to cart</button>
            </article>
    `;
});
mainDishesContainer.innerHTML = mainDisheshtml;

const DrinksContainer = document.querySelector(".js-drinks");
let DrinksHtml = " ";

menuData.drinks.forEach((menudata) => {
  DrinksHtml += `
     <article class="product-container">
              <div class="image-container">
                <img
                  src="${menudata.image}"
                  class="product-image"
                />
              </div>

              <div class="product-info">${menudata.name}</div>

              <div class="product-price">${(menudata.price / 100).toFixed(
                2
              )} pesos</div>
              <button>
                <img src="images/button-addtocart.png" class="add-to-cart-icon" />
              </button>

              <button>
                <img
                  src="images/minus-sign-icon-free-png.png"
                  class="remove-to-cart-icon"
                />
              </button>

              <button class="add-to-cart-text js-button" data-menudata-id="${
                menudata.id
              }">Add to cart</button>
            </article>
    `;
});

DrinksContainer.innerHTML = DrinksHtml;

const dessertsContainer = document.querySelector(".js-desserts");
let dessertshtml = " ";
menuData.desserts.forEach((menudata) => {
  dessertshtml += `
     <article class="product-container">
              <div class="image-container">
                <img
                  src="${menudata.image}"
                  class="product-image"
                />
              </div>

              <div class="product-info">${menudata.name}</div>

              <div class="product-price">${(menudata.price / 100).toFixed(
                2
              )} pesos</div>
              <button>
                <img src="images/button-addtocart.png" class="add-to-cart-icon" />
              </button>

              <button>
                <img
                  src="images/minus-sign-icon-free-png.png"
                  class="remove-to-cart-icon"
                />
              </button>

              <button class="add-to-cart-text js-button" data-menudata-id="${
                menudata.id
              }"
              
              >Add to cart</button>
            </article>
    `;
});

dessertsContainer.innerHTML = dessertshtml;

document.querySelectorAll(".js-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.menudataId;

    let matchingitem;
    cart.forEach((item) => {
      if (item.menuDataId === productId) {
        matchingitem = item;
      }
    });
    if (matchingitem) {
      matchingitem.quantity += 1;
    } else {
      cart.push({
        menuDataId: productId,
        quantity: 1,
      });
    }

    console.log(cart);
  });
});
