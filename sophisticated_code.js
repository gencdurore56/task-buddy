/* 
Filename: sophisticated_code.js

Description: This code is a sophisticated implementation of a task management system. It allows users to create and manage tasks, assign priorities, due dates, and track completion status.

Note: This code assumes the availability of an external library called "moment.js" for date manipulation. Please make sure to include the library before executing the code.

*/

// Task class to represent a single task
class Task {
  constructor(name, priority, dueDate) {
    this.name = name;
    this.priority = priority;
    this.dueDate = moment(dueDate); // using moment.js for date manipulation
    this.completed = false;
  }

  complete() {
    this.completed = true;
  }

  getFormattedDueDate() {
    return this.dueDate.format("MMMM Do YYYY, h:mm:ss a");
  }
}

// Task Management System class to handle task operations
class TaskManagementSystem {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  completeTask(taskName) {
    const task = this.findTaskByName(taskName);
    if (task) {
      task.complete();
      console.log(`Task '${taskName}' completed successfully.`);
    } else {
      console.error(`Task '${taskName}' not found.`);
    }
  }

  getTaskCount() {
    return this.tasks.length;
  }

  findTaskByName(taskName) {
    return this.tasks.find((task) => task.name === taskName);
  }

  getTasksDueToday() {
    const today = moment().startOf("day");
    return this.tasks.filter((task) =>
      task.dueDate.isSame(today, "day")
    );
  }
}

// Creating instances and testing

const task1 = new Task("Implement authentication", "High", "2022-12-31 23:59:59");
const task2 = new Task("Refactor codebase", "Medium", "2022-12-30 18:00:00");
const task3 = new Task("Write unit tests", "Low", "2023-01-05 09:30:00");

const taskManagementSystem = new TaskManagementSystem();
taskManagementSystem.addTask(task1);
taskManagementSystem.addTask(task2);
taskManagementSystem.addTask(task3);

console.log(`Total tasks: ${taskManagementSystem.getTaskCount()}`);
console.log(`Task due today: ${taskManagementSystem.getTasksDueToday().length}`);

taskManagementSystem.completeTask("Refactor codebase");
taskManagementSystem.completeTask("Invalid Task");

console.log(`Task due today: ${taskManagementSystem.getTasksDueToday().length}`);