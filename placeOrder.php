<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "password123";
$dbname - "ecommerce-db";

$conn = new mysqli($servername , $username, $password, $dbname);

if ($conn-> connect_error){
    http_response_code(500);
    echo json_code(["success" => false, "message" => "Databased conn failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"),true);

if (!isset($data["cart"])){
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No cart data"]);
    exit ();
}

$cartJson = $conn -> real_escape_string(json_encode($data["cart"]));
$sql = "INSERT INTO orders (cart) VALUES ($cartJson)";

if ($conn->query($sql) === TRUE) {
  $orderId = $conn->insert_id;
  echo json_encode(["success" => true, "orderId" => $orderId]);
} else {
  http_response_code(500);
  echo json_encode(["success" => false, "message" => "DB insert failed"]);
}

$conn->close();


?>