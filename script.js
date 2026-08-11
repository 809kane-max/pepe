const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("tasList");
const rachaepica = document.getElementById("rachaepica");
const rachaepicapanel = document.getElementById("rachaepicapanel");

addButton.onclick = addTask;

document.addEventListener("DOMContentLoaded", loadTasks);
document.addEventListener("DOMContentLoaded", mostrardiasderacha);

rachaepica.addEventListener("click", () => {
    rachaepicapanel.classList.toggle("visible");
    mostrardiasderacha();
});

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
        if (texto.classList.contains("completado")) {
            marcardiaconracha();
        }
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
    var ahora = new Date().toLocaleDateString();
    var timeText = document.querySelector("#updateTime")
    timeText.innerHTML = ahora;
}
setInterval(updateTime, 1000);


function marcardiaconracha() {
    const hoy = new Date().toDateString();
    let dias = JSON.parse(localStorage.getItem("diasconracha")) || [];

    if (!dias.includes(hoy)) {
        dias.push(hoy);
        localStorage.setItem("diasconracha", JSON.stringify(dias));
    }
}

function calcularRachaActual() {
    const dias = JSON.parse(localStorage.getItem("diasconracha")) || [];
    let racha = 0;

    for (let i = 0; i < 365; i++) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - i);
        const fechaStr = fecha.toDateString();

        if (dias.includes(fechaStr)) {
            racha++;
        } else {
            break;
        }
    }

    return racha;
}

function mostrardiasderacha() {
    const dias = JSON.parse(localStorage.getItem("diasconracha")) || [];
    const contenedor = document.querySelector(".dias-semana");
    contenedor.innerHTML = "";

    document.getElementById("rachaepicanumero").textContent = calcularRachaActual();

    const nombresdias = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    for (let i = 6; i >= 0; i--) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - i);
        const fechaStr = fecha.toDateString();
        const tuvoracha = dias.includes(fechaStr);

        const item = document.createElement("div");
        item.classList.add("dia-item");

        const circulo = document.createElement("div");
        circulo.classList.add("dia-circulo");
        if (tuvoracha) circulo.classList.add("dia-circulo-activo");
        circulo.textContent = tuvoracha ? "✓" : "";

        const letra = document.createElement("span");
        letra.textContent = nombresdias[fecha.getDay()];

        item.appendChild(circulo);
        item.appendChild(letra);
        contenedor.appendChild(item);
    }
}
