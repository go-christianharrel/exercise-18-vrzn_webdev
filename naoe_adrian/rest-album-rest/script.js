document.addEventListener("DOMContentLoaded", () => {
  readAlbums();

  let albumForm = document.querySelector("#album_form");

  if (albumForm) {
    albumForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (validateForm()) {
        if (document.querySelector("#album_id").value) {
          performUpdate();
        } else {
          createAlbum();
        }
      } else {
        console.log("Form is not valid. Please fill in all required fields.");
      }
    });

    document
      .querySelector("#album_name")
      .addEventListener("input", validateForm);
    document
      .querySelector("#main_artist")
      .addEventListener("input", validateForm);
    document
      .querySelector("#num_tracks")
      .addEventListener("input", validateForm);
    document
      .querySelector("#language")
      .addEventListener("change", validateForm);
    document.querySelector("#genre").addEventListener("change", validateForm);
  } else {
    console.error("Error: Album form not found.");
  }
});

function validateForm() {
  let albumId = document.querySelector("#album_id").value;
  let albumName = document.querySelector("#album_name").value;
  let mainArtist = document.querySelector("#main_artist").value;
  let numTracks = document.querySelector("#num_tracks").value;
  let language = document.querySelector("#language").value;
  let genre = document.querySelector("#genre").value;
  let submitButton = document.querySelector("#album_form button");

  let isChanged =
    albumId ||
    document.querySelector("#album_name").defaultValue !== albumName ||
    document.querySelector("#main_artist").defaultValue !== mainArtist ||
    document.querySelector("#num_tracks").defaultValue !== numTracks ||
    document.querySelector("#language").defaultValue !== language ||
    document.querySelector("#genre").defaultValue !== genre;

  let isValid =
    albumName.trim() &&
    mainArtist.trim() &&
    numTracks.trim() &&
    language &&
    genre &&
    isChanged;

  submitButton.disabled = !isValid;
  return isValid;
}

function createAlbum() {
  let albumData = {
    albumName: document.querySelector("#album_name").value,
    mainArtist: document.querySelector("#main_artist").value,
    language: document.querySelector("#language").value,
    numTracks: document.querySelector("#num_tracks").value,
    genre: document.querySelector("#genre").value,
    action: "POST",
  };

  let formData = Object.keys(albumData)
    .map((key) => `${key}=${albumData[key]}`)
    .join("&");

  fetch("https://exercise.projectvrzn.online/naoe_adrian/naoe_back_end.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let outputElement = document.querySelector("#output");
      if (outputElement) {
        outputElement.innerHTML = data.message;
      }

      readAlbums();
      resetForm();
    })
    .catch((error) => {
      console.error("Error creating album:", error.message);

      let outputElement = document.querySelector("#output");
      if (outputElement) {
        outputElement.innerHTML = "Error creating album. Please try again.";
      }
    });
}

function performUpdate() {
  let albumData = {
    albumId: document.querySelector("#album_id").value,
    albumName: document.querySelector("#album_name").value,
    mainArtist: document.querySelector("#main_artist").value,
    language: document.querySelector("#language").value,
    numTracks: document.querySelector("#num_tracks").value,
    genre: document.querySelector("#genre").value,
    action: "PATCH",
  };

  let formData = Object.keys(albumData)
    .map((key) => `${key}=${albumData[key]}`)
    .join("&");

  fetch("https://exercise.projectvrzn.online/naoe_adrian/naoe_back_end.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let outputElement = document.querySelector("#output");
      if (outputElement) {
        outputElement.innerHTML = data.message;
      }
      resetForm();
      readAlbums();
    })
    .catch((error) => {
      console.error("Error updating album:", error.message);
    });
}

function deleteAlbum(albumId) {
  let albumData = {
    albumId: albumId,
    action: "DELETE",
  };

  let formData = Object.keys(albumData)
    .map((key) => `${key}=${albumData[key]}`)
    .join("&");

  fetch("https://exercise.projectvrzn.online/naoe_adrian/naoe_back_end.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let outputElement = document.querySelector("#output");
      if (outputElement) {
        outputElement.innerHTML = data.message;
      }
      readAlbums();
    })
    .catch((error) => {
      console.error("Error deleting album:", error.message);
    });
}

function readAlbums() {
  fetch("https://exercise.projectvrzn.online/naoe_adrian/naoe_back_end.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let tableBody = document.querySelector("#album_table_body");
      if (tableBody) {
        tableBody.innerHTML = "";

        data.forEach((album) => {
          let row = tableBody.insertRow();
          let cell0 = row.insertCell(0);
          let cell1 = row.insertCell(1);
          let cell2 = row.insertCell(2);
          let cell3 = row.insertCell(3);
          let cell4 = row.insertCell(4);
          let cell5 = row.insertCell(5);
          let cell6 = row.insertCell(6);

          cell0.innerHTML = album.id;
          cell1.innerHTML = album.albumName.toUpperCase();
          cell2.innerHTML = album.mainArtist.toUpperCase();
          cell3.innerHTML = album.language;
          cell4.innerHTML = album.numTracks;
          cell5.innerHTML = album.genre;

          let updateButton = document.createElement("button");
          updateButton.textContent = "Update";
          updateButton.onclick = function () {
            updateAlbum(album);
          };

          let deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = function () {
            deleteAlbum(album.id);
          };

          cell6.appendChild(updateButton);
          cell6.appendChild(deleteButton);
        });
      }

      let outputElement = document.querySelector("#output");
      if (outputElement) {
        outputElement.innerHTML = "";
      }
    })
    .catch((error) => {
      console.error("Error reading albums:", error.message);
    });
}

function updateAlbum(album) {
  document
    .querySelector("#language")
    .removeEventListener("change", validateForm);
  document.querySelector("#genre")
    .removeEventListener("change", validateForm);

  document.querySelector("#album_id").value = album.id;
  document.querySelector("#album_name").value = album.albumName;
  document.querySelector("#main_artist").value = album.mainArtist;
  document.querySelector("#language").value = album.language;
  document.querySelector("#num_tracks").value = album.numTracks;
  document.querySelector("#genre").value = album.genre;

  let createButton = document.querySelector("#album_form button");
  createButton.textContent = "PATCH";
  createButton.onclick = function () {
    performUpdate();
  };

  document.querySelector("#language")
    .addEventListener("change", validateForm);
  document.querySelector("#genre")
    .addEventListener("change", validateForm);
}

function resetForm() {
  let albumForm = document.querySelector("#album_form");
  if (albumForm) {
    albumForm.reset();
    let createButton = document.querySelector("#album_form button");
    if (createButton) {
      createButton.textContent = "Create";
      createButton.onclick = function () {
        createAlbum();
      };
    }
  } else {
    console.error("Error resetting form: Album form not found.");
  }
}
