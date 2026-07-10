import Project from "./Project.js";
import { parseJSON } from "date-fns";

const ls = window.localStorage;

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function getProjectsFromLocalStorage() {

    if(ls.getItem("projects") && ls.getItem("projects").length>0){
        let projects = [];
        const projectsArray = JSON.parse(ls.getItem("projects"));
        projectsArray.forEach(pr=>{
            const project = new Project(pr.title, pr.description, pr.id);
            pr.todoList.forEach(td=>{
                project.addTodo(td.title, td.description, parseJSON(td.dueDate), td.priority, td.id, td.doneDate ? parseJSON(td.doneDate) : null);
            });
            projects.push(project);
        });
        return projects;
    }

    return false;

}

function saveProjectToLocalStorage(project){

    let projects = [];

    if(getProjectsFromLocalStorage()){
        projects = getProjectsFromLocalStorage();
    }

    if(projects.find(p=>{return p.id == project.id;})){
        let projectIndex = projects.findIndex(p=>{
            return p.id == project.id;
        });
        projects[projectIndex] = project;
    } else {
        projects.push(project);
    }

    let stringifiedProjects = projects.map( pr => {
        return stringifyProject(pr);
    });

    ls.setItem("projects", JSON.stringify(stringifiedProjects));

}

function stringifyProject(project){
    let projectAsObject = {};
    projectAsObject.id = project.id;
    projectAsObject.title = project.title;
    projectAsObject.description = project.description;
    projectAsObject.todoList = project.todos.map( todo => {
        let todoAsObject = {};
        todoAsObject.id = todo.id;
        todoAsObject.title = todo.title;
        todoAsObject.description = todo.description;
        todoAsObject.priority = todo.priority;
        todoAsObject.dueDate = todo.dueDate.toJSON();
        todoAsObject.doneDate = todo.doneDate ? todo.doneDate.toJSON() : null;
        return todoAsObject;
    });
    return projectAsObject;
}


export {
    storageAvailable,
    getProjectsFromLocalStorage,
    saveProjectToLocalStorage,
}