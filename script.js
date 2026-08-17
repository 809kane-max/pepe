const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("tasList");
const rachaepica = document.getElementById("rachaepica");
const rachaepicapanel = document.getElementById("rachaepicapanel");
const alerta = document.getElementById("alerta");
const alertapanel = document.getElementById("alertapanel");

addButton.onclick = addTask;

document.addEventListener("DOMContentLoaded", loadTasks);
document.addEventListener("DOMContentLoaded", mostrardiasderacha);

rachaepica.addEventListener("click", () => {
    document.getElementById("calendariopanel").classList.remove("visible");
    rachaepicapanel.classList.toggle("visible");
    mostrardiasderacha();
});

alerta.addEventListener("click", () => {
    document.getElementById("calendariopanel").classList.remove("visible");
    rachaepicapanel.classList.remove("visible");
    alertapanel.classList.toggle("visible");
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
            taskList.appendChild(task);
        } else {
            taskList.prepend(task);
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
    
    if (completed) {
        taskList.appendChild(task);
    } else {
        taskList.prepend(task);
    }

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

updateTime();
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
        letra.classList.add("dia-letra");
        if (i === 0) letra.classList.add("dia-letra-hoy");

        item.appendChild(circulo);
        item.appendChild(letra);
        contenedor.appendChild(item);
    }
}

let fechaActual = new Date();

function renderCalendario() {
    const grid = document.getElementById("calendarioGrid");
    const mesAno = document.getElementById("calendarioMesAno");
    grid.innerHTML = "";

    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();

    const nombresMeses = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    mesAno.textContent = `${nombresMeses[mes]} ${anio}`;

    const primerDia = new Date(anio, mes, 1).getDay();
    const diasEnMes = new Date(anio, mes + 1, 0).getDate();
    const diasConRacha = JSON.parse(localStorage.getItem("diasconracha")) || [];

    for (let i = 0; i < primerDia; i++) {
        const vacio = document.createElement("div");
        vacio.classList.add("dia", "vacio");
        grid.appendChild(vacio);
    }

    for (let d = 1; d <= diasEnMes; d++) {
        const dia = document.createElement("div");
        dia.classList.add("dia");

        const circulo = document.createElement("div");
        circulo.classList.add("dia-circulo");

        const numero = document.createElement("span");
        numero.classList.add("dia-numero");
        numero.textContent = d;

        const fechaObj = new Date(anio, mes, d);
        const fechaStr = fechaObj.toDateString();
        if (diasConRacha.includes(fechaStr)) {
            circulo.classList.add("dia-circulo-activo");
        }

        dia.appendChild(circulo);
        dia.appendChild(numero);

        grid.appendChild(dia);
    }
}

document.getElementById("calendario").addEventListener("click", () => {
    const panel = document.getElementById("calendariopanel");
    rachaepicapanel.classList.remove("visible");
    panel.classList.toggle("visible");
    renderCalendario();
});

document.getElementById("mesAnterior").addEventListener("click", () => {
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    renderCalendario();
});

document.getElementById("mesSiguiente").addEventListener("click", () => {
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    renderCalendario();
});

