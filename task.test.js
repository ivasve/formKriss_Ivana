var tm = require("./taskManager.js");

const Task = tm.task;

test("check that the object was created", () => {
  const newTask = new Task(
    "01",
    "Have a nap",
    "for 2 hrs at least",
    "Ivana",
    "05/10/2020",
    "In Progress"
  );

  expect(newTask.id).toBe("01");
  expect(newTask.name).toBe("Have a nap");
  expect(newTask.description).toBe("for 2 hrs at least");
  expect(newTask.assignedTo).toBe("Ivana");
  expect(newTask.dueDate).toBe("05/10/2020");
  expect(newTask.status).toBe("In Progress");
});
