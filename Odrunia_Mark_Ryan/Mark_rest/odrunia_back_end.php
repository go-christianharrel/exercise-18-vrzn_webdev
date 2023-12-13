<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Method: *");
header("Access-Control-Allow-Headers: *");

$method = $_SERVER['REQUEST_METHOD'];

$servername = "127.0.0.1:3306";
$username = "u583832022_api_vrzn";
$password = "=OCqbuo~x3M";
$dbname = "u583832022_db_vrzn";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function sanitizeInput($conn, $input) {
    return $conn->real_escape_string($input);
}

if ($method === 'POST') {
    $action = isset($_POST['action']) ? $_POST['action'] : '';

    if ($action === 'create') {
        $brand = sanitizeInput($conn, $_POST['brand']);
        $model = sanitizeInput($conn, $_POST['model']);
        $yearMade = sanitizeInput($conn, $_POST['year']);
        $transmission = sanitizeInput($conn, $_POST['transmission']);
        $fuelType = sanitizeInput($conn, $_POST['fuel']);

        $sql = "INSERT INTO car 
        (brand, model, year_made, transmission_type, fuel_type) 
        VALUES 
        ('$brand', '$model', '$yearMade', '$transmission', '$fuelType')";
        $conn->query($sql);

        echo json_encode(array("message" => "Car created successfully"));
    } elseif ($action === 'update') {
        $carId = sanitizeInput($conn, $_POST['carId']);
        $brand = sanitizeInput($conn, $_POST['brand']);
        $model = sanitizeInput($conn, $_POST['model']);
        $yearMade = sanitizeInput($conn, $_POST['year']);
        $transmission = sanitizeInput($conn, $_POST['transmission']);
        $fuelType = sanitizeInput($conn, $_POST['fuel']);

        $sql = "UPDATE car 
        SET brand='$brand', model='$model', year_made='$yearMade', 
        transmission_type='$transmission', fuel_type='$fuelType' 
        WHERE ID='$carId'";
        $conn->query($sql);

        echo json_encode(array("message" => "Car updated successfully"));
    } elseif ($action === 'delete') {
        $carId = sanitizeInput($conn, $_POST['carId']);

        $sql = "DELETE FROM Car WHERE ID='$carId'";
        $result = $conn->query($sql);

        if ($result === TRUE) {
            echo json_encode(array("message" => "Car deleted successfully"));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Error: " . $conn->error));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Invalid action parameter"));
    }
} elseif ($method === 'GET') {
    $result = $conn->query("SELECT * FROM Car");
    $cars = array();
    while ($row = $result->fetch_assoc()) {
        $cars[] = $row;
    }
    echo json_encode($cars);
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method Not Allowed"));
}

$conn->close();
?>
