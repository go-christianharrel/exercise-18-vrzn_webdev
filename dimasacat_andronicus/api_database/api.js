const url = "https://genshin-list-52110-default-rtdb.asia-southeast1.firebasedatabase.app/genshin_list";

function clearForm() {
  document.querySelector("#character_name").value = "";
  document.querySelector("#weapon").value = "";
  document.querySelector("#vision").value = "";
  document.querySelector("#gender").value = "";
  document.querySelector("#region").value = "";
}

function resetForm() {
  const submitButton = document.querySelector("#add_form button");
  submitButton.innerText = "Submit";
  submitButton.onclick = addCharacter;
  clearForm();
}


function retrieveCharacter() {
  fetch(`${url}.json`)
  .then((response) => response.json())
  .then((data) => {
    const body = document.querySelector("#character_list");
    body.innerHTML = "";   
    for(const character in data){
      displayCharacters(character, data[character]);
    }
  })
  .catch((error) => console.error("Error:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  retrieveCharacter();
});

function addCharacter() {
  const nameInput = document.querySelector("#character_name");
  const weaponInput = document.querySelector("#weapon");
  const selectedWeapon = weaponInput.options[weaponInput.selectedIndex];
  const visionInput = document.querySelector("#vision");
  const selectedVision = visionInput.options[visionInput.selectedIndex];
  const genderInput = document.querySelector("#gender");
  const selectedGender = genderInput.options[genderInput.selectedIndex];
  const regionInput = document.querySelector("#region");
  const selectedRegion = regionInput.options[regionInput.selectedIndex];

  if (!nameInput.value.trim() || !weaponInput.value || !visionInput.value 
  || !genderInput.value || !regionInput.value) {
    return alert("Please fill in all the Fields.");
  }

  const characterData = {
    name: nameInput.value,
    weapon: selectedWeapon.value,
    vision: selectedVision.value,
    gender: selectedGender.value,
    region: selectedRegion.value,
  };

  fetch(`${url}.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterData),
  })
    .then(() => retrieveCharacter())
    .then(() => alert("Character Added Successfully!"))
    .catch((error) => console.error("Error:", error));
  
  clearForm();
}

function displayCharacters(characterid, character) {
  const mainTable = document.querySelector("#character_list");
  const rowTable = document.createElement("tr");
  const updateButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const cellModify = document.createElement("td");
  const cellDelete = document.createElement("td");
  const rowContent = ["name", "weapon", "vision", "gender", "region"];

  updateButton.textContent = "Update";
  deleteButton.textContent = "Delete";
  updateButton.className = "update-button";
  deleteButton.className = "delete-button";

  updateButton.onclick = () => {
    updateForm(characterid);
  };

  deleteButton.onclick = () => {
    removeCharacter(characterid);
  }

  function addData(data) {
    const cell = document.createElement("td");
    cell.textContent = data;
    return cell;
  }

  rowContent.forEach((data) => {
    rowTable.appendChild(addData(character[data]));
  });

  cellModify.appendChild(updateButton);
  cellDelete.appendChild(deleteButton);
  rowTable.appendChild(cellModify);
  rowTable.appendChild(cellDelete);
  mainTable.appendChild(rowTable);
}

function removeCharacter(characterId) {
  fetch(`${url}/${characterId}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if(!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then(() => retrieveCharacter())
    .then(() => alert("Character Deleted Succefully!"))
    .catch((error) => console.error("Delete Error:", error));
}

function updateForm(characterId) {
  fetch(`${url}/${characterId}.json`)
    .then((response) => response.json())
    .then((character) => {
      document.querySelector("#character_name").value = 
        character.name;
      document.querySelector("#weapon").value = character.weapon;
      document.querySelector("#vision").value = character.vision;
      document.querySelector("#gender").value = character.gender;
      document.querySelector("#region").value = character.region;

      const submitButton = document.querySelector("#add_form button");
      submitButton.innerText = "Update";
      submitButton.onclick = function () {
        updateCharacter(characterId);
        resetForm();
      };
    })
    .catch((error) => console.error("Error:", error));
}

function updateCharacter(characterId) {
  const nameInput = document.querySelector("#character_name");
  const weaponInput = document.querySelector("#weapon");
  const selectedWeapon = weaponInput.options[weaponInput.selectedIndex];
  const visionInput = document.querySelector("#vision");
  const selectedVision = visionInput.options[visionInput.selectedIndex];
  const genderInput = document.querySelector("#gender");
  const selectedGender = genderInput.options[genderInput.selectedIndex];
  const regionInput = document.querySelector("#region");
  const selectedRegion = regionInput.options[regionInput.selectedIndex];

  if (!nameInput.value.trim() || !weaponInput.value || !visionInput.value 
  || !genderInput.value || !regionInput.value) {
    return alert("Please fill in all the Fields.");
  }

  const characterData = {
    name: nameInput.value,
    weapon: selectedWeapon.value,
    vision: selectedVision.value,
    gender: selectedGender.value,
    region: selectedRegion.value,
  };

  fetch(`${url}/${characterId}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterData),
  })
    .then(() => retrieveCharacter())
    .then(() => alert("Character Updated Successfully!"))
    .catch((error) => console.error("Error:", error));
}