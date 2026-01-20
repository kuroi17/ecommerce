<?php
// Allow requests from any origin (for testing)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

// Database settings
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "ecommerce_db";

try {
    // Connect to database
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check if connection failed
    if ($conn->connect_error) {
        echo json_encode([
            "success" => false,
            "error" => "Connection failed: " . $conn->connect_error,
            "orders" => []
        ]);
        exit;
    }

    // Handle PUT request (Update order)
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $requestUri = $_SERVER['REQUEST_URI'];
        $uriParts = explode('/', $requestUri);
        $orderId = end($uriParts);

        if (!is_numeric($orderId)) {
            echo json_encode([
                "success" => false,
                "error" => "Invalid order ID"
            ]);
            exit;
        }

        $putData = json_decode(file_get_contents("php://input"), true);

        if (!$putData) {
            echo json_encode([
                "success" => false,
                "error" => "No data provided"
            ]);
            exit;
        }

        $updateFields = [];
        $params = [];
        $types = "";

        // Update cart if provided
        if (isset($putData['cart'])) {
            $updateFields[] = "cart = ?";
            $params[] = $putData['cart'];
            $types .= "s";
        }

        // Update notes if provided
        if (isset($putData['notes'])) {
            $updateFields[] = "notes = ?";
            $params[] = $putData['notes'];
            $types .= "s";
        }

        if (empty($updateFields)) {
            echo json_encode([
                "success" => false,
                "error" => "No valid fields to update"
            ]);
            exit;
        }

        $params[] = $orderId;
        $types .= "i";

        $sql = "UPDATE orders SET " . implode(", ", $updateFields) . " WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param($types, ...$params);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Order updated successfully"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "error" => "Failed to update order: " . $stmt->error
            ]);
        }

        $stmt->close();
        $conn->close();
        exit;
    }

    // Handle GET request
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Check if requesting raw cart data for a specific order
        if (isset($_GET['raw']) && isset($_GET['id'])) {
            $orderId = intval($_GET['id']);
            $sql = "SELECT id, cart, notes FROM orders WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $orderId);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                $order = $result->fetch_assoc();
                echo json_encode([
                    "success" => true,
                    "order" => $order
                ]);
            } else {
                echo json_encode([
                    "success" => false,
                    "error" => "Order not found"
                ]);
            }
            $stmt->close();
            $conn->close();
            exit;
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

        // Check if a 'limit' query parameter exists in the URL
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 0;

        // Build SQL dynamically
        if ($limit > 0) {
            $sql = "SELECT id, cart, notes, created_at FROM orders ORDER BY created_at DESC LIMIT $limit";
        } else {
            $sql = "SELECT id, cart, notes, created_at FROM orders ORDER BY created_at DESC";
        }

        $result = $conn->query($sql);
        $orders = [];

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $cart = json_decode($row['cart'], true);
                $items = [];
                $total = 0;

                foreach ($cart as $item) {
                    $menuId = $item['menuDataId'];
                    $quantity = $item['quantity'];

                    if (isset($prices[$menuId])) {
                        $price = $prices[$menuId];
                    } else {
                        $price = 0;
                    }

                    $name = ucfirst(str_replace(['_', '-'], ' ', $menuId));
                    $items[] = $quantity . "x " . $name;
                    $total = $total + ($price * $quantity);
                }

                $statuses = ['pending', 'preparing', 'completed'];
                $randomIndex = array_rand($statuses);
                $status = $statuses[$randomIndex];

                $time = date('g:i A', strtotime($row['created_at']));

                $orders[] = [
                    "id" => $row['id'],
                    "items" => implode(', ', $items),
                    "notes" => $row['notes'] ? $row['notes'] : "",
                    "total" => $total,
                    "status" => $status,
                    "time" => $time
                ];
            }
        }

        echo json_encode([
            "success" => true,
            "orders" => $orders
        ]);
    }

} catch (Exception $error) {
    echo json_encode([
        "success" => false,
        "error" => $error->getMessage(),
        "orders" => []
    ]);
}

$conn->close();
?>
