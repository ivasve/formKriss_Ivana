// Anindha has divide this into index + task-form-manager
//Anindha has the HTML in task.js, not in taskmanager.js

//import Task from "./taskManager";
//import TaskManager from "./taskManager.js";
//displays Today date
let todayDate = document.getElementById("date");
const option = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

todayDate.innerHTML = today.toLocaleDateString("en-US", option);
const taskManager = new TaskManager();
console.log(taskManager);

//newTaskForm is the form in the create task modal
let newTaskForm = document.getElementById("newTaskForm");
newTaskForm.addEventListener("submit", formEventListener);
newTaskForm.addEventListener("load", () => {
  createTaskNameInput.focus();
});

//updateTaskForm
let updateTaskForm = document.getElementById("updateTaskForm");
updateTaskForm.addEventListener("submit", formEventListener);
updateTaskForm.addEventListener("load", () => {
  updateFormNameInput.focus();
});

//find the correct point, click on Create button
let tasksContainer = document.querySelector("#tasksrow");

//updateModalSaveButton is on the edit MODAL
let updateModalSaveButton = document.querySelector("#save");
updateModalSaveButton.addEventListener("click", updateSaveButtonClicked);

$("#taskEditModal").on("shown.bs.modal", function () {
  $("#updateTaskNameInput").trigger("focus");
});

//buttonCreateTask is on the main page
let buttonCreateTask = document.getElementById("btnCreateTask");
buttonCreateTask.onclick = clearTaskCreationForm;

//addTaskButton is on the create task MODAL
let addTaskButton = document.getElementById("addTaskButton");
addTaskButton.onclick = addTask;

taskManager.readTasks();
taskManager.displayTasks(tasksContainer);

let btnChangeStatusToReview = document.getElementById(
  "btnChangeStatusToReview"
);
btnChangeStatusToReview.addEventListener("click", () => {
  taskManager.DisplayStatus = "Review";
  taskManager.displayTasks(tasksContainer);
});

let btnChangeStatusToAll = document.getElementById("btnChangeStatusToAll");
btnChangeStatusToAll.addEventListener("click", () => {
  taskManager.DisplayStatus = "ALL";
  taskManager.displayTasks(tasksContainer);
});

let btnChangeStatusToDo = document.getElementById("btnChangeStatusToDo");
btnChangeStatusToDo.addEventListener("click", () => {
  taskManager.DisplayStatus = "To Do";
  taskManager.displayTasks(tasksContainer);
});

let btnChangeStatusToProgress = document.getElementById(
  "btnChangeStatusToProgress"
);
btnChangeStatusToProgress.addEventListener("click", () => {
  taskManager.DisplayStatus = "In Progress";
  taskManager.displayTasks(tasksContainer);
});

let btnChangeStatusToDone = document.getElementById("btnChangeStatusToDone");
btnChangeStatusToDone.addEventListener("click", () => {
  taskManager.DisplayStatus = "Done";
  taskManager.displayTasks(tasksContainer);
});

// START of create task modal input elements

let createTaskNameInput = document.getElementById("taskName");
createTaskNameInput.addEventListener("keydown", createFormInputsEventListener);

let createTaskDescriptionInput = document.getElementById("taskDescription");
createTaskDescriptionInput.addEventListener(
  "keydown",
  createFormInputsEventListener
);

let createTaskAssignedToInput = document.getElementById("assignedTo");
createTaskAssignedToInput.addEventListener(
  "keydown",
  createFormInputsEventListener
);

let createTaskDueDateInput = document.getElementById("dueDate");
createTaskDueDateInput.addEventListener(
  "keydown",
  createFormInputsEventListener
);
createTaskDueDateInput.addEventListener(
  "change",
  createFormInputsEventListener
);

let createTaskStatusInput = document.getElementById("addStatus");
createTaskStatusInput.addEventListener(
  "keydown",
  createFormInputsEventListener
);
createTaskStatusInput.addEventListener("change", createFormInputsEventListener);

// start of update modal form inputs add event listeners

let updateFormNameInput = document.getElementById("updateTaskNameInput");
updateFormNameInput.addEventListener("keydown", updateFormInputsEventListener);

let updateFormDescriptionInput = document.getElementById("taskDescription2");
updateFormDescriptionInput.addEventListener(
  "keydown",
  updateFormInputsEventListener
);

let updateFormAssignedToInput = document.getElementById("assignedTo2");
updateFormAssignedToInput.addEventListener(
  "keydown",
  updateFormInputsEventListener
);

let updateFormDueDateInput = document.getElementById("dueDate2");
updateFormDueDateInput.addEventListener(
  "keydown",
  updateFormInputsEventListener
);
updateFormDueDateInput.addEventListener(
  "change",
  updateFormInputsEventListener
);

let updateFormStatusInput = document.getElementById("status2");
updateFormStatusInput.addEventListener(
  "keydown",
  updateFormInputsEventListener
);
updateFormStatusInput.addEventListener("change", updateFormInputsEventListener);

function updateSaveButtonClicked(e) {
  // To save updated task fields that have been updated on the update modal form
  const taskId = updateTaskForm.taskId.value;
  const name = document.querySelector("#updateTaskNameInput").value;
  const description = document.querySelector("#taskDescription2").value;
  const asignee = document.querySelector("#assignedTo2").value;
  const date = document.querySelector("#dueDate2").value;
  const status = document.querySelector("#status2").value;
  taskManager.updateTask(
    Number(taskId),
    name,
    description,
    asignee,
    new Date(date),
    status
  );
}

function addTask() {
  // To save newly created tasks with taskManager.addTask()
  // Task manager will create a new card from a string and display it with taskManager.displayTasks()

  const name = document.querySelector("#taskName").value;
  const description = document.querySelector("#taskDescription").value;
  const asignee = document.querySelector("#assignedTo").value;
  const date = document.querySelector("#dueDate").value;
  const status = document.querySelector("#addStatus").value;

  let newTask = new Task(0, name, description, asignee, new Date(date), status);
  let newId = taskManager.addTask(newTask);
  taskManager.displayTasks(tasksContainer);
}

function formEventListener(event) {
  let form = event.target;
  const valid = form.checkValidity();
  if (valid === false) {
    event.preventDefault();
    event.stopPropagation();
    form.reset();
  } else {
  }

  // The 'was-validated' class is saying the form has been through the validation process, BUT NOT that the form is valid.
  // Only when the form has this class, the pass and fail messages will be shown.
  form.classList.add("was-validated");
}

function createFormInputsEventListener(event) {
  // The listener for all the inputs on the creation form

  let isValid = newTaskForm.checkValidity();
  console.log("input listener. isValid: " + isValid);
  if (isValid == false) {
    addTaskButton.classList.add("hide");
    addTaskButton.classList.remove("show");
  } else {
    addTaskButton.classList.remove("hide");
    addTaskButton.classList.add("show");
  }
  // The 'was-validated' class is saying the form has been through the validation process, BUT NOT THAT THE FORM IS VALID.
  // the pass and fail messages will be shown only when the form has been given this class, .
  newTaskForm.classList.add("was-validated");
}

function updateFormInputsEventListener() {
  // The listener for all the inputs on the update form

  let isValid = updateTaskForm.checkValidity();

  if (isValid == false) {
    updateModalSaveButton.classList.add("hide");
    updateModalSaveButton.classList.remove("show");
  } else {
    updateModalSaveButton.classList.remove("hide");
    updateModalSaveButton.classList.add("show");
  }
  // The 'was-validated' class is saying the form has been through the validation process, BUT NOT THAT THE FORM IS VALID.
  // the pass and fail messages will be shown only when the form has been given this class, .
  updateTaskForm.classList.add("was-validated");
}

function clearTaskCreationForm() {
  // Clears all the inputs on the form
  newTaskForm.reset();

  $("#taskModal").on("shown.bs.modal", function () {
    $("#taskName").trigger("focus");
  });
  // Remove the class that allows the pass and fail messages to be displayed.
  newTaskForm.classList.remove("was-validated");
}
