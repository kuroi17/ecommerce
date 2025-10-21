# HTML & CSS Learning Reference 🎨

## Table of Contents

1. [HTML Elements](#html-elements)
2. [CSS Properties](#css-properties)
3. [CSS Selectors](#css-selectors)
4. [Layout & Positioning](#layout--positioning)
5. [Styling Techniques](#styling-techniques)
6. [Responsive Design](#responsive-design)
7. [Common Patterns](#common-patterns)

---

## HTML Elements

### Basic Structure

**What it does:** Creates the foundation of your webpage

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Page Title</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <!-- Your content goes here -->
  </body>
</html>
```

### `<div>` - Container Element

**What it does:** Groups other elements together, like a box
**Usage:** Layout, styling, organization

```html
<!-- From your code: -->
<div class="product-admin-card">
  <div class="customer-info">
    <h3>Customer Name</h3>
  </div>
</div>

<!-- Think of it as: -->
Box containing other elements
```

### `<header>` - Page/Section Header

**What it does:** Defines the top section of a page or section

```html
<!-- From your AdminPanel: -->
<header class="admin-header">
  <div class="logo-section">
    <img src="images/jollibee.png" alt="Jolibee" />
    <h1>Admin Dashboard</h1>
  </div>
</header>
```

### `<nav>` - Navigation Menu

**What it does:** Contains navigation links

```html
<!-- From your sidebar: -->
<nav class="sidebar">
  <ul class="sidebar-menu">
    <li class="nav-item">
      <a href="AdminPanel.html">📊Dashboard</a>
    </li>
  </ul>
</nav>
```

### `<main>` - Main Content Area

**What it does:** Contains the primary content of the page

```html
<main class="main-content">
  <!-- Your main page content -->
</main>
```

### `<button>` - Clickable Button

**What it does:** Creates a clickable button element

```html
<!-- From your code: -->
<button class="add-product-btn">+ Add New Product</button>
<button class="action-btn delete-btn" data-product-id="123">Delete</button>

<!-- Different types: -->
<button type="button">Regular Button</button>
<button type="submit">Form Submit</button>
<button type="reset">Form Reset</button>
```

### `<input>` - User Input Fields

**What it does:** Allows users to enter data

```html
<!-- Text input: -->
<input type="text" placeholder="Enter your name" />

<!-- Number input (from your stock controls): -->
<input type="number" class="stock-input" value="25" min="0" />

<!-- Radio buttons (for choices): -->
<input type="radio" name="size" value="small" id="small" />
<label for="small">Small</label>

<!-- Checkbox: -->
<input type="checkbox" id="agree" />
<label for="agree">I agree</label>

<!-- Other types: -->
<input type="email" placeholder="your@email.com" />
<input type="password" placeholder="Password" />
<input type="search" placeholder="Search..." />
```

### `<img>` - Images

**What it does:** Displays images

```html
<!-- From your code: -->
<img src="images/jollibee.png" alt="Jolibee Logo" class="admin-logo" />

<!-- Always include alt for accessibility: -->
<img src="product.jpg" alt="Description of the image" />
```

### `<a>` - Links

**What it does:** Creates clickable links

```html
<!-- Link to another page: -->
<a href="AdminPanel.html">Go to Dashboard</a>

<!-- Link to external website: -->
<a href="https://google.com" target="_blank">Open Google</a>

<!-- Link that opens in new tab: -->
<a href="main.html" target="_blank">🏠 View Website</a>
```

### Lists - `<ul>`, `<ol>`, `<li>`

**What it does:** Creates organized lists

```html
<!-- Unordered list (bullets): -->
<ul class="sidebar-menu">
  <li class="nav-item">Dashboard</li>
  <li class="nav-item">Products</li>
  <li class="nav-item">Orders</li>
</ul>

<!-- Ordered list (numbers): -->
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

### Headings - `<h1>` to `<h6>`

**What it does:** Creates different sized headings

```html
<h1>Main Title (Biggest)</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Sub-subsection</h4>
<h5>Small heading</h5>
<h6>Smallest heading</h6>

<!-- From your code: -->
<h2>Products Stock Management</h2>
<h3 class="stock-section-title">Main Dishes</h3>
```

### `<p>` - Paragraphs

**What it does:** Contains text paragraphs

```html
<p>This is a paragraph of text.</p>
<p class="customer-title">Frequent Foodie</p>
```

### `<span>` - Inline Container

**What it does:** Groups inline elements (doesn't create new line)

```html
<!-- From your code: -->
<span class="icon">📧</span>
<span class="stat-value">45</span>
<span class="stat-label">Orders</span>
```

---

## CSS Properties

### `padding` - Inside Space

**What it does:** Adds space INSIDE an element (between content and border)

```css
/* From your code: */
.product-admin-card {
  padding: 25px; /* Space inside the card */
}

/* Different ways: */
padding: 20px; /* All sides: 20px */
padding: 10px 20px; /* Top/bottom: 10px, Left/right: 20px */
padding: 10px 15px 20px 25px; /* Top, Right, Bottom, Left */
padding-top: 10px; /* Only top */
padding-left: 15px; /* Only left */
```

### `margin` - Outside Space

**What it does:** Adds space OUTSIDE an element (between elements)

```css
/* From your code: */
.stock-section {
  margin-bottom: 40px; /* Space below this element */
}

/* Different ways: */
margin: 20px; /* All sides: 20px */
margin: 10px 20px; /* Top/bottom: 10px, Left/right: 20px */
margin: auto; /* Center horizontally */
margin-top: 15px; /* Only top */
```

### `display` - How Element is Shown

**What it does:** Controls how an element is displayed

```css
/* From your code: */
.products-grid {
  display: grid; /* Creates a grid layout */
}

.product-actions {
  display: flex; /* Creates a flexible row/column */
}

/* Common values: */
display: block; /* Takes full width, new line */
display: inline; /* Takes only needed width, same line */
display: none; /* Hides the element completely */
display: flex; /* Flexible container */
display: grid; /* Grid container */
```

### `background` - Background Styling

**What it does:** Sets the background of an element

```css
/* From your code: */
.customer-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Different ways: */
background-color: #f8f9fa; /* Solid color */
background-image: url("image.jpg"); /* Image */
background: white; /* Simple color */
background: #007bff; /* Hex color */
```

### `border` - Element Border

**What it does:** Adds a border around an element

```css
/* From your code: */
.quantity-btn {
  border: 2px solid #007bff; /* 2px thick, solid line, blue color */
}

/* Different styles: */
border: 1px solid black; /* Thin black line */
border: none; /* No border */
border-radius: 8px; /* Rounded corners */
border-top: 2px solid red; /* Only top border */
```

### `color` & `font` - Text Styling

**What it does:** Controls text appearance

```css
/* From your code: */
.product-admin-name {
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

/* Text properties: */
color: #333; /* Text color */
font-size: 16px; /* Text size */
font-weight: bold; /* Text thickness */
font-style: italic; /* Italic text */
text-align: center; /* Text alignment */
text-transform: uppercase; /* MAKES TEXT UPPERCASE */
```

### `width` & `height` - Element Size

**What it does:** Controls element dimensions

```css
/* From your code: */
.quantity-btn {
  width: 35px;
  height: 35px;
}

/* Different ways: */
width: 100px; /* Fixed width */
width: 50%; /* 50% of parent */
width: 100vw; /* 100% of viewport width */
height: auto; /* Height adjusts to content */
max-width: 300px; /* Maximum width */
min-height: 100px; /* Minimum height */
```

### `position` - Element Positioning

**What it does:** Controls how elements are positioned

```css
/* From your code: */
.customer-badge {
  position: absolute; /* Positioned relative to parent */
  top: 15px;
  right: 15px;
}

/* Position types: */
position: static; /* Normal flow (default) */
position: relative; /* Relative to normal position */
position: absolute; /* Relative to positioned parent */
position: fixed; /* Relative to viewport (doesn't scroll) */
position: sticky; /* Sticks when scrolling */
```

---

## CSS Selectors

### Class Selector (`.classname`)

**What it does:** Selects elements with specific class

```css
/* From your code: */
.product-admin-card {
  /* Styles for elements with class="product-admin-card" */
}

.nav-item.active {
  /* Styles for elements with BOTH classes: nav-item AND active */
}
```

### ID Selector (`#idname`)

**What it does:** Selects element with specific ID

```css
#popup {
  /* Styles for element with id="popup" */
}

/* IDs should be unique on the page */
```

### Element Selector (`elementname`)

**What it does:** Selects all elements of that type

```css
/* From your code: */
body {
  font-family: "Poppins", sans-serif;
}

button {
  cursor: pointer;
}

/* Selects ALL buttons, ALL divs, etc. */
```

### Descendant Selector (space)

**What it does:** Selects elements inside other elements

```css
/* From your code: */
.customer-info h3 {
  /* Selects h3 elements INSIDE elements with class customer-info */
}

.sidebar ul li {
  /* Selects li elements inside ul inside elements with class sidebar */
}
```

### Pseudo-classes (`:hover`, `:focus`, etc.)

**What it does:** Selects elements in specific states

```css
/* From your code: */
.quantity-btn:hover {
  background: #007bff; /* When mouse hovers over button */
}

.stock-input:focus {
  border-color: #007bff; /* When input is clicked/focused */
}

/* Common pseudo-classes: */
:hover     /* Mouse over */
:focus     /* Clicked/selected */
:active    /* Being clicked */
:first-child  /* First child element */
:last-child   /* Last child element */
```

---

## Layout & Positioning

### Flexbox - Flexible Layout

**What it does:** Creates flexible rows or columns

```css
/* From your code: */
.product-actions {
  display: flex;
  gap: 10px;
  justify-content: space-between; /* Space elements apart */
  align-items: center; /* Center vertically */
}

/* Flex properties: */
flex-direction: row; /* Horizontal (default) */
flex-direction: column; /* Vertical */
justify-content: center; /* Center horizontally */
align-items: center; /* Center vertically */
gap: 20px; /* Space between items */
```

### Grid - Grid Layout

**What it does:** Creates a grid of rows and columns

```css
/* From your code: */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.product-actions {
  display: grid;
  grid-template-columns: 2fr 1fr; /* First column 2x wider */
}

/* Grid properties: */
grid-template-columns: 1fr 1fr 1fr; /* 3 equal columns */
grid-template-rows: 100px auto; /* Row heights */
grid-gap: 15px; /* Space between items */
```

### Box Model

**What it does:** How space is calculated around elements

```
┌─────────────────────────────────┐
│           MARGIN                │
│ ┌─────────────────────────────┐ │
│ │          BORDER             │ │
│ │ ┌─────────────────────────┐ │ │
│ │ │        PADDING          │ │ │
│ │ │ ┌─────────────────────┐ │ │ │
│ │ │ │      CONTENT        │ │ │ │
│ │ │ └─────────────────────┘ │ │ │
│ │ └─────────────────────────┘ │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

From inside out: Content → Padding → Border → Margin

---

## Styling Techniques

### Gradients - Color Transitions

**What it does:** Creates smooth color transitions

```css
/* From your code: */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Types: */
linear-gradient(to right, red, blue);        /* Left to right */
linear-gradient(45deg, #ff6b6b, #4ecdc4);   /* Diagonal */
radial-gradient(circle, white, black);        /* Circular */
```

### Box Shadow - Drop Shadows

**What it does:** Adds shadows around elements

```css
/* From your code: */
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);

/* Syntax: horizontal vertical blur spread color */
box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.3);
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
box-shadow: none; /* Remove shadow */
```

### Transform - Move/Rotate/Scale

**What it does:** Transforms elements without affecting layout

```css
/* From your code: */
transform: translateY(-2px); /* Move up 2px */
transform: scale(1.05); /* Make 5% bigger */

/* Transform types: */
transform: translate(10px, 20px); /* Move right 10px, down 20px */
transform: rotate(45deg); /* Rotate 45 degrees */
transform: scale(1.2); /* Make 20% bigger */
```

### Transition - Smooth Changes

**What it does:** Makes property changes smooth over time

```css
/* From your code: */
transition: all 0.3s ease;

/* Syntax: property duration timing-function */
transition: color 0.5s ease; /* Color changes smoothly */
transition: transform 0.2s ease-in-out; /* Transform changes smoothly */
transition: all 0.3s ease; /* All properties change smoothly */
```

---

## Responsive Design

### Media Queries - Different Screen Sizes

**What it does:** Applies different styles for different screen sizes

```css
/* From your code: */
@media (max-width: 768px) {
  .product-actions {
    grid-template-columns: 1fr; /* Stack buttons vertically on mobile */
  }

  .customers-grid {
    grid-template-columns: 1fr; /* Single column on mobile */
  }
}

/* Common breakpoints: */
@media (max-width: 480px) {
  /* Mobile phones */
}
@media (max-width: 768px) {
  /* Tablets */
}
@media (max-width: 1024px) {
  /* Small laptops */
}
@media (min-width: 1200px) {
  /* Large screens */
}
```

### Viewport Units

**What it does:** Sizes relative to the screen size

```css
/* Viewport units: */
width: 100vw; /* 100% of viewport width */
height: 100vh; /* 100% of viewport height */
font-size: 4vw; /* Font size relative to viewport width */

/* From your code patterns: */
.full-screen {
  width: 100vw;
  height: 100vh;
}
```

---

## Common Patterns

### Card Layout

**What it does:** Creates card-style containers

```css
/* From your code: */
.product-admin-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
}

.product-admin-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
```

### Button Styling

**What it does:** Makes buttons look good and interactive

```css
/* From your code: */
.action-btn {
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
```

### Center Content

**What it does:** Centers content horizontally and/or vertically

```css
/* Horizontal centering: */
.center-horizontal {
  margin: 0 auto; /* For block elements */
  text-align: center; /* For text/inline elements */
}

/* Both horizontal and vertical: */
.center-both {
  display: flex;
  justify-content: center; /* Horizontal */
  align-items: center; /* Vertical */
}

/* From your code: */
.stock-quantity-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Hide/Show Elements

**What it does:** Controls element visibility

```css
/* From your code: */
.restock-btn,
.edit-btn {
  display: none; /* Completely hidden */
}

/* Other ways: */
visibility: hidden; /* Hidden but takes up space */
opacity: 0; /* Transparent */
opacity: 1; /* Fully visible */
```

---

## Quick Reference Tips

### Common Measurements:

```css
/* Absolute units: */
px  /* Pixels - exact size */
pt  /* Points - for print */

/* Relative units: */
%   /* Percent of parent */
em  /* Relative to font size */
rem /* Relative to root font size */
vw  /* Viewport width percentage */
vh  /* Viewport height percentage */
```

### Color Formats:

```css
/* Different ways to write colors: */
color: red; /* Color name */
color: #ff0000; /* Hex code */
color: rgb(255, 0, 0); /* RGB values */
color: rgba(255, 0, 0, 0.5); /* RGB with transparency */
color: hsl(0, 100%, 50%); /* HSL format */
```

### Debugging Tips:

```css
/* Temporary border to see element boundaries: */
* {
  border: 1px solid red;
}

/* Background color to see element size: */
.debug {
  background-color: rgba(255, 0, 0, 0.2);
}
```

### Performance Tips:

```css
/* Use transform instead of changing position: */
/* ❌ Slower: */
.slow:hover {
  top: -5px;
}

/* ✅ Faster: */
.fast:hover {
  transform: translateY(-5px);
}
```

---

_This reference covers the main HTML elements and CSS properties used in your ecommerce project. Use this as your go-to guide when you forget how things work!_ 🎨🚀
