<?php
    function deleteCharacter() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "u583832022_db_vrzn";
        $conn = new mysqli($servername, $username, $password, $dbname);
    
        if ($conn->connect_error) {
            return "Connection failed: " . $conn->connect_error;
        }
    
        $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
        if (empty($id) || $id === false) {
            $conn->close();
            return "Invalid character ID";
        }
    
        $sql = "DELETE FROM game_character WHERE id = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("i", $id);
    
            if ($stmt->execute()) {
                $result = "Character deleted successfully";
            } else {
                $result = "Error deleting character: " . $stmt->error;
            }
    
            $stmt->close();
        } else {
            $result = "Error preparing statement: " . $conn->error;
        }
        $conn->close();
        return $result;
    }
?>