<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:*");
header("Access-Control-Allow-Headers:*");

$method = $_SERVER['REQUEST_METHOD'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kpop_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function sanitizeInput($conn, $input) {
    return $conn->real_escape_string($input);
}

switch ($method) {
    case 'POST':
        $action = isset($_POST['action']) ? $_POST['action'] : '';

        switch ($action) {
            case 'POST':
                $name = sanitizeInput($conn, $_POST['name']);
                $members = sanitizeInput($conn, $_POST['members']);
                $agency = sanitizeInput($conn, $_POST['agency']);
                $debut_date = sanitizeInput($conn, $_POST['debut_date']);
                $fandom = sanitizeInput($conn, $_POST['fandom']);

                $stmt = $conn->prepare("INSERT INTO kpop_group 
                    (name, members, agency, debut_date, fandom) 
                    VALUES (?, ?, ?, ?, ?)");

                $stmt->bind_param("sssss", $name, $members,
                    $agency, $debut_date, $fandom);

                $stmt->execute();
                $stmt->close();

                echo json_encode(array("message" => "Group has been added!"));
                break;

            case 'PATCH':
                $id = sanitizeInput($conn, $_POST['id']);
                $name = sanitizeInput($conn, $_POST['name']);
                $members = sanitizeInput($conn, $_POST['members']);
                $agency = sanitizeInput($conn, $_POST['agency']);
                $debut_date = sanitizeInput($conn, $_POST['debut_date']);
                $fandom = sanitizeInput($conn, $_POST['fandom']);

                $stmt = $conn->prepare("UPDATE kpop_group 
                    SET name=?, members=?, agency=?, debut_date=?,
                    fandom=? WHERE id=?");

                $stmt->bind_param("sssssi", $name, $members,
                    $agency, $debut_date, $fandom, $id);

                $stmt->execute();
                $stmt->close();

                echo json_encode(array("message" => "Group details updated!"));
                break;

            case 'DELETE':
                $id = sanitizeInput($conn, $_POST['id']);

                $stmt = $conn->prepare("DELETE FROM kpop_group WHERE id=?");
                $stmt->bind_param("i", $id);

                if ($stmt->execute()) {
                    echo json_encode(array("message" => "Group deleted"));
                } else {
                    http_response_code(500);
                    echo json_encode(array("message" => "Error"));
                }

                $stmt->close();
                break;

            default:
                http_response_code(400);
                echo json_encode(array("message" => "An Error Occured"));
                break;
        }

        break;

    case 'GET':
        $result = $conn->query("SELECT * FROM kpop_group");
        $groups = array();
        while ($row = $result->fetch_assoc()) {
            $groups[] = $row;
        }
        echo json_encode($groups);
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method Not Allowed"));
        break;
}

$conn->close();
?>
