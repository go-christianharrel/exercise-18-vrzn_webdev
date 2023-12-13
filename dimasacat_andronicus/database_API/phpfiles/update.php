<?php
function updateCharacter() {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "u583832022_db_vrzn";
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        return "Connection failed: " . $conn->connect_error;
    }

    $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $gender = filter_input(INPUT_POST, 'gender', FILTER_SANITIZE_STRING);
    $skill = filter_input(INPUT_POST, 'skill', FILTER_SANITIZE_STRING);
    $game = filter_input(INPUT_POST, 'game', FILTER_SANITIZE_STRING);
    $genre = filter_input(INPUT_POST, 'genre', FILTER_SANITIZE_STRING);
    if (empty($id) || $id === false) {
        return "Invalid character ID";
    }

    $sql = "UPDATE game_character 
            SET name=?, gender=?, skill=?, game=?, genre=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("sssssi", $name, 
            $gender, $skill, $game, $genre, $id);
        if ($stmt->execute()) {
            $stmt->close();
            $conn->close();
            echo "Data updated successfully";
        } else {
            $stmt->close();
            $conn->close();
            echo "Error executing query: " . $stmt->error;
        }
    } else {
        $conn->close();
        echo "Error preparing statement: " . $conn->error;
    }
}
?>
