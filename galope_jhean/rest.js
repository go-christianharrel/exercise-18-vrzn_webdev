const addBtn = document.querySelector(".add-group");
const form = document.querySelector("#form");
const update = document.querySelector(".update-button");
const save = document.querySelector(".save-btn");
const submit = document.querySelector(".submit-btn");
const api = "https://jhean-kpop-default-rtdb.asia-southeast1.firebasedatabase.app/kpop-list";
let groupToUpdate = 0;

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
    };

    fetch(`${api}.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(groupData),
    })
        .then(() => getGroups())
        .catch((error) => {
            console.error("Error creating album:", error.message);
        });
        
    form.reset();
    addBtn.click();
}

function getGroups() {
  fetch(`${api}.json`)
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#group_tbl");
      tableBody.innerHTML = "";

      for(const group in data){
        displayGroup(data[group], group);
      }

    })
    .catch((error) => console.error("Error:", error));
}

function displayGroup(group, groupid) {
  const tableBody = document.querySelector("#group_tbl");

  function createCell(content) {
    const cell = document.createElement("td");
    cell.textContent = content;
    return cell;
  }

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
    handleUpdate(groupid);
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-button";
  deleteBtn.onclick = () => {
      deleteGroup(groupid);
      return;
  }

  actionsCell.appendChild(updateBtn);
  actionsCell.appendChild(deleteBtn);

  row.appendChild(actionsCell);

  tableBody.appendChild(row);
}

const handleUpdate = id => {
    fetch(`${api}/${id}.json`) 
        .then((response) => response.json())
        .then((data) => {
            addBtn.click();
            document.querySelector("#name").value = data.name;
            document.querySelector("#members").value = data.members;
            document.querySelector("#agency").value = data.agency;
            document.querySelector("#debut_date").value = data.debut_date;
            document.querySelector("#fandom").value = data.fandom;
            save.style.display = "block";
            submit.style.display = "none";
            groupToUpdate = id;
        })
        .catch((error) => console.error("Error:", error));
}

const handleSave = () => {
    let groupData = {
        name: document.querySelector("#name").value,
        members: document.querySelector("#members").value,
        agency: document.querySelector("#agency").value,
        debut_date: document.querySelector("#debut_date").value,
        fandom: document.querySelector("#fandom").value,
    };

    fetch(`${api}/${groupToUpdate}.json`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(groupData),
    })
        .then(() => getGroups())
        .catch((error) => {
            console.error("Error creating album:", error.message);
        });

    form.reset();
    submit.style.display = "block";
    save.style.display = "none";
    addBtn.click();
    groupToUpdate = 0;
}

function deleteGroup(id) {
  fetch(`${api}/${id}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => getGroups())
    .catch((error) => {
      console.error("Error deleting group:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  getGroups();
});
