# 🚀 Backend Setup Guide - Jollibee E-commerce

This guide will help you set up the complete backend environment for the Jollibee e-commerce website using XAMPP.

## 📋 Prerequisites

- Windows OS
- XAMPP installed (Apache + PHP + MySQL)
- Basic knowledge of PHP and MySQL

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

## 📁 Step 3: Deploy Project Files

1. **Copy your entire project folder** to XAMPP's web directory:
   ```
   Source: C:\Users\[YourName]\ecommerce-1\
   Destination: C:\xampp\htdocs\ecommerce-1\
   ```

2. **Verify file structure** in `C:\xampp\htdocs\ecommerce-1\`:
   ```
   ecommerce-1/
   ├── main.html
   ├── placeOrder.php
   ├── renderPayment.js
   ├── ecommerce_db.sql
   └── ... (other files)
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

### 4.3 Create Orders Table
1. **Select `ecommerce_db`** from left sidebar
2. **Click "SQL" tab** at the top
3. **Copy and paste this SQL**:
   ```sql
   CREATE TABLE orders(
       id INT AUTO_INCREMENT PRIMARY KEY,
       cart JSON NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```
4. **Click "Go"** to execute
5. **Verify table creation** - `orders` should appear in left sidebar

---

## 🔧 Step 5: Configure PHP Settings

### 5.1 Update Database Connection
Ensure `placeOrder.php` has correct XAMPP settings:
```php
$servername = "localhost";
$username   = "root";
$password   = "";           // XAMPP default: no password
$dbname     = "ecommerce_db";
```

### 5.2 Update Frontend URL
Ensure `renderPayment.js` points to local server:
```javascript
const response = await fetch("http://localhost/ecommerce-1/placeOrder.php", {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify({
        cart: cart,
    }),
});
```

---

## 🧪 Step 6: Test the Setup

### 6.1 Test Frontend
1. **Open browser** and go to: `http://localhost/ecommerce-1/main.html`
2. **Verify website loads** with all styling and images
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

---

## 🚨 Common Issues & Solutions

### Issue 1: CORS Error
**Problem**: `Access denied from origin`  
**Solution**: Check `placeOrder.php` has: `header("Access-Control-Allow-Origin: *");`

### Issue 2: Database Connection Failed
**Problem**: `mysqli_sql_exception: Access denied`  
**Solution**: Ensure password is empty: `$password = "";`

### Issue 3: Table Not Found
**Problem**: `Table 'ecommerce_db.orders' doesn't exist`  
**Solution**: Manually create table using SQL in Step 4.3

### Issue 4: JSON Parse Error
**Problem**: `Unexpected token '<'`  
**Solution**: PHP is returning HTML errors instead of JSON - check database connection and table existence

---

## 📝 Notes

- **XAMPP must be running** before testing
- **Default XAMPP MySQL** has no root password
- **Project files must be in** `htdocs` folder to work
- **Database name is case-sensitive**

---

## 🎉 Success Indicators

When everything works correctly, you should see:
1. **XAMPP Control Panel**: Apache & MySQL both green
2. **Website**: Fully functional at localhost
3. **Orders**: Successfully stored in database
4. **Console**: `{success: true, orderId: X}` responses

**Happy coding! 🚀**