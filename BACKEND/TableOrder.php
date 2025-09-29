<?php
// Tell the browser we are returning JSON
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Database settings
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "ecommerce_db";

try{


// Connect to database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if connection failed
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "error" => "Connection failed: " . $conn->connect_error,
        "orders" => []
    ]);
    exit; // Stop script if no connection
}

// Price list (lookup table)
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

// Get latest 5 orders
$sql = "SELECT id, cart, created_at FROM orders ORDER BY created_at DESC LIMIT 5";
$result = $conn->query($sql);

$orders = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $cart = json_decode($row['cart'], true);

        $items = [];
        $total = 0;

        // Loop through items in the cart
        foreach ($cart as $item) {
            $menuId = $item['menuDataId']; // e.g., 'chickenjoy'
            $quantity = $item['quantity']; // e.g., 2

            // If price exists in the list, use it, otherwise use 0
            if (isset($prices[$menuId])) {
                $price = $prices[$menuId]; // e.g., 82.00
            } else {
                $price = 0;
            }

            // Format item name (capitalize nicely)
            $name = ucfirst(str_replace(['_', '-'], ' ', $menuId));

            $items[] = $quantity . "x " . $name;
            $total = $total + ($price * $quantity);
        }

        // Random status just for demo
        $statuses = ['pending', 'preparing', 'completed'];
        $randomIndex = array_rand($statuses); // get random index
        $status = $statuses[$randomIndex]; // get random status by random index

        // Format order time
        $time = date('g:i A', strtotime($row['created_at']));

        $orders[] = [
            "id" => $row['id'],
            "items" => implode(', ', $items),
            "total" => $total,
            "status" => $status,
            "time" => $time
        ];
    }
}

// Send JSON response
echo json_encode([
    "success" => true,
    "orders" => $orders
]);
}catch (Exception $error) {
    echo json_encode([
        "success" => false,
        "error" => $error->getMessage(),
        "orders" => []
    ]);
}

$conn->close();
?>
