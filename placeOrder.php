<?php
header("Content-Type: application/json");

// Database credentials that can be used for phpMyAdmin or XAMPP
$servername = "localhost";
$username   = "root";
$password   = "password123";
$dbname     = "ecommerce_db";

// Connect to MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

// Read JSON body from request by using json_decode function and 
// inside it we use file_get_contents function to get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

// checks if cart data is present using isset function
if (!isset($data["cart"])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No cart data"]);
    exit();
}

// Convert cart array to JSON and use real escape string to prevent SQL injection
$cartJson = $conn->real_escape_string(json_encode($data["cart"]));

// Insert into database table
$sql = "INSERT INTO orders (cart) VALUES ('$cartJson')";

// return response based on the query result
if ($conn->query($sql) === TRUE) {
    $orderId = $conn->insert_id;
    echo json_encode(["success" => true, "orderId" => $orderId]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "DB insert failed"]);
}

// Close connection
$conn->close();
?>
