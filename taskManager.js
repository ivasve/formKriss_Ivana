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
        return this.taskId;


    }
    deleteTask(taskToDelete) {
        let taskIndex = this.tasks.findIndex(function (task) {
            return task.id == taskToDelete.id;
        });
        //alert(taskIndex);
        if (taskIndex != -1) {
            let deletedItem = this.tasks.splice(taskIndex, 1);
        }
    }
    deleteTaskById(taskId) {
        let taskIndex = this.tasks.findIndex(function (task) {
            return task.id == taskId;
        });
        //alert(taskIndex);
        if (taskIndex != -1) {
            let deletedItem = this.tasks.splice(taskIndex, 1);
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
        const name = ["Buy groceries", "Go for a walk", "Prepare taxes", "Doctors appointment", "Attend show", "Watch movie", "Feed Dog", "Do laundry", "Test code", "Paint fence", "Inspect car", "Register car", "Insure car", "Ring Aunt Jane"];
        const status = ['TODO', 'INPROGRESS', 'REVIEW', 'DONE'];
        const person = ["Kriss", "Ivana"];
        let ran = Math.floor(Math.random() * name.length);

        let statusRandom = Math.floor(Math.random() * 4);
        let personRandom = Math.floor(Math.random() * 2);

        let newTask = new Task(id, name[ran], name[ran], person[personRandom], new Date(2020, 2, 1 + id, id), status[statusRandom]);
        return newTask;
    }
    generateTasks() {

        for (let i = 0; i < 21; i++) {
            let randomTask = (this.randomTask(i));
            this.addTask(randomTask);

        }
        console.table(this.tasks);
    }
    displayTasks(output) {
        let out = document.getElementById(output);
        while (out.firstChild) {

            out.removeChild(out.firstChild);
        }
        this.tasks.forEach(element => {
            domManager.createTaskCardDomElements(output, element, true);

        });
    }

}
//tests
// const taskManager = new TaskManager();
// taskManager.generateTasks();
// let t = taskManager.addTask({ id: 20, name: 'Go fishing', description: 'Go fishing', assignedTo: 'Sid Smith', dueDate: new Date(), status: 'TODO' });
// taskManager.deleteTask({ id: 20, name: 'Go fishing', description: 'Go fishing', assignedTo: 'Sid Smith', dueDate: new Date(), status: 'TODO' });
// taskManager.updateTaskStatus(1, "****STATUS****");
// taskManager.assignTask(2, "**new assignee**");
// console.log(this.tasks);
// console.log("finished");

