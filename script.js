const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("tasList");

addButton.onclick=addTask

function addTask(){

    const taskText = taskInput.value;

    const task = document.createElement("li");

    task.textContent = taskText;

    taskList.appendChild(task);
    
}