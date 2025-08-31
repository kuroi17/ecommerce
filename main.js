const menuData = {
    mainDishes: [
       
       {
        name: '1PC ChickenJoy',
        price: '66.00',
        image: 'images/jolibee-main-meals/jolli-friedchicken.png ',
        id: 'chickenjoy'

       },
       {
         name: '1PC Jolli-spaghetti',
        price: '66.00',
        image: 'images/jolibee-main-meals/jolli-spaghetti.png',
        id: 'spaghetti'
       },
       
       {
        name: '1PC Burgersteak',
        price: '66.00',
        image: 'images/jolibee-main-meals/burgersteak.png',
        id: 'burgersteak'
       },

       {
        name: 'Jolli-Burger',
        price: '66.00',
        image: 'images/jolibee-main-meals/burger.png',
        id: 'burger'
       },

       {
        name: '1PC Jolli-Fries',
        price: '66.00',
        image: 'images/jolibee-main-meals/fries.png',
        id: 'fries'
       }
    ],

    drinks: [
        {
        name: 'Jolibee Coke',
        price: '66.00',
        image: 'images/jolibee-drinks/cokes.jpg',
        id: 'coke'
        },
        {
        name: 'Pineapple Juice',
        price: '66.00',
        image: 'images/jolibee-drinks/Pineapple-Juice-Regular.webp',
        id: 'pineapple'
        },
        {
        name: 'Water',
        price: '66.00',
        image: 'images/jolibee-drinks/Pineapple-Juice-Regular.webp',
        id: 'water'
        }


    ],

    desserts: [
    {
        name: 'Mango Pie',
        price: '66.00',
        image: 'images/jolibee-desserts/mango pie.png',
        id: 'mangopie'
    },
    {
        name: 'Joli-sundae',
        price: '66.00',
        image: 'images/jolibee-desserts/sundae.png',
        id: 'pineapple'
    },
    {
        name: 'Coke Float',
        price: '66.00',
        image: 'images/jolibee-drinks/cokefloat.webp',
        id: 'cokefloat'
    },

    ]
}

menuData.mainDishes.forEach((menudata) =>{
    const html = `
     <article class="product-container">
              <div class="image-container">
                <img
                  src="${menudata.image}"
                  class="product-image"
                />
              </div>

              <div class="product-info">${menudata.name}</div>

              <div class="product-price">${menudata.price}</div>
              <button>
                <img src="images/button-addtocart.png" class="add-to-cart-icon" />
              </button>

              <button>
                <img
                  src="images/minus-sign-icon-free-png.png"
                  class="remove-to-cart-icon"
                />
              </button>

              <button class="add-to-cart-text">Add to cart</button>
            </article>
    `;

})

menuData.drinks.forEach((menudata) =>{
    const html = `
     <article class="product-container">
              <div class="image-container">
                <img
                  src="${menudata.image}"
                  class="product-image"
                />
              </div>

              <div class="product-info">${menudata.name}</div>

              <div class="product-price">${menudata.price}</div>
              <button>
                <img src="images/button-addtocart.png" class="add-to-cart-icon" />
              </button>

              <button>
                <img
                  src="images/minus-sign-icon-free-png.png"
                  class="remove-to-cart-icon"
                />
              </button>

              <button class="add-to-cart-text">Add to cart</button>
            </article>
    `;

})


menuData.desserts.forEach((menudata) =>{
  

    const html = `
     <article class="product-container">
              <div class="image-container">
                <img
                  src="${menudata.image}"
                  class="product-image"
                />
              </div>

              <div class="product-info">${menudata.name}</div>

              <div class="product-price">${menudata.price}</div>
              <button>
                <img src="images/button-addtocart.png" class="add-to-cart-icon" />
              </button>

              <button>
                <img
                  src="images/minus-sign-icon-free-png.png"
                  class="remove-to-cart-icon"
                />
              </button>

              <button class="add-to-cart-text">Add to cart</button>
            </article>
    `;

})

