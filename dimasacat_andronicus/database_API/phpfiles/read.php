<?php
    function readCharacters() {
        $servername = "localhost";
        $username = "root";
        $password = "";
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
?>