const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");

    let taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = inputBox.value;
    li.appendChild(taskText);

    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.classList.add("edit-btn");
    li.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("delete-btn");
    li.appendChild(deleteButton);

    document.getElementById("pending-list").appendChild(li); // Add to pending tasks list
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-btn")) {
    let li = e.target.parentElement;
    let span = li.querySelector("span.task-text");
    let input = document.createElement("input");
    input.value = span.textContent;
    input.classList.add("edit-input");
    li.insertBefore(input, span);
    li.removeChild(span);
    e.target.innerHTML = "Save";
    e.target.classList.remove("edit-btn");
    e.target.classList.add("save-btn");
  } else if (e.target.classList.contains("save-btn")) {
    let li = e.target.parentElement;
    let input = li.querySelector("input.edit-input");
    let span = document.createElement("span");
    span.textContent = input.value;
    span.classList.add("task-text");
    li.insertBefore(span, input);
    li.removeChild(input);
    e.target.innerHTML = "Edit";
    e.target.classList.remove("save-btn");
    e.target.classList.add("edit-btn");
    saveData();
  } else if (e.target.classList.contains("delete-btn")) {
    let li = e.target.parentElement;
    let parentList = li.parentNode;
    parentList.removeChild(li);
    saveData();
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    let parentList = e.target.parentNode;
    if (parentList.id === "pending-list" && e.target.classList.contains("checked")) {
      document.getElementById("completed-list").appendChild(e.target);
      let editButton = e.target.querySelector(".edit-btn");
      if (editButton) {
        editButton.remove(); // Remove the Edit button in completed tasks
      }
    } else if (parentList.id === "completed-list" && !e.target.classList.contains("checked")) {
      document.getElementById("pending-list").appendChild(e.target);
      let editButton = e.target.querySelector(".edit-btn");
      if (!editButton) {
        let newEditButton = document.createElement("button");
        newEditButton.innerHTML = "Edit";
        newEditButton.classList.add("edit-btn");
        e.target.appendChild(newEditButton);
      }
    }
    saveData();
  }
}, false);

function saveData() {
  localStorage.setItem("pendingTasks", document.getElementById("pending-list").innerHTML);
  localStorage.setItem("completedTasks", document.getElementById("completed-list").innerHTML);
}

function showTasks() {
  document.getElementById("pending-list").innerHTML = localStorage.getItem("pendingTasks");
  document.getElementById("completed-list").innerHTML = localStorage.getItem("completedTasks");
}
showTasks();
