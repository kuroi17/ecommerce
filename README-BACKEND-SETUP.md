# 🚀 Complete Setup Guide - Jollibee E-commerce

This guide will help you set up the complete full-stack environment for the Jollibee e-commerce website with organized FRONTEND/BACKEND structure using XAMPP + Live Server.

## 📋 Prerequisites

- Windows OS
- XAMPP installed (Apache + PHP + MySQL)
- VS Code with Live Server extension
- Basic knowledge of PHP, MySQL, and JavaScript

---

## 🛠️ Step 1: Install XAMPP

1. **Download XAMPP** from: https://www.apachefriends.org/download.html
2. **Install XAMPP** to default location: `C:\xampp\`
3. **Complete installation** and launch XAMPP Control Panel

---

## ⚡ Step 2: Start Required Services

1. **Open XAMPP Control Panel**
2. **Start Apache** - Click "Start" button (should turn green)
3. **Start MySQL** - Click "Start" button (should turn green)
4. **Verify both services** are running (green "Stop" buttons visible)

---

## 📁 Step 3: Deploy Organized Project Structure

1. **Copy your entire organized project folder** to XAMPP's web directory:
   ```
   Source: C:\Users\[YourName]\ecommerce-1\
   Destination: C:\xampp\htdocs\ecommerce-1\
   ```

2. **Verify organized file structure** in `C:\xampp\htdocs\ecommerce-1\`:
   ```
   ecommerce-1/
   ├── FRONTEND/
   │   ├── main.html
   │   ├── checkout.html
   │   ├── AdminPanel.html
   │   ├── Javascripts/
   │   │   ├── CONFIGJS.js          (API configuration)
   │   │   ├── renderPayment.js     (order processing)
   │   │   ├── AdminPanel.js        (dashboard logic)
   │   │   ├── main.js
   │   │   └── cart.js
   │   ├── Stylesheets/
   │   │   ├── checkout.css
   │   │   ├── AdminPanel.css
   │   │   └── ... (other CSS files)
   │   └── images/
   └── BACKEND/
       ├── placeOrder.php           (order processing API)
       ├── OrderCounter.php         (admin dashboard API)
       ├── TotalRevenue.php         (revenue calculations)
       ├── ProductCounter.php       (product statistics)
       ├── CustomerCounter.php      (customer analytics)
       └── ecommerce_db.sql         (database structure)
   ```

---

## 🗄️ Step 4: Database Setup

### 4.1 Access phpMyAdmin
1. **Open browser** and navigate to: `http://localhost/phpmyadmin`
2. **Login** (default: username=`root`, password=`blank`)

### 4.2 Create Database
1. **Click "New"** in left sidebar
2. **Enter database name**: `ecommerce_db`
3. **Click "Create"**

### 4.3 Import Complete Database Structure
1. **Select `ecommerce_db`** from left sidebar
2. **Click "Import" tab** at the top
3. **Click "Choose File"** and select: `C:\xampp\htdocs\ecommerce-1\BACKEND\ecommerce_db.sql`
4. **Click "Go"** to import all tables

**OR manually create orders table:**
1. **Click "SQL" tab** at the top
2. **Copy and paste this SQL**:
   ```sql
   CREATE TABLE orders(
       id INT AUTO_INCREMENT PRIMARY KEY,
       cart JSON NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```
## 🔧 Step 5: Configure API Settings

### 5.1 Verify Database Connection (BACKEND files)
All PHP files in `BACKEND/` folder should have correct XAMPP settings:
```php
$servername = "localhost";
$username   = "root";
$password   = "";           // XAMPP default: no password
$dbname     = "ecommerce_db";
```

### 5.2 Configure API Endpoints (FRONTEND/Javascripts/CONFIGJS.js)
The centralized configuration should point to organized backend:
```javascript
export const API_URL = 'http://localhost';
export const API_ENDPOINTS = {
    PLACE_ORDER: '/ecommerce-1/BACKEND/placeOrder.php',
    ORDER_COUNT: '/ecommerce-1/BACKEND/OrderCounter.php',
    TOTAL_REVENUE: '/ecommerce-1/BACKEND/TotalRevenue.php',
    PRODUCT_COUNT: '/ecommerce-1/BACKEND/ProductCounter.php',
    CUSTOMER_COUNT: '/ecommerce-1/BACKEND/CustomerCounter.php'
};
```

### 5.3 Verify CORS Headers (All BACKEND PHP files)
Ensure all PHP files have proper CORS configuration:
```php
## 🧪 Step 6: Test the Complete Setup

### 6.1 Start Live Server (Frontend)
1. **Navigate to**: `C:\xampp\htdocs\ecommerce-1\FRONTEND\`
2. **Right-click on `main.html`** in VS Code
3. **Select "Open with Live Server"**
4. **Verify website loads** at `http://127.0.0.1:5503` with all styling and images

### 6.2 Test E-commerce Functionality
1. **Browse products** on main page
2. **Add items to cart** and navigate to checkout
3. **Place a test order** by clicking "Place your order"
4. **Check browser console** (F12) for success response:
   ```json
   {success: true, orderId: 1}
   ```

### 6.3 Test Admin Dashboard
1. **Open AdminPanel.html** with Live Server
2. **Navigate to**: `http://127.0.0.1:5503/AdminPanel.html`
3. **Verify all counters load**:
## 🎯 Expected Results

✅ **XAMPP Services**: Apache & MySQL both running (green in XAMPP Control Panel)  
✅ **Frontend**: Accessible at `http://127.0.0.1:5503/main.html` via Live Server  
✅ **Backend APIs**: Accessible at `http://localhost/ecommerce-1/BACKEND/` endpoints  
✅ **Order Processing**: Working without CORS errors from frontend to backend  
✅ **Admin Dashboard**: All counters loading with real database data  
✅ **Database**: Storing cart data as JSON in `orders` table  
✅ **Console Responses**: Showing `{success: true, orderId: X}` for successful orders
1. **Go to phpMyAdmin**: `http://localhost/phpmyadmin`
2. **Navigate to**: `ecommerce_db` → `orders` table
3. **Click "Browse"** - you should see your order data stored as JSON

### 6.5 Test Backend APIs Individually
Test each API endpoint directly in browser:
- `http://localhost/ecommerce-1/BACKEND/OrderCounter.php`
- `http://localhost/ecommerce-1/BACKEND/TotalRevenue.php`
- `http://localhost/ecommerce-1/BACKEND/ProductCounter.php`
- `http://localhost/ecommerce-1/BACKEND/CustomerCounter.php`
3. **Add items to cart** and navigate to checkout

### 6.2 Test Backend Integration
1. **Place a test order** by clicking "Place your order"
2. **Check browser console** (F12) for success response:
   ```json
   {success: true, orderId: 1}
   ```

### 6.3 Verify Database Storage
1. **Go to phpMyAdmin**: `http://localhost/phpmyadmin`
2. **Navigate to**: `ecommerce_db` → `orders` table
3. **Click "Browse"** - you should see your order data stored as JSON

---

## 🎯 Expected Results

✅ **Apache & MySQL** running (green in XAMPP)  
✅ **Website accessible** at `http://localhost/ecommerce-1/main.html`  
✅ **Orders processing** without CORS errors  
✅ **Database storing** cart data as JSON  
✅ **Console showing** success responses  

## 🚨 Common Issues & Solutions

### Issue 1: CORS Error
**Problem**: `Access to fetch at 'localhost' from origin '127.0.0.1:5503' has been blocked by CORS policy`  
**Solution**: Ensure ALL BACKEND PHP files have CORS headers: `header("Access-Control-Allow-Origin: *");`

### Issue 2: 404 Error on PHP Files
**Problem**: `GET http://localhost/ecommerce-1/BACKEND/placeOrder.php 404 (Not Found)`  
**Solution**: Verify project is copied to `C:\xampp\htdocs\ecommerce-1\` and XAMPP Apache is running

### Issue 3: Database Connection Failed
**Problem**: `mysqli_sql_exception: Access denied for user 'root'@'localhost'`  
**Solution**: Ensure password is empty in ALL BACKEND PHP files: `$password = "";`

### Issue 4: Admin Dashboard Not Loading Data
**Problem**: Admin counters show "Loading..." or "0"  
**Solution**: Check that all BACKEND API files exist and have correct database connections

### Issue 5: Import/Module Errors
**Problem**: `Cannot use import statement outside a module`  
**Solution**: Ensure HTML files have `<script type="module">` when importing CONFIGJS.js

### Issue 6: JSON Parse Error
**Problem**: `Unexpected token '<' in JSON`  
**Solution**: PHP is returning HTML errors instead of JSON - check database connection and table existence

### Issue 7: Live Server vs XAMPP Conflict
**Problem**: Frontend can't reach backend APIs  
**Solution**: Use Live Server for frontend (127.0.0.1:5503) + XAMPP for backend (localhost:80) with proper CORS
**Problem**: `Unexpected token '<'`  
**Solution**: PHP is returning HTML errors instead of JSON - check database connection and table existence

---

## 📝 Important Notes

- **XAMPP must be running** (Apache + MySQL) before testing any backend functionality
- **Default XAMPP MySQL** has no root password (`$password = "";`)
- **Project files must be in** `C:\xampp\htdocs\` folder for PHP to work
- **Database name is case-sensitive** (`ecommerce_db`)
- **Use Live Server for frontend** (automatic browser refresh during development)
- **Backend APIs run on XAMPP** (localhost:80) while frontend runs on Live Server (127.0.0.1:5503)
- **CONFIGJS.js centralizes all API endpoints** for easy management

---

## 🎉 Success Indicators

When everything works correctly, you should see:

### ✅ **XAMPP Control Panel**
- Apache: Running (green "Stop" button)
- MySQL: Running (green "Stop" button)

### ✅ **Frontend (Live Server)**
- Main website: `http://127.0.0.1:5503/main.html`
- Admin dashboard: `http://127.0.0.1:5503/AdminPanel.html`
- All styling and images loading correctly

### ✅ **Backend APIs (XAMPP)**
- Order processing: Working without CORS errors
- Admin counters: Loading real database data
- Console responses: `{success: true, orderId: X}`

### ✅ **Database (phpMyAdmin)**
- Orders successfully stored as JSON
- Admin dashboard showing accurate statistics

### ✅ **File Organization**
- Clean FRONTEND/BACKEND separation
- Centralized API configuration
- Modular JavaScript structure

**You now have a fully functional e-commerce website with admin dashboard! 🚀🎊**