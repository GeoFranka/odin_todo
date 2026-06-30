import displayTodo from "./displayTodo.js";

export default function displayProject(project){

    const projectDiv = document.querySelector("#main .project");
    projectDiv.textContent = "";

    const title = document.createElement("h1");
    title.classList.add("project-title");
    title.textContent = project.title;
    projectDiv.appendChild(title);

    const description = document.createElement("p");
    description.classList.add("project-descr");
    description.textContent = project.description;
    projectDiv.appendChild(description);

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todos");
    projectDiv.appendChild(todoDiv);

    project.todos.forEach(todo => {
        todoDiv.appendChild(displayTodo(todo));
    });

};