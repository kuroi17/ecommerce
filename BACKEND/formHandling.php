<?php



// checks if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $form_username = trim($_POST["username"]);
    $form_password = trim($_POST["password"]);
    $form_email    = trim($_POST["email"]);

    // If fields are empty → go back to form
    if (empty($form_username) || empty($form_password) || empty($form_email)) {
        header("Location: ../FRONTEND/htmlFolder/form.html");
        exit();
    }
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

         $statement -> bind_param("sss", $form_username, $form_password, $form_email);
        
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
