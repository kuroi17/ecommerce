<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);

    // If fields are empty → go back to form
    if (empty($username) || empty($password)) {
        header("Location: ../FRONTEND/htmlFolder/form.html");
        exit();
    }

    // If not empty → go to frontend page
    header("Location: ../FRONTEND/htmlFolder/AdminPanel.html");
    exit();
}

// If someone tries to open directly → show error
http_response_code(405);
echo "Method Not Allowed";
