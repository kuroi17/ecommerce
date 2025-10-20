# JavaScript Learning Reference 📚

## Table of Contents

1. [Functions & Methods](#functions--methods)
2. [DOM Manipulation](#dom-manipulation)
3. [Event Handling](#event-handling)
4. [Array Methods](#array-methods)
5. [Object Methods](#object-methods)
6. [ES6+ Features](#es6-features)
7. [Async Programming](#async-programming)
8. [Local Storage](#local-storage)
9. [Common Patterns](#common-patterns)

---

## Functions & Methods

### `addEventListener()`

**What it does:** Attaches an event listener to an element
**Syntax:** `element.addEventListener(event, function, options)`

```javascript
// Example from your code:
document
  .querySelector(".js-orderButton")
  .addEventListener("click", async () => {
    // Code to execute when button is clicked
  });

// Different ways to use it:
button.addEventListener("click", handleClick); // Named function
button.addEventListener("click", function () {}); // Anonymous function
button.addEventListener("click", () => {}); // Arrow function
```

### `querySelector()` & `querySelectorAll()`

**What it does:** Selects HTML elements using CSS selectors
**Syntax:** `document.querySelector(selector)` / `document.querySelectorAll(selector)`

```javascript
// From your code:
const container = document.querySelector(".js-main-dishes"); // Gets first match
const inputs = document.querySelectorAll(".delivery-option-input"); // Gets all matches

// Common selectors:
document.querySelector("#myId"); // By ID
document.querySelector(".myClass"); // By class
document.querySelector("button"); // By tag
document.querySelector("[data-id]"); // By attribute
```

### `getAttribute()` & `setAttribute()`

**What it does:** Gets or sets HTML element attributes
**Syntax:** `element.getAttribute(name)` / `element.setAttribute(name, value)`

```javascript
// From your code:
const productId = this.getAttribute("name").replace("delivery-option-", "");
input.setAttribute("data-product-id", product.id);

// Common uses:
element.getAttribute("src"); // Get image source
element.getAttribute("data-id"); // Get custom data attribute
element.setAttribute("class", "new"); // Set CSS class
element.setAttribute("disabled", ""); // Disable input
```

---

## DOM Manipulation

### `innerHTML` & `textContent`

**What it does:** Gets or sets content inside HTML elements

```javascript
// innerHTML - can insert HTML tags
document.querySelector(".payment-summary").innerHTML = html;
container.innerHTML = `<div class="product">${product.name}</div>`;

// textContent - only plain text, safer for user input
element.textContent = `Items (${totalItems}):`;
element.textContent = "₱" + (price / 100).toFixed(2);
```

### `classList` Methods

**What it does:** Manages CSS classes on elements

```javascript
// From your code patterns:
element.classList.add("active"); // Add class
element.classList.remove("hidden"); // Remove class
element.classList.toggle("open"); // Toggle class on/off
element.classList.contains("selected"); // Check if class exists

// Check what you used:
if (clickedElement.classList.contains("update-stock-btn")) {
  // Do something
}
```

---

## Event Handling

### Event Object & Target

**What it does:** Provides information about the event that occurred

```javascript
// From your code:
document.addEventListener("click", function (event) {
  const clickedElement = event.target; // What was clicked
  const productId = clickedElement.dataset.productId; // Get data attribute
});

// Common event properties:
event.target; // Element that triggered event
event.currentTarget; // Element with event listener
event.preventDefault(); // Stop default behavior
event.stopPropagation(); // Stop event bubbling
```

### Dataset (Data Attributes)

**What it does:** Access custom HTML data attributes

```javascript
// HTML: <button data-product-id="123" data-category="food">
// JavaScript:
element.dataset.productId  // Gets "123"
element.dataset.category   // Gets "food"

// From your code:
<button data-product-id="${product.id}">
const productId = clickedElement.dataset.productId;
```

---

## Array Methods

### `forEach()`

**What it does:** Executes a function for each array element
**Syntax:** `array.forEach(callback)`

```javascript
// From your code:
cart.forEach(function (item) {
  if (item.selectedDeliveryOptionId) {
    // Process each cart item
  }
});

// Different ways to write it:
products.forEach(function (product) {}); // Function expression
products.forEach((product) => {}); // Arrow function
products.forEach((product, index) => {}); // With index parameter
```

### `find()`

**What it does:** Returns the first array element that matches a condition
**Syntax:** `array.find(callback)`

```javascript
// From your code:
const product = menuData[category].find(function (p) {
  return p.id === productId;
});

// Arrow function version:
const product = menuData[category].find((p) => p.id === productId);

// More examples:
const user = users.find((user) => user.name === "John");
const item = cart.find((item) => item.id === "123");
```

### `reduce()`

**What it does:** Reduces array to a single value by accumulating results
**Syntax:** `array.reduce(callback, initialValue)`

```javascript
// From your code:
return cart.reduce((sum, item) => {
  const product = findProduct(item.menuDataId);
  return sum + product.price * item.quantity;
}, 0);

// Breaking it down:
// sum = accumulator (running total)
// item = current array element
// 0 = initial value for sum

// More examples:
const total = numbers.reduce((sum, num) => sum + num, 0);
const max = numbers.reduce((max, num) => (num > max ? num : max));
```

### `filter()`

**What it does:** Creates new array with elements that pass a test
**Syntax:** `array.filter(callback)`

```javascript
// Examples based on your patterns:
const activeUsers = users.filter((user) => user.isActive);
const expensiveItems = products.filter((product) => product.price > 100);
const filteredCart = cart.filter((item) => item.quantity > 0);
```

### `map()`

**What it does:** Creates new array by transforming each element
**Syntax:** `array.map(callback)`

```javascript
// Examples for your use cases:
const productNames = products.map((product) => product.name);
const prices = cart.map((item) => item.price * item.quantity);
const html = products.map((product) => `<div>${product.name}</div>`);
```

---

## ES6+ Features

### Arrow Functions

**What it does:** Shorter way to write functions
**Syntax:** `(parameters) => { return statement }`

```javascript
// Traditional function:
function(item) {
  return item.price;
}

// Arrow function:
(item) => {
  return item.price;
}

// Shorter arrow function (single expression):
item => item.price

// From your code:
products.forEach((product) => {
  // Process product
});
```

### Template Literals

**What it does:** Embed expressions in strings using backticks
**Syntax:** `\`string ${expression}\``

```javascript
// From your code:
const html = `<div class="product-admin-name">${product.name}</div>
              <div class="product-admin-price">₱${(product.price / 100).toFixed(
                2
              )}</div>`;

// Instead of:
const html = '<div class="product-admin-name">' + product.name + "</div>";

// Multi-line strings:
const message = `Hello ${name},
Your order total is ₱${total}.
Thank you!`;
```

### Destructuring

**What it does:** Extract values from arrays/objects into variables

```javascript
// Object destructuring:
const { name, price, image } = product;
// Same as: const name = product.name; const price = product.price;

// Array destructuring:
const [first, second] = ["apple", "banana"];
// Same as: const first = array[0]; const second = array[1];

// In function parameters:
function renderProduct({ name, price, image }) {
  // Use name, price, image directly
}
```

### Import/Export

**What it does:** Share code between files
**Syntax:** `export` / `import`

```javascript
// From your code:
// In product.js:
export const menuData = { ... };

// In other files:
import { menuData } from "./product.js";
import { cart } from "./cart.js";

// Default export:
export default function calculateTotal() { }
import calculateTotal from "./utils.js";
```

---

## Async Programming

### `async/await`

**What it does:** Handle asynchronous operations (like API calls)
**Syntax:** `async function` with `await` keyword

```javascript
// From your code:
document
  .querySelector(".js-orderButton")
  .addEventListener("click", async () => {
    try {
      const response = await fetch("placeOrder.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  });
```

### `fetch()`

**What it does:** Makes HTTP requests to servers
**Syntax:** `fetch(url, options)`

```javascript
// GET request:
const response = await fetch("/api/products");
const products = await response.json();

// POST request (from your code):
const response = await fetch("placeOrder.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ cart }),
});
```

### Promises & `.then()`

**What it does:** Handle asynchronous operations (older way before async/await)

```javascript
// Promise chain:
fetch("/api/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// Same with async/await:
try {
  const response = await fetch("/api/data");
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

---

## Local Storage

### `localStorage` Methods

**What it does:** Store data in browser that persists between sessions

```javascript
// From your code:
localStorage.setItem("cart", JSON.stringify(cart)); // Save data
const savedCart = localStorage.getItem("cart"); // Get data
const cart = JSON.parse(savedCart); // Convert back to object

// Other methods:
localStorage.removeItem("cart"); // Delete specific item
localStorage.clear(); // Delete all data
localStorage.key(0); // Get key name by index
```

---

## Object Methods

### `Object.entries()`

**What it does:** Returns array of [key, value] pairs from object

```javascript
// From your code:
for (const [categoryName, products] of Object.entries(menuData)) {
  // categoryName = "mainDishes", "drinks", etc.
  // products = array of products in that category
}

// Example:
const user = { name: "John", age: 30 };
Object.entries(user); // [["name", "John"], ["age", 30]]
```

### `Object.keys()` & `Object.values()`

**What it does:** Get all keys or values from an object

```javascript
const product = { name: "Burger", price: 100, category: "food" };

Object.keys(product); // ["name", "price", "category"]
Object.values(product); // ["Burger", 100, "food"]

// Looping through object keys:
for (const key in menuData) {
  console.log(key, menuData[key]);
}
```

---

## Common Patterns

### Event Delegation

**What it does:** Handle events on parent element instead of each child

```javascript
// From your code:
document.addEventListener("click", function (event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains("update-stock-btn")) {
    // Handle update button click
  }

  if (clickedElement.classList.contains("delete-btn")) {
    // Handle delete button click
  }
});

// Why use this: Works even for dynamically added elements
```

### Conditional (Ternary) Operator

**What it does:** Shorthand for if/else statements
**Syntax:** `condition ? valueIfTrue : valueIfFalse`

```javascript
// Instead of:
let status;
if (stock > 0) {
  status = "In Stock";
} else {
  status = "Out of Stock";
}

// Use:
const status = stock > 0 ? "In Stock" : "Out of Stock";

// From your patterns:
const statusClass = stock === 0 ? "out-of-stock" : "in-stock";
```

### Short-Circuit Evaluation

**What it does:** Use `&&` and `||` for conditional operations

```javascript
// From your code patterns:
const stock = stockData[productId] || { stock: 0, sold: 0 }; // Default value
product && renderProduct(product); // Only run if product exists

// Examples:
user.isLoggedIn && showDashboard(); // Only show if logged in
const name = user.name || "Guest"; // Use "Guest" if no name
```

### Template Pattern for HTML

**What it does:** Build HTML strings dynamically

```javascript
// From your code:
function createProductHTML(product) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₱${(product.price / 100).toFixed(2)}</p>
      <button data-id="${product.id}">Add to Cart</button>
    </div>
  `;
}

// Then use it:
const html = products.map((product) => createProductHTML(product)).join("");
container.innerHTML = html;
```

---

## Quick Reference Tips

### Common Mistakes to Avoid:

```javascript
// ❌ Wrong:
document.querySelector(".button").addEventListener("click", myFunction()); // Calls immediately

// ✅ Correct:
document.querySelector(".button").addEventListener("click", myFunction); // Calls on click
document.querySelector(".button").addEventListener("click", () => myFunction()); // With arrow function
```

### Debugging Tips:

```javascript
console.log(variable); // Check variable value
console.error(error); // Log errors
console.table(arrayOrObject); // Display data in table
debugger; // Pause execution in browser devtools
```

### Performance Tips:

```javascript
// Store DOM queries in variables instead of querying repeatedly:
const button = document.querySelector(".my-button"); // Query once
button.textContent = "Click me"; // Use variable
button.addEventListener("click", handleClick); // Use variable again
```

---

_This reference covers the main JavaScript concepts used in your ecommerce project. Bookmark this file and refer to it whenever you need to remember how these functions work!_ 🚀
