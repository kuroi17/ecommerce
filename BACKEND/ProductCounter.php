<?php
// Allow requests from any origin (for testing)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "ecommerce_db";

try{
  $conn = new mysqli ($servername, $username, $password, $dbname);

  if ($conn -> connect_error) {
      throw new Exception("Connection failed: ".$conn -> connect_error);
  }

  // Define your menu items (same as product.js)
  $menuItems = [
      'chickenjoy' => ['name' => 'Chickenjoy', 'price' => 82.00],
      'spaghetti' => ['name' => 'Spaghetti', 'price' => 60.00],
      'burgersteak' => ['name' => 'Burger Steak', 'price' => 60.00],
      'burger' => ['name' => 'Burger', 'price' => 40.00],
      'fries' => ['name' => 'Fries', 'price' => 50.00],
      'coke' => ['name' => 'Coke', 'price' => 53.00],
      'pineapple' => ['name' => 'Pineapple Juice', 'price' => 64.00],
      'water' => ['name' => 'Water', 'price' => 35.00],
      'mangopie' => ['name' => 'Mango Pie', 'price' => 48.00],
      'sundae' => ['name' => 'Sundae', 'price' => 59.00],
      'cokefloat' => ['name' => 'Coke Float', 'price' => 57.00],
  ];

  // Count products dynamically
  $totalProducts = count($menuItems);
  $productsChange = 0; // Products don't change often

  echo json_encode([
      "success" => true,
      "productsCounter" => $totalProducts,
      "productsChange" => $productsChange
  ]);

}catch (Exception $error){
  echo json_encode([
    "success" => false,
    "error" => $error->getMessage(),
    "productsCounter" => 0,
    "productsChange" => 0
  ]);
}

$conn -> close();
?>