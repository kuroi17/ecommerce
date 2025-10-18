// import { menuData } from "./product.js";

// const stockData = {
//     chickenjoy: {
//         stock: 0,
//         sold: 0
//     },
//     spaghetti: {
//         stock: 0,
//         sold: 0
//     },
//     burgersteak: {
//         stock: 0,
//         sold: 0
//     },
//     burger : {
//         stock: 0,
//         sold: 0
//     },
//     fries: {
//         stock: 0,
//         sold: 0
//     },
//      coke: {
//         stock: 0,
//         sold: 0
//     },
//      pineapple: {
//         stock: 0,
//         sold: 0
//     },
//      water: {
//         stock: 0,
//         sold: 0
//     },
//      mangopie: {
//         stock: 0,
//         sold: 0
//     },
//      cokefloat: {
//         stock: 0,
//         sold: 0
//     }
// };

// function StockStatus (stock){
//     if (stock === 0){
//         return {
//             class: 'status-out-of-stock', 
//             text: 'Out of Stock'
//         };
//     }
//     else if (stock < 15){
//         return {
//             class: 'status-low-stock', 
//             text: 'Out of Stock'
//         }
//     }
//     else{
//         return {
//             class: 'status-in-stock',
//             text: 'In Stock'
//         }
//     }
// }

// function renderProductAdmin (products, containerSelector){
//     const container = document.querySelector(containerSelector);
//     let productsHTML = ' ';

//     products.forEach((product) => {
//         // Get the stock information for the product
//         const stock = stockData[product.id] ||
//         {
//             stock: 0,
//             sold: 0
//         }
//         const stockStatus = StockStatus(stock.stock);

//         productsHTML += `
//         <
//         `;

//     });
// }