<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "ecommerce_db";

try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Count unique customers (each order = potential unique customer for now)
    $sql = "SELECT COUNT(DISTINCT id) as totalCustomers FROM orders";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    
    $totalCustomers = $row['totalCustomers'];
    
    // Calculate new customers this week
    $thisWeekSql = "SELECT COUNT(DISTINCT id) as newCustomers FROM orders WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)";
    $thisWeekResult = $conn->query($thisWeekSql);
    $thisWeekRow = $thisWeekResult->fetch_assoc();
    
    $newCustomers = $thisWeekRow['newCustomers'];
    
    echo json_encode([
        "success" => true,
        "customersCounter" => $totalCustomers,
        "customersChange" => $newCustomers
    ]);
    
} catch (Exception $error) {
    echo json_encode([
        "success" => false,
        "error" => $error->getMessage(),
        "customersCounter" => 0,
        "customersChange" => 0
    ]);
}

$conn->close();
?>