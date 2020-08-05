//newTaskForm is the form in the create task modal
let newTaskForm = document.getElementById('newTaskForm');
newTaskForm.addEventListener('submit', formEventListener);
newTaskForm.addEventListener('load', () => { taskNameInput.focus(); });

//find the correct point, click on Create button
let tasksContainer = document.querySelector("#tasksrow");

//taskModalSaveButton is on the edit MODAL
let taskModalSaveButton = document.querySelector("#save");
taskModalSaveButton.addEventListener("click", saveButtonClicked);

//buttonCreateTask is on the main page
let buttonCreateTask = document.getElementById("btnCreateTask");
buttonCreateTask.onclick = clearForm;

//addTaskButton is on the create task MODAL
let addTaskButton = document.getElementById("addTaskButton");
addTaskButton.onclick = addTask;

// START of create task modal input elements

let taskNameInput = document.getElementById("taskName");
taskNameInput.addEventListener('keypress', inputEventListener);
taskNameInput.addEventListener('change', inputEventListener);

let taskDescriptionInput = document.getElementById("taskDescription");
taskDescriptionInput.addEventListener('keypress', inputEventListener);
taskDescriptionInput.addEventListener('change', inputEventListener);

let assignedToInput = document.getElementById("assignedTo");
assignedToInput.addEventListener('keypress', inputEventListener);
assignedToInput.addEventListener('change', inputEventListener);

let dueDateInput = document.getElementById("dueDate");
dueDateInput.addEventListener('keypress', inputEventListener);
dueDateInput.addEventListener('change', inputEventListener);

let statusInput = document.getElementById("status");
statusInput.addEventListener('keypress', inputEventListener);
statusInput.addEventListener('change', inputEventListener);

// END of create task modal input elements

const taskManager = new TaskManager();
//test
taskManager.generateTasks();
console.log("");

function saveButtonClicked(e) {
  //To save EDITS
  const name = document.querySelector("#taskName").value;
  const description = document.querySelector("#taskDescription").value;
  const asignee = document.querySelector("#assignedTo").value;
  const date = document.querySelector("#dueDate").value;
  // const time = document.querySelector("#taskTime").value; IS MISSING, ADD IT
  const status = document.querySelector("#status").value;

  addTask(name, description, asignee, date, status);
}

function addTask() {
  // To save newly created tasks
  // Creates a new card from a string
  const name = document.querySelector("#taskName").value;
  const description = document.querySelector("#taskDescription").value;
  const asignee = document.querySelector("#assignedTo").value;
  const date = document.querySelector("#dueDate").value;
  // const time = document.querySelector("#taskTime").value; IS MISSING, ADD IT
  const status = document.querySelector("#status").value;

  let newTask = new Task(0, name, description, asignee, new Date(date), status);
  let newId = taskManager.addTask(newTask);
  console.log(newId);
  console.table(taskManager.tasks);

  const html = `      <div class="col-lg-4">
    <div class="card my-4">
      
      <div
        class="card-header"
        id="header1"
        style="background-color: rgb(96, 96, 245); color: white;"
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
            <strong
              ><h5
                class="text-center"
                style="
                  text-decoration: none;
                  background-color: rgb(96, 96, 245);
                  color: white;
                "
              >
            ${name}
              </h5></strong
            >
          </button>
        </h2>
      </div>
      <div id="collapse1" class="collapse show" aria-labelledby="head1">
        <div class="card-body">
          <h5 class="card-title">${description}</h5>
          <p class="card-text"></p>
        </div>
        <ul class="list-group list-group-flush">
          
          <li
            class="list-group-item"
            style="background-color: rgb(141, 234, 250);"
          >
            Asignee: ${asignee}
          </li>
          <li class="list-group-item">Date Due: ${date}</li>
          <li class="list-group-item" id="status">Status: ${status}
          </li>
          <li class="list-group-item">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#taskEditModal"
            >
              Edit
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
`;

  const taskElement = document.createRange().createContextualFragment(html);

  tasksContainer.append(taskElement);
}


function formEventListener(event) {
  // Expecting the SUBMIT EVENT
  // NOT FIRING AT THE MOMENT - WE don't need the form to be submitted anyway because the ADD BUTTON creates and displays the newly created task.
  const valid = this.checkValidity();

  if (this.checkValidity() === false) {
    // Form is INVALID
    event.preventDefault();
    event.stopPropagation();
    this.reset();
  }
  else {
    // Form is VALID
    // Therefore we want to continue with the submit

    //remove the following to allow the submission to proceed at a later date after testing
    //event.preventDefault();
    //event.stopPropagation();
    //alert("asdf");
  }

  // The 'was-validated' class is saying the form has been through the validation process, BUT NOT that the form is valid.
  // Only when the form has this class, the pass and fail messages will be shown.
  this.classList.add('was-validated');

}



function inputEventListener() {

  // The listener for all the inputs

  let b = newTaskForm.checkValidity();

  if (b == false) {

    // Only enable (or maybe display) the add button if the form is valid
    addTaskButton.classList.add("hide");
    addTaskButton.classList.remove("show");
    //alert("some fields are invalid");
  }
  else {

    addTaskButton.classList.add("show");
    addTaskButton.classList.remove("hide");

  }
  // The 'was-validated' class is saying the form has been through the validation process, BUT NOT THAT THE FORM IS VALID.
  // the pass and fail messages will be shown only when the form has been given this class, .
  newTaskForm.classList.add("was-validated");
}

function clearForm() {
  // Clears all the inputs as for some reason they displayed the previous user attempt's values
  newTaskForm.reset();
  // Remove the class that allows the pass and fail messages to be displayed.
  newTaskForm.classList.remove("was-validated");

}
