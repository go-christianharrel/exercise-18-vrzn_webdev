const addBtn = document.querySelector(".add-group");
const form = document.querySelector("#form");
const update = document.querySelector(".update-button");
const save = document.querySelector(".save-btn");
const submit = document.querySelector(".submit-btn");
let updateId = 0;

const api = "https://projectvrzn.online/api/kpop.php";

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(form.style.display == "none" || form.style.display == ""){
        form.style.display = "block";
        addBtn.textContent = "-";
    } else {
        form.style.display = "none";
        addBtn.textContent = "+";
    }
})

function insertGroup() {
    let groupData = {
        name: document.querySelector("#name").value,
        members: document.querySelector("#members").value,
        agency: document.querySelector("#agency").value,
        debut_date: document.querySelector("#debut_date").value,
        fandom: document.querySelector("#fandom").value,
        action: "POST",
    };

    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(groupData).toString(),
    })
        .then(() => getGroups())
        .catch((error) => {
            console.error("Error creating album:", error.message);
        });
        
    form.reset();
    addBtn.click();
}

function getGroups() {
  fetch(api)
    .then((response) => response.json())
    .then((data) => displayGroup(data))
    .catch((error) => console.error("Error:", error));
}

function displayGroup(groups) {
  const tableBody = document.querySelector("#group_tbl");
  tableBody.innerHTML = "";

  function createCell(content) {
    const cell = document.createElement("td");
    cell.textContent = content;
    return cell;
  }

  groups.forEach((group) => {
    const row = document.createElement("tr");

    const fields = ["name", "members", "agency", "debut_date", "fandom"];

    fields.forEach((field) => {
      row.appendChild(createCell(group[field]));
    });

    const actionsCell = document.createElement("td");
    actionsCell.className = "action-button";

    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.className = "update-button";
    updateBtn.onclick = () => {
      updateId = group.id;
      handleUpdate(updateId);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-button";
    deleteBtn.onclick = () => {
        deleteGroup(group.id);
    }

    actionsCell.appendChild(updateBtn);
    actionsCell.appendChild(deleteBtn);

    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });
}

const handleUpdate = id => {
    fetch(`${api}?id=${id}`) 
        .then((response) => response.json())
        .then((data) => {
            const filteredData = data.filter(group => group.id == id);
            const group = filteredData[0];
            addBtn.click();
            document.querySelector("#name").value = group.name;
            document.querySelector("#members").value = group.members;
            document.querySelector("#agency").value = group.agency;
            document.querySelector("#debut_date").value = group.debut_date;
            document.querySelector("#fandom").value = group.fandom;
            save.style.display = "block";
            submit.style.display = "none";
        })
        .catch((error) => console.error("Error:", error));
}

const handleSave = () => {
    let groupData = {
        id: updateId,
        name: document.querySelector("#name").value,
        members: document.querySelector("#members").value,
        agency: document.querySelector("#agency").value,
        debut_date: document.querySelector("#debut_date").value,
        fandom: document.querySelector("#fandom").value,
        action: "PATCH"
    };

    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(groupData).toString(),
    })
        .then(() => getGroups())
        .catch((error) => {
            console.error("Error creating album:", error.message);
        });

    form.reset();
    submit.style.display = "block";
    save.style.display = "none";
    addBtn.click();
}

function deleteGroup(id) {
  let groupData = {
      id: id,
      action: "DELETE",
  };

  fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(groupData).toString(),
  })
    .then(() => getGroups())
    .catch((error) => {
      console.error("Error parsing JSON:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  getGroups();
});
