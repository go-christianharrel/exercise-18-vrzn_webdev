<?php
    function createCharacter() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "u583832022_db_vrzn";
        $conn = new mysqli($servername, $username, $password, $dbname);
    
        if ($conn->connect_error) {
            return "Connection failed: " . $conn->connect_error;
        }

        $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
        $gender = filter_input(INPUT_POST, 'gender', FILTER_SANITIZE_STRING);
        $skill = filter_input(INPUT_POST, 'skill', FILTER_SANITIZE_STRING);
        $game = filter_input(INPUT_POST, 'game', FILTER_SANITIZE_STRING);
        $genre = filter_input(INPUT_POST, 'genre', FILTER_SANITIZE_STRING);
        if (empty($name) || empty($gender) || empty($skill) || 
            empty($game) || empty($genre)) {
            return "Please fill in all fields.";
        }

        $sql = "INSERT INTO game_character 
                    (name, gender, skill, game, genre) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("sssss", $name, 
                $gender, $skill, $game, $genre);
            if ($stmt->execute()) {
                $stmt->close();
                $conn->close();
                echo "Data inputted successfully";
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