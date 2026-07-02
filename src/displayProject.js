import displayTodo from "./displayTodo.js";
import { todoForm } from "./displayTodo.js";

export default function displayProject(project){

    const projectDiv = document.querySelector("#main .project");
    projectDiv.textContent = "";

    const title = document.createElement("h1");
    title.classList.add("project-title");
    title.textContent = project.title;
    projectDiv.appendChild(title);

    const wrapper = document.createElement('div');
    wrapper.classList.add("wrapper");

    const description = document.createElement("p");
    description.classList.add("project-descr");
    description.textContent = project.description;
    wrapper.appendChild(description);

    const addBtn = document.createElement('button');
    addBtn.classList.add("icon", "todo-add");
    addBtn.setAttribute("title", "Add a To Do");
    addBtn.addEventListener('click', () => {
        todoDiv.appendChild(todoForm(project.todos));
    });
    wrapper.appendChild(addBtn);

    projectDiv.appendChild(wrapper);

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todos");
    projectDiv.appendChild(todoDiv);

    project.todos.forEach(todo => {
        todoDiv.appendChild(displayTodo(todo));
    });

};