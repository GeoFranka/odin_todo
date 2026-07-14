import Project from "./Project.js";
import displayTodo from "./displayTodo.js";
import { todoForm } from "./displayTodo.js";
import displaySidebar from "./displaySidebar.js";
import createInput from "./inputFactory.js";

function projectForm(projectList){
    const projectDiv = document.querySelector("#main .project");
    projectDiv.textContent = "";

    const projForm = document.createElement('form');
    projForm.classList.add("project-form");
    projectDiv.appendChild(projForm);

    const titleInput = createInput("text", "project-title", "project-title", "Name of your new project");
    projForm.appendChild(titleInput);

    const descriptionInput = createInput("text", "project-descr", "project-descr", "Description of your project");
    projForm.appendChild(descriptionInput);

    const saveBtn = document.createElement('button');
    saveBtn.classList.add("icon", "save");
    saveBtn.setAttribute("type", "button");
    saveBtn.addEventListener('click', () => {
        const newProject = new Project(titleInput.value, descriptionInput.value);
        projectList.push(newProject);
        newProject.saveToLocalStorage();
        displaySidebar(projectList, newProject.id);
    });
    projForm.appendChild(saveBtn);

}

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
        todoDiv.appendChild(todoForm(project));
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

export { projectForm };