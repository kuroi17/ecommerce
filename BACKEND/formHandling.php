<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    exit(0);
}


// checks if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Read JSON input  
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

// Get form data
$form_username = trim($data["username"] ?? "");
$form_email    = trim($data["email"] ?? "");
$form_password = trim($data["password"] ?? "");

// Validate input
if (empty($form_username) || empty($form_email) || empty($form_password)) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit();
}

// HASH PASSWORD (SECURE)
$hashed_password = password_hash($form_password, PASSWORD_DEFAULT);

// Database credentials
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "ecommerce_db";
    try {
        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }

        // prepare stament to prevent SQL injection
        $sql = "INSERT INTO formhandling(username, passwordd, email) VALUES
        ( ?, ?, ? );"; // unnamed parameter

         $statement = $conn -> prepare($sql); // prepare the sql statement

         if (!$statement){
            throw new Exception("Prepare failed: " . $conn -> error);
         }

         $statement -> bind_param("sss", $form_username, $hashed_password, $form_email);
        
        $success =  $statement -> execute(); // execute the sql statement
         

        if ($success){
            $statement -> close();
            $conn -> close();
            header("Location: ../FRONTEND/htmlFolder/AdminPanel.html");
            exit(); 
        }
        else{
                throw new Exception("Execute failed: " . $statement -> error);
            }
    } catch (Exception $error) {
        echo json_encode([
            "success" => false,
            "error" => $error->getMessage()
        ]);
    }

}

// If someone tries to open directly → show error
http_response_code(405);
echo "Method Not Allowed";
