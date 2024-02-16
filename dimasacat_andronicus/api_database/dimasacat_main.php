<?php

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "dimasacat_database";

	function createCharacter() {
	  global $servername, $username, $password, $dbname;
	  $conn = new mysqli($servername, $username, $password, $dbname); 
	  if ($conn->connect_error) {
	      return "Connection failed: " . $conn->connect_error;
	  }

		$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
		$weapon = filter_input(INPUT_POST, 'weapon', FILTER_SANITIZE_STRING);
		$vision = filter_input(INPUT_POST, 'vision', FILTER_SANITIZE_STRING);
		$gender = filter_input(INPUT_POST, 'gender', FILTER_SANITIZE_STRING);
		$region = filter_input(INPUT_POST, 'region', FILTER_SANITIZE_STRING);
		if (empty($name) || empty($weapon) || empty($vision) || 
		    empty($gender) || empty($region)) {
		    return "Please fill in all fields.";
		}

	  $sql = "INSERT INTO genshin_list
	              (character_name, weapon, vision, gender, region) 
	          VALUES (?, ?, ?, ?, ?)";
	  $stmt = $conn->prepare($sql);
	  if ($stmt) {
	      $stmt->bind_param("sssss", $name, $weapon, $vision, $gender, $region);
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
		global $servername, $username, $password, $dbname;
		$conn = new mysqli($servername, $username, $password, $dbname);
		if ($conn->connect_error) {
				return "Connection failed: " . $conn->connect_error;
		}

		$sql = "SELECT * FROM genshin_list";
	 	$result = $conn->query($sql);
	 	if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				echo "<tr>
								<td>".$row["character_name"]."</td>
								<td>".$row["weapon"]."</td>
								<td>".$row["vision"]."</td>
								<td>".$row["gender"]."</td>
								<td>".$row["region"]."</td>
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

	function getCharacterById($id) {
		global $servername, $username, $password, $dbname;
		$conn = new mysqli($servername, $username, $password, $dbname);
		if ($conn->connect_error) {
			return "Connection failed: " . $conn->connect_error;
		}
	
		$sql = "SELECT * FROM genshin_list WHERE id = ?";
		$stmt = $conn->prepare($sql);
	
		if ($stmt) {
			$stmt->bind_param("i", $id);
			$stmt->execute();
			$result = $stmt->get_result();
			$character = $result->fetch_assoc();
			$stmt->close();
			$conn->close();
			return $character;
		} else {
			$conn->close();
			return "Error preparing statement: " . $conn->error;
		}
	}

	function updateCharacter() {
		global $servername, $username, $password, $dbname;
		$conn = new mysqli($servername, $username, $password, $dbname);
		if ($conn->connect_error) {
			return "Connection failed: " . $conn->connect_error;
		}
	
		$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
		$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
		$weapon = filter_input(INPUT_POST, 'weapon', FILTER_SANITIZE_STRING);
		$vision = filter_input(INPUT_POST, 'vision', FILTER_SANITIZE_STRING);
		$gender = filter_input(INPUT_POST, 'gender', FILTER_SANITIZE_STRING);
		$region = filter_input(INPUT_POST, 'region', FILTER_SANITIZE_STRING);
	
		if (empty($id) || $id === false || empty($name) || empty($weapon) || empty($vision) || empty($gender) || empty($region)) {
			$conn->close();
			return "Invalid data for updating character.";
		}
	
		$sql = "UPDATE genshin_list SET character_name=?, weapon=?, vision=?, gender=?, region=? WHERE id=?";
		$stmt = $conn->prepare($sql);
	
		if ($stmt) {
			$stmt->bind_param("sssssi", $name, $weapon, $vision, $gender, $region, $id);
			if ($stmt->execute()) {
				echo "Character updated successfully";
			} else {
				echo "Error updating character: " . $stmt->error;
			}
			$stmt->close();
		} else {
			echo "Error preparing statement: " . $conn->error;
		}
	
		$conn->close();
	}

	function deleteCharacter() {
		global $servername, $username, $password, $dbname;
		$conn = new mysqli($servername, $username, $password, $dbname);
		if ($conn->connect_error) {
				return "Connection failed: " . $conn->connect_error;
		}

		$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
		if (empty($id) || $id === false) {
				$conn->close();
				return "Invalid character ID";
		}

		$sql = "DELETE FROM genshin_list WHERE id = ?";
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
		case 'GET_ONE':
			$id = $_REQUEST['id'] ?? 0;
			echo json_encode(getCharacterById($id));
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