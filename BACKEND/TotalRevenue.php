<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");


// Database credentials that can be used for phpMyAdmin or XAMPP
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "ecommerce_db";

try{
  $conn = new mysqli ($servername, $username, $password, $dbname);

 if ( $conn -> connect_error) throw new Exception("Connection failed: ".$conn -> connect_error);

 $prices = [
        'chickenjoy' => 82.00,
        'spaghetti' => 60.00,
        'burgersteak' => 60.00,
        'burger' => 40.00,
        'fries' => 50.00,
        'coke' => 53.00,
        'pineapple' => 64.00,
        'water' => 35.00,
        'mangopie' => 48.00,
        'sundae' => 59.00,
        'cokefloat' => 57.00,
    ];

$sql = "SELECT cart FROM orders";
$result = $conn -> query($sql);

$totalRevenue = 0;

while ($row = $result -> fetch_assoc()){
  $cart = json_decode($row['cart'], true);

  foreach ($cart as $item) {
            $menuId = $item['menuDataId'];
            $quantity = $item['quantity'];
            $price = $prices[$menuId] ?? 0;
            
            $totalRevenue += ($price * $quantity);
        }
}
echo json_encode([
        "success" => true,
        "revenueCounter" => $totalRevenue,
        "revenueChange" => 12; //hardcoded value for demonstration
    ]);
}catch (Exception $error){
  echo json_encode([
    "success" => false,
    "error" => $error->getMessage()
  ]);
}
$conn -> close();



?>