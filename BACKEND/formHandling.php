<?php
// ✅ Add CORS headers
header("Access-Control-Allow-Origin: *"); // or specify "http://127.0.0.1:5508"
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
    
// Handle preflight OPTIONS request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $form_username = trim($_POST["username"] ?? "");
    $form_password = trim($_POST["password"] ?? "");
    $form_email    = trim($_POST["email"] ?? "");

    if (empty($form_username) || empty($form_password) || empty($form_email)) {
        echo json_encode([
            "success" => false,
            "error" => "All fields are required."
        ]);
        exit;
    }

    $servername = "localhost";
    $username   = "root";
    $password   = "";
    $dbname     = "ecommerce_db";

    try {
        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            throw new Exception("Connection failed");
        }

        $hashed_password = password_hash($form_password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO formhandling (username, passwordd, email)
                VALUES (?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $form_username, $hashed_password, $form_email);

        $stmt->execute();

        echo json_encode([
            "success" => true,
            "message" => "Registration successful"
        ]);

    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "error" => $e->getMessage()
        ]);
    }

    exit;
}

// ❗ ONLY runs if NOT POST
http_response_code(405);
echo json_encode([
    "success" => false,
    "error" => "Method Not Allowed"
]);
exit;
