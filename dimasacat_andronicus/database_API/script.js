const address = "https://projectvrzn.online/api/dimasacat_main.php";

function addCharacter() {
  const nameInput = document.querySelector("#name");
  const genderInput = document.querySelector("#gender");
  const selectedGender = genderInput.options[genderInput.selectedIndex];
  const skillInput = document.querySelector("#skill");
  const gameInput = document.querySelector("#game");
  const genreInput = document.querySelector("#genre");

  if (!nameInput.value.trim() || !genderInput.value || 
    !skillInput.value.trim() || !gameInput.value.trim() || 
    !genreInput.value.trim()) {
    return alert("Please fill in all fields");
  }

  const characterData = {
    action: "POST",
    name: nameInput.value,
    gender: selectedGender.value,
    skill: skillInput.value,
    game: gameInput.value,
    genre: genreInput.value,
  };

  const urlEncodedData = Object.keys(characterData)
    .map((key) => encodeURIComponent(key) + "=" + 
      encodeURIComponent(characterData[key]))
    .join("&");

  fetch(address, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlEncodedData,
  })
    .then((response) => response.text())
    .then((responseText) => {
      displayCharacters();
      alert(responseText);
      nameInput.value = "";
      genderInput.value = "";
      skillInput.value = "";
      gameInput.value = "";
      genreInput.value = "";
    })
    .catch((error) => console.error("Error:", error));
}

async function displayCharacters() {
  try {
    const characterData = {
      action: "GET",
    };

    const urlEncodedData = Object.keys(characterData)
      .map((key) => encodeURIComponent(key) + "=" + 
        encodeURIComponent(characterData[key]))
      .join("&");

    const response = await fetch(address, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedData,
    });

    const responseText = await response.text();
    document.querySelector("#character_list").innerHTML =
      "<tr><th>ID</th><th>Name</th><th>Gender</th><th>Skill</th>" +
      "<th>Game</th><th>Genre</th><th>Modify</th>" +
      "<th>Remove</th></tr>" + responseText;
  } catch (error) {
    console.error("Error:", error);
  }
}

displayCharacters();

let updateId = null;

function showUpdateForm(characterId) {
  updateId = characterId;
  document.querySelector("#character_form")
    .style.display = "none";
  document.querySelector("#update_character_form")
    .style.display = "block";
}

function closeUpdateForm() {
  document.querySelector("#character_form")
    .style.display = "block";
  document.querySelector("#update_character_form")
    .style.display = "none";
}

function modifyCharacter() {
  const updateNameInput = document.querySelector("#update_name");
  const updateGenderInput = document.querySelector("#update_gender");
  const selectedUpdateGender = updateGenderInput
    .options[updateGenderInput.selectedIndex];
  const updateSkillInput = document.querySelector("#update_skill");
  const updateGameInput = document.querySelector("#update_game");
  const updateGenreInput = document.querySelector("#update_genre");

  if (!updateNameInput.value.trim() || !updateGenderInput.value.trim() ||
    !updateSkillInput.value.trim() || !updateGameInput.value.trim() ||
    !updateGenreInput.value.trim()) {
    return alert("Please fill in all fields");
  }

  const retrieveId = updateId;
  const characterData = {
    action: "PATCH",
    id: retrieveId,
    name: updateNameInput.value,
    gender: selectedUpdateGender.value,
    skill: updateSkillInput.value,
    game: updateGameInput.value,
    genre: updateGenreInput.value,
  };

  const urlEncodedData = Object.keys(characterData)
    .map((key) => encodeURIComponent(key) + "=" +
      encodeURIComponent(characterData[key]))
    .join("&");

  fetch(address, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlEncodedData,
  })
    .then((response) => response.text())
    .then((responseText) => {
      console.log(responseText);
      displayCharacters();
      closeUpdateForm();
      alert(responseText);
      updateNameInput.value = "";
      updateGenderInput.value = "";
      updateSkillInput.value = "";
      updateGameInput.value = "";
      updateGenreInput.value = "";
    })
    .catch((error) => console.error("Error:", error));
}

function removeCharacter(characterId) {
  if (confirm("Are you sure you want to delete this character?")) {
    const deleteData = {
      action: "DELETE",
      id: characterId,
    };

    const urlEncodedData = Object.keys(deleteData)
      .map((key) => encodeURIComponent(key) + "=" 
        + encodeURIComponent(deleteData[key]))
      .join("&");

    fetch(address, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedData,
    })
      .then((response) => response.text())
      .then((responseText) => {
        displayCharacters();
        alert(responseText);
      })
      .catch((error) => console.error("Error:", error));
  }
}