const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("tasList");

addButton.onclick = addTask;

function addTask() {
  const taskText = taskInput.value;
  if (taskText.trim() === "") return;

  const task = document.createElement("div");
  task.classList.add("elementodelista");

  const boton = document.createElement("div");
  boton.classList.add("boton");

  const cuadro = document.createElement("div");
  cuadro.classList.add("cuadrado");


  const texto = document.createElement("p");
  texto.textContent = taskText;


  cuadro.addEventListener("click", () => {
    cuadro.classList.toggle("completado");
    if (cuadro.classList.contains("completado")) {
      texto.textContent = "tarea completada";
    } else {
      texto.textContent = taskText;
    }
  });

  boton.addEventListener("click", () => {
    task.remove();
  });

  task.appendChild(boton);
  task.appendChild(texto);
  task.appendChild(cuadro);
  taskList.appendChild(task);
  cuadro.style.width = "15px";
  cuadro.style.height = "15px";

  taskInput.value = "";
}