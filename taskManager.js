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
    //to do - get tasks from local storage

    this.taskId = 0;
  }

  saveTasks() {
    window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  readTasks() {
    let storedTasksJSON = window.localStorage.getItem("tasks");
    let storedTaskObjects = JSON.parse(storedTasksJSON);

    if (storedTaskObjects) {
      storedTaskObjects.forEach((t) => {
        const taskObject = new Task(
          t.id,
          t.name,
          t.description,
          t.assignedTo,
          t.dueDate,
          t.status
        );


        this.tasks.unshift(taskObject);
        this.taskId++;
      })
    };
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
    this.tasks.unshift(newTask);
    this.saveTasks();
    return this.taskId;
  }
  deleteTask(taskToDelete) {
    let taskIndex = this.tasks.findIndex(function (task) {
      return task.id == taskToDelete.id;
    });
    //alert(taskIndex);
    if (taskIndex != -1) {
      let deletedItem = this.tasks.splice(taskIndex, 1);
      this.saveTasks();
    }
  }
  deleteTaskById(taskId) {
    let taskIndex = this.tasks.findIndex(function (task) {
      return task.id == taskId;
    });
    //alert(taskIndex);
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
  assignTask(taskId, newAssignee) {
    let taskToUpdate = null;
    taskToUpdate = this.getTaskFromId(taskId);
    if (taskToUpdate) {
      taskToUpdate.assignedTo = newAssignee;
    }
    console.log(this.tasks);
  }

  randomTask(id) {
    const name = [
      "Buy groceries",
      "Go for a walk",
      "Prepare taxes",
      "Doctors appointment",
      "Attend show",
      "Watch movie",
      "Feed Dog",
      "Do laundry",
      "Test code",
      "Paint fence",
      "Inspect car",
      "Register car",
      "Insure car",
      "Ring Aunt Jane",
    ];
    const status = ["TODO", "INPROGRESS", "REVIEW", "DONE"];
    const person = ["Kriss", "Ivana"];
    let ran = Math.floor(Math.random() * name.length);

    let statusRandom = Math.floor(Math.random() * 4);
    let personRandom = Math.floor(Math.random() * 2);

    let newTask = new Task(
      id,
      name[ran],
      name[ran],
      person[personRandom],
      new Date(2020, 2, 1 + id, id),
      status[statusRandom]
    );
    return newTask;
  }
  generateRandomTasks(shouldSave) {
    for (let i = 0; i < 3; i++) {
      let randomTask = this.randomTask(i);
      this.addTask(randomTask);
    }
    console.table(this.tasks);
    if (shouldSave) {
      this.saveTasks();
    }
  }
  displayTasks(destinationId) {
    let out = document.getElementById(destinationId);
    out.innerHTML = "";

    this.tasks.forEach((theTask) => {
      domManager.createTaskCardDomElements(destinationId, theTask);
    });
  }
}

const domManager = {
  createTaskCardDomElements: function (destinationId, task) {
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
                  class="btn btn-block text-left"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapse1"
                  aria-expanded="true"
                  aria-controls="collapse1"
                  style="background-color: rgb(96, 96, 245); color: white;"
                >
                  <strong>
                    <h5
                      class="text-center"
                      style="
                        text-decoration: none;
                        background-color: rgb(96, 96, 245);
                        color: white;
                      "
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
                <li class="list-group-item">Date Due: ${task.dueDate}</li>
                <li class="list-group-item status">Status: ${task.status}</li>
                <li class="list-group-item">
                  <button
                    type="button"
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

    const taskElement = document.createRange().createContextualFragment(html);

    tasksContainer.append(taskElement);

    let deleteBtn = document.querySelector("#deleteBtn" + task.id);

    if (deleteBtn) {
      deleteBtn.addEventListener("click", function (event) {
        var taskElement = event.target.closest(".task");
        taskManager.deleteTaskById(taskElement.id);
        //todo Remove Card from DOM; Refresh screen
        taskManager.displayTasks("tasksrow");
      });
    }
  },
};

//tests
//const taskManager = new TaskManager();

//taskManager.saveTasks();
//taskManager.readTasks();
// let t = taskManager.addTask({ id: 20, name: 'Go fishing', description: 'Go fishing', assignedTo: 'Sid Smith', dueDate: new Date(), status: 'TODO' });
// taskManager.deleteTask({ id: 20, name: 'Go fishing', description: 'Go fishing', assignedTo: 'Sid Smith', dueDate: new Date(), status: 'TODO' });
// taskManager.updateTaskStatus(1, "****STATUS****");
// taskManager.assignTask(2, "**new assignee**");
// console.log(this.tasks);
// console.log("finished");
