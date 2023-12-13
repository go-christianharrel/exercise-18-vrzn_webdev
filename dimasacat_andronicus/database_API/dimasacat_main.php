<?php
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Method:*");
    header("Access-Control-Allow-Headers:*");

    function createCharacter() {
        $servername = "127.0.0.1:3306";
        $username = "u583832022_api_vrzn";
        $password = "=OCqbuo~x3M";
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

    function readCharacters() {
        $servername = "127.0.0.1:3306";
        $username = "u583832022_api_vrzn";
        $password = "=OCqbuo~x3M";
        $dbname = "u583832022_db_vrzn";
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            return "Connection failed: " . $conn->connect_error;
        }

       $sql = "SELECT * FROM game_character";
       $result = $conn->query($sql);
       if ($result->num_rows > 0) {
           while($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td>".$row["id"]."</td>
                    <td>".$row["name"]."</td>
                    <td>".$row["gender"]."</td>
                    <td>".$row["skill"]."</td>
                    <td>".$row["game"]."</td>
                    <td>".$row["genre"]."</td>
                    <td><button id='update_button' 
                            onclick='showUpdateForm(".$row["id"].")'>
                            Update</button></td>
                    <td><button id='delete_button' 
                            onclick='removeCharacter(".$row["id"].")'>
                            Delete</button></td>        
                  </tr>";    
            }
       } else {
           echo "<tr><td colspan='6'>No characters found</td></tr>";
       }     
       $conn->close();
    }

    function updateCharacter() {
        $servername = "127.0.0.1:3306";
        $username = "u583832022_api_vrzn";
        $password = "=OCqbuo~x3M";
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

    function deleteCharacter() {
        $servername = "127.0.0.1:3306";
        $username = "u583832022_api_vrzn";
        $password = "=OCqbuo~x3M";
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
    
    $action = $_REQUEST['action'] ?? '';

    switch ($action) {
        case 'POST':
            echo createCharacter();
            break;
        case 'GET':
            echo readCharacters();
            break; 
        case 'PATCH':
            updateCharacter();
            break;   
        case 'DELETE';
            echo deleteCharacter();   
            break; 
        default:
            echo 'Invalid action';
            break;
    }
?>