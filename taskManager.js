// import Task from "./taskManager";
class Task {
  constructor(id, name, description, assignedTo, dueDate, status) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
    this.status = status;
  }
  getLabels() {
    return ["ID", "Name", "Description", "Assigned To", "Due Date", "Status"];
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
    this.taskId = 0;
    this.DisplayStatus = "ALL";
  }

  saveTasks() {
    //alert("saving tasks");
    try {
      window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
      console.table("After Save: ");
      console.table(this.tasks);
    } catch (error) {
      alert("Local Storage Save Tasks Error" + error);
    }
  }

  readTasks() {
    try {
      let storedTasksJSON = window.localStorage.getItem("tasks");
      let storedTaskObjects = JSON.parse(storedTasksJSON);
      this.tasks = [];
      this.taskId = 0;
      if (storedTaskObjects) {
        storedTaskObjects.forEach((t) => {
          const taskObject = new Task(
            this.taskId,
            t.name,
            t.description,
            t.assignedTo,
            new Date(t.dueDate),
            t.status
          );

          this.tasks.push(taskObject);
          this.taskId++;
        });
      }
      console.table("After Read: ");

      console.table(this.tasks);
    } catch (error) {
      alert("Local Storage Read Tasks Error" + error);
    }
  }
  getTasks() {
    return this.tasks;
  }

  getTasksWithStatus(status) {
    return this.tasks.filter(function (task) {
      return task.status == status;
    });
  }

  addTask(newTask) {
    this.taskId++;

    newTask.id = this.taskId;
    // alert(newTask.id);
    this.tasks.push(newTask);
    this.saveTasks();
    this.readTasks();
    return this.taskId;
  }

  deleteTask(taskToDelete) {
    let taskIndex = this.tasks.findIndex(function (task) {
      return task.id == taskToDelete.id;
    });
    if (taskIndex != -1) {
      let deletedItem = this.tasks.splice(taskIndex, 1);
      this.saveTasks();
    }
  }

  deleteTaskById(taskId) {
    let taskIndex = this.tasks.findIndex(function (task) {
      return task.id == taskId;
    });
    if (taskIndex != -1) {
      let deletedItem = this.tasks.splice(taskIndex, 1);
      this.saveTasks();
    }
  }
  getTaskIndexFromId(taskId) {
    let taskIndex = this.tasks.findIndex(function (task) {
      return task.id == taskId;
    });
    return taskIndex;
  }
  getTaskFromId(taskId) {
    let taskIndex = this.tasks.findIndex(function (task) {
      return task.id == taskId;
    });
    return this.tasks[taskIndex];
  }

  updateTaskStatus(taskId, newStatus) {
    let taskToUpdate = null;
    taskToUpdate = this.getTaskFromId(taskId);
    if (taskToUpdate) {
      taskToUpdate.status = newStatus;
    }
    console.log(this.tasks);
  }

  updateTask(taskId, name, description, assignedTo, dueDate, status) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === taskId) {
        this.tasks[i].name = name;
        this.tasks[i].description = description;
        this.tasks[i].assignedTo = assignedTo;
        this.tasks[i].dueDate = dueDate;
        this.tasks[i].status = status;
      }
    }
    this.saveTasks();
    this.readTasks();
    let tasksRow = document.getElementById("tasksrow");
    this.displayTasks(tasksRow);
  }

  assignTask(taskId, newAssignee) {
    let taskToUpdate = null;
    taskToUpdate = this.getTaskFromId(taskId);
    if (taskToUpdate) {
      taskToUpdate.assignedTo = newAssignee;
    }
    console.log(this.tasks);
  }

  displayTasks(destinationElement) {
    let out = destinationElement;

    if (out) {
      out.innerHTML = "";
    }

    let tasksToDisplay = this.getTasksWithStatus(this.DisplayStatus);

    if (this.DisplayStatus == "ALL") {
      tasksToDisplay = this.tasks;
    }

    tasksToDisplay.forEach((theTask) => {
      this.createTaskCardDomElements(destinationElement, theTask);
    });
  }

  createTaskCardDomElements(destinationElement, task) {
    //console.log("createTaskCardDomElements");
    if (!destinationElement) {
      return;
    }
    const html = `
            <div id="${task.id}" class="task col-lg-4">
              <div class="card my-4">
        
                <div
                  class="card-header"
                  id="header1
                  >
                  <h2 class="mb-0 text-left" style="text-decoration: none;">
                    <button
                      id="b1"
                      class="btn btn-block text-left cardNameButton ${
                        task.status
                      }"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapse1"
                      aria-expanded="true"
                      aria-controls="collapse1"
                     
                    >
                      <strong>
                        <h5
                        
                         class="cardName text-center"
                        >
                        ${task.name}</h5>
                      </strong>
                    </button>
                  </h2>
                </div>
        
                <div id="collapse1" class="collapse show" aria-labelledby="head1">
                  <div class="card-body">
                    <h5 class="card-title">${task.description}</h5>
                    <p class="card-text"></p>
                  </div>
        
                  <ul class="list-group list-group-flush">
                    <li
                      class="list-group-item"
                      style="background-color: rgb(141, 234, 250);"
                    >
                      Asignee: ${task.assignedTo}
                    </li>
                    <li class="list-group-item">Date Due: ${task.dueDate.toLocaleDateString()}</li>
                    <li class="list-group-item status">Status: ${
                      task.status
                    }</li>
                    <li class="list-group-item">
                      <button
                        type="button"
                        id="editBtn${task.id}"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#taskEditModal"
                      >
                        Edit
                      </button>
                      <button
                          type="button"
                          id="deleteBtn${task.id}"
                          class="deleteBtn btn btn-secondary btn-sm"
                          >
                          Delete
                      </button>
                    </li>
                  </ul>
                </div>
        
              </div>
            </div>
          `;
    //console.log(html);
    const taskElement = document.createRange().createContextualFragment(html);

    destinationElement.append(taskElement);
    console.log(destinationElement.innerHTML);

    let deleteBtn = document.querySelector("#deleteBtn" + task.id);

    if (deleteBtn) {
      deleteBtn.addEventListener("click", function (event) {
        $(function () {
          $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 300,
            modal: true,
            buttons: {
              "Delete Task": function () {
                var taskElement = event.target.closest(".task");
                taskManager.deleteTaskById(taskElement.id);
                let tasksRow = document.getElementById("tasksrow");
                taskManager.displayTasks(tasksRow);

                $(this).dialog("close");
              },
              Cancel: function () {
                $(this).dialog("close");
              },
            },
          });
        });
      });
    }

    let editBtn = document.querySelector("#editBtn" + task.id);

    if (editBtn) {
      //Fill in the update form with the existing task fields
      editBtn.addEventListener("click", function (event) {
        var taskElement = event.target.closest(".task");
        let task = taskManager.getTaskFromId(taskElement.id);
        updateTaskForm.taskId.value = task.id;
        updateTaskForm.updateTaskNameInput.value = task.name;
        updateTaskForm.taskDescription2.value = task.description;
        updateTaskForm.assignedTo2.value = task.assignedTo;
        const YEAR = task.dueDate.getFullYear();
        let month = task.dueDate.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let day = task.dueDate.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        updateTaskForm.dueDate2.value = YEAR + "-" + month + "-" + day;
        // YEAR + "/" + MONTH + "/" + DAY;
        updateTaskForm.status2.value = task.status;
        // let tasksRow = document.getElementById("tasksrow");
        // this.saveTasks();
        // this.readTasks();
        // taskManager.displayTasks(tasksRow);
      });
    }
  }
}

exports.TaskManager = TaskManager;
exports.task = Task;
