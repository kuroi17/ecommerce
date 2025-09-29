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

// Database credentials that can be used for phpMyAdmin or XAMPP
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "ecommerce_db";

try{
  $conn = new mysqli ($servername, $username, $password, $dbname);

  if ( $conn -> connect_error) throw new Exception("Connection failed: ".$conn -> connect_error);

  $sql = "SELECT COUNT(*) AS orderCounter FROM orders";
  $result = $conn -> query($sql); // query means execute the SQL statement 
  $row = $result -> fetch_assoc(); // fetch_assoc() puts the result into an associative array
  $currentOrders = $row['orderCounter'];


// db sql query
  $lastWeekSql = "
  SELECT COUNT(*) as OrderCounterLastWeek 
  FROM orders
  WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 2 WEEK)
  AND created_at < DATE_SUB(CURDATE(), INTERVAL 1 WEEK);
  ";

  $lastWeekResult = $conn -> query($lastWeekSql); // query means execute the sql
  $lastWeekRow = $lastWeekResult -> fetch_assoc(); // fetch_assoc() puts the result into an associative array
  $lastWeekOrders = $lastWeekRow['OrderCounterLastWeek'] ?? 0;

  // if there were orders last week, calculate percentage change
  if ($lastWeekOrders > 0) {
    $percentchange = round(($currentOrders - $lastWeekOrders) / $lastWeekOrders * 100);
  }
  else{ // if there is no, then set percentage change to 0
    $percentchange = 0;
  }
// the backend will send back a json response
  echo json_encode([
    "success" => true,
    "orderCounter" => $currentOrders,
    "percentage_change" => $percentchange
  ]);
} catch (Exception $error ){
  echo json_encode([
    "success" => false,
    "error" => $error -> getMessage()


  ]);
}
$conn -> close();

?>  