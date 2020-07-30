let taskContainer = document.querySelector("#taskContainer");
let taskModalSaveButton = document.querySelector("#save");

taskModalSaveButton.addEventListener("click", saveButtonClicked);

function saveButtonClicked(e) {
  const name = document.querySelector("#taskName").value;
  const description = document.querySelector("#taskDescription").value;
  const asignee = document.querySelector("#assignedTo").value;
  const date = document.querySelector("#dueDate").value;
  const status = document.querySelector("#status").value;

  addTask(name, description, asignee, date, status);
}

function addTask(name, description, asignee, date, status) {
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

  taskContainer.append(taskElement);
}
