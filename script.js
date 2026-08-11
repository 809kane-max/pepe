const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("tasList");

addButton.onclick = addTask;

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(taskText, completed = false) {
    if (typeof taskText !== "string") {
        taskText = taskInput.value;
    }
    if (taskText.trim() === "") return;

    const task = document.createElement("div");
    task.classList.add("elementodelista", "task-enter");

    const boton = document.createElement("div");
    boton.classList.add("boton");

    const texto = document.createElement("p");
    texto.textContent = taskText;
    if (completed) texto.classList.add("completado");

    texto.addEventListener("click", () => {
        texto.classList.toggle("completado");
        saveTasks();
    });

    boton.addEventListener("click", () => {
        task.classList.add("task-exit");
        task.addEventListener("animationend", () => {
            task.remove();
            saveTasks();
        }, { once: true });
    });

    task.appendChild(texto);
    task.appendChild(boton);
    taskList.appendChild(task);

    taskInput.value = "";
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#tasList .elementodelista").forEach(task => {
        const p = task.querySelector("p");
        tasks.push({
            text: p.textContent,
            completed: p.classList.contains("completado")
        });
    });
    localStorage.setItem("brainDumpTasks", JSON.stringify(tasks));
}

function loadTasks() {
    const saved = JSON.parse(localStorage.getItem("brainDumpTasks")) || [];
    saved.forEach(t => addTask(t.text, t.completed));
}

function updateTime() {
    var ahora = new Date(). toLocaleDateString();
    var timeText = document.querySelector("#updateTime")
    timeText.innerHTML = ahora;

}
setInterval(updateTime, 1000);