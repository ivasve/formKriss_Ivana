//import { TaskManager, Task } from "./taskManager.js";
var tm = require("./taskManager.js");

//let taskManager = new TaskManager();
const TaskManager = tm.TaskManager;
const Task = tm.task;

console.log(TaskManager);
//console.log(html);
let taskManager = new TaskManager();

const newTask = new Task(
  "01",
  "Go shopping",
  "fruit, veggie",
  "Kriss",
  "05/10/2020",
  "In Progress"
);

test("check add function", () => {
  expect(taskManager.tasks.length).toBe(0);
  taskManager.addTask(newTask);
  expect(taskManager.tasks.length).toBe(1);
});

test("check delete by ID function", () => {
  expect(taskManager.tasks.length).toBe(1);
  const newTask01 = new Task(
    "01",
    "Go swimming",
    "in the pool",
    "Kriss",
    "05/10/2020",
    "In Progress"
  );

  taskManager.addTask(newTask01);
  expect(taskManager.tasks.length).toBe(2);

  const newTask02 = new Task(
    2,
    "Car repair",
    "our car is in a bad shape",
    "Ivana",
    "05/10/2020",
    "In Progress"
  );
  taskManager.addTask(newTask02);
  expect(taskManager.tasks.length).toBe(3);
  taskManager.deleteTaskById(newTask01.id);
  expect(taskManager.tasks.length).toBe(2);
});

test("check update function", () => {
  const newTask02 = new Task(
    0,
    "Attend Circus Spectacular",
    "Attend Circus Spectacular",
    "Ivana",
    "05/10/2020",
    "In Progress"
  );

  taskManager.addTask(newTask02);
  taskManager.updateTask(
    0,
    "Climb Harbour Bridge",
    "Spectacular view of harbour",
    "Ivana",
    "05/10/2020",
    "In Progress"
  );

  let retrievedTask = taskManager.getTaskFromId(0);
  expect(retrievedTask.name).toContain("Harbour Bridge");
});

test("check assign task function", () => {
  taskManager.tasks = [];

  const newTask02 = new Task(
    0,
    "Attend Circus Spectacular",
    "Attend Circus Spectacular",
    "Ivana",
    "05/10/2020",
    "In Progress"
  );

  taskManager.addTask(newTask02);

  taskManager.assignTask(0, "Kriss");

  let retrievedTask = taskManager.getTaskFromId(0);
  expect(retrievedTask.assignedTo).toContain("Kriss");
});

test("add a task to the DOM", () => {
  document.body.innerHTML = '<div id="tasksrow"></div>';

  const newTask02 = new Task(
    "02",
    "Car repair",
    "our car is in a bad shape",
    "Ivana",
    "05/10/2020",
    "In Progress"
  );
  taskManager.addTask(newTask02);
  taskManager.displayStatus = "ALL";
  let taskRowContainer = document.getElementById("tasksrow");
  taskManager.displayTasks(taskRowContainer);
  //if (!tr) { console.log("**********************************no tr element"); } else { console.log('********************************************************'); }
  //console.log(tr.innerHTML);
  expect(taskRowContainer.innerHTML).toContain("shape");
});

test("delete a task from the DOM", () => {
  document.body.innerHTML = '<div id="tasksrow"></div>';
  // index.html has a container for the tasks with id = "tasksrow"

  taskManager.tasks = [];

  //console.log(tr.innerHTML);
  const newTask02 = new Task(
    "0",
    "Attend Circus Spectacular",
    "Attend Circus Spectacular",
    "Ivana",
    "05/10/2020",
    "In Progress"
  );

  taskManager.addTask(newTask02);
  let taskRowContainer = document.getElementById("tasksrow");
  taskManager.displayTasks(taskRowContainer);

  expect(taskRowContainer.innerHTML).toContain("Circus");

  // after displayTasks the id of the task will be 0
  // because in this app, the ids begin at zero on each storage access

  taskManager.deleteTaskById(0);
  taskManager.displayTasks(taskRowContainer);

  expect(taskRowContainer.innerHTML).not.toContain("Circus");
});
