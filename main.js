// Model
let tasks;

// retrieve tasks from browser
const retriveTasks = JSON.parse(localStorage.getItem("taskList"));

// if local storage has array, show/render array
// otherwise show default array

if (Array.isArray(retriveTasks)) {
  tasks = retriveTasks;
} else {
  tasks = [{ title: "dummytask", dueDate: "2023-11-11", id: "123" }];
}

renderTasks();

// Create a task
function createTasks(newTask, dueDate) {
  const id = new Date().getTime().toString();
  tasks.push({ title: newTask, dueDate: dueDate, id: id });
  saveTasksInBrowser();
}

// Delete a task
function removeTask(idToBeDeleted) {
  tasks = tasks.filter(function (task) {
    if (task.id === idToBeDeleted) {
      return false;
    } else {
      return true;
    }
  });
  saveTasksInBrowser();
}

function saveTasksInBrowser() {
  localStorage.setItem("taskList", JSON.stringify(tasks));
}

// ------ Model Ends here -------------

// ----Controllers start -----
function addTask() {
  let taskInput = document.querySelector(".task__input");
  let newTask = taskInput.value;
  taskInput.value = "";

  let datePicker = document.querySelector(".date-picker");
  let dueDate = datePicker.value;
  datePicker.value = "";

  createTasks(newTask, dueDate);

  renderTasks();
}

function deleteTask(event) {
  const delteButton = event.target;
  const idToBeDeleted = delteButton.id;

  removeTask(idToBeDeleted);
  renderTasks();
}

// ----Controller ends here-----

// View Start
function renderTasks() {
  // Reset Tasklist
  document.querySelector(".tasks__container").innerHTML = "";

  tasks.forEach(function (task) {
    let element = document.createElement("div");
    element.innerText = task.title + " " + task.dueDate;
    let tasks = document.querySelector(".tasks__container");

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.style = "margin-left: 20px; padding: 5px 10px; border: 1px solid grey; border-radius: 5px";
    deleteButton.className = "delete-btn";
    deleteButton.onclick = deleteTask;

    deleteButton.id = task.id;
    tasks.appendChild(element);
    element.appendChild(deleteButton);
  });
}
