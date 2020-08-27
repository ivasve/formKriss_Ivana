## Running the task planner app
The Task planner is based on Bootstrap (cards, forms, modals). Each card is collapsible, so they do not take too much space. <br />
Adds a new Task. - There is a validation on the Add form. The Add button is disabled as long as the validation is false. <br />
Edits a Task. - This is a different modal/form from the Add task one! It also has validation on its input fields + disabled Update button. Each Edit button has its own id. <br />
Deletes a Task. - Deletes from the local storage. Each Delete button has its own id. There is a Dialog pop-up window before deleting. <br />
Filters Tasks. - According to Status. The Task's card head changes its colour according to the Status. <br />
All Tasks are stored in a local storage. <br />


## Testing with Jest

7 unit tests (2 suites) 
Run Jest from the command line
jest taskManager.test.js
