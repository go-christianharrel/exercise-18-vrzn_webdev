<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Method:*");
header("Access-Control-Allow-Headers:*");

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

switch ($method) {
    case 'POST':
        $action = isset($_POST['action']) ? $_POST['action'] : '';

        switch ($action) {
            case 'POST':
                $albumName = sanitizeInput($conn, $_POST['albumName']);
                $mainArtist = sanitizeInput($conn, $_POST['mainArtist']);
                $language = sanitizeInput($conn, $_POST['language']);
                $numTracks = sanitizeInput($conn, $_POST['numTracks']);
                $genre = sanitizeInput($conn, $_POST['genre']);

                $sql = "INSERT INTO albums 
                        (albumName, mainArtist, language, numTracks, genre) 
                        VALUES 
                        ('$albumName', '$mainArtist', '$language', 
                        '$numTracks', '$genre')";
                $conn->query($sql);

                echo 
                json_encode(array("message" => "Album created successfully"));
                break;

            case 'PATCH':
                $albumId = sanitizeInput($conn, $_POST['albumId']);
                $albumName = sanitizeInput($conn, $_POST['albumName']);
                $mainArtist = sanitizeInput($conn, $_POST['mainArtist']);
                $language = sanitizeInput($conn, $_POST['language']);
                $numTracks = sanitizeInput($conn, $_POST['numTracks']);
                $genre = sanitizeInput($conn, $_POST['genre']);

                $sql = "UPDATE albums 
                        SET albumName='$albumName', 
                            mainArtist='$mainArtist', 
                            language='$language', 
                            numTracks='$numTracks', 
                            genre='$genre'
                        WHERE id='$albumId'";
                $conn->query($sql);

                echo 
                json_encode(array("message" => "Album updated"));
                break;

            case 'DELETE':
                $albumId = sanitizeInput($conn, $_POST['albumId']);

                $sql = "DELETE FROM albums WHERE id='$albumId'";

                if ($conn->query($sql) === TRUE) {
                    echo 
                    json_encode(array("message" => "Album deleted"));
                } else {
                    http_response_code(500); 
                    echo 
                    json_encode(array("message" => "Error" . $conn->error));
                }
                break;

            default:
                http_response_code(400);
                echo 
                json_encode(array("message" => "Invalid action parameter"));
                break;
        }
        break;

    case 'GET':
        $result = $conn->query("SELECT * FROM albums");
        $albums = array();
        while ($row = $result->fetch_assoc()) {
            $albums[] = $row;
        }
        echo json_encode($albums);
        break;

    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method Not Allowed"));
        break;
}

$conn->close();
?>
