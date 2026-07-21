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
            pr.todoList.forEach(({title, description, dueDate, doneDate, priority, id, checklist})=>{
                project.addTodo({
                    title, description, priority, id,
                    dueDate: parseJSON(dueDate), 
                    doneDate: doneDate ? parseJSON(doneDate) : null,
                    checklist: checklist ? JSON.parse(checklist) : []
                });
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

    if(projects.find(p=>{return p.id === project.id;})){
        let projectIndex = projects.findIndex(p=>{
            return p.id === project.id;
        });
        projects[projectIndex] = project;
    } else {
        projects.push(project);
    }

    ls.setItem("projects", JSON.stringify(projects.map(stringifyProject)));

}

function stringifyProject(project){
    let projectAsObject = {
        id: project.id,
        title: project.title,
        description: project.description,
    };
    projectAsObject.todoList = project.todos.map( todo => {
        return {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            checklist: JSON.stringify(todo.checklist),
            priority: todo.priority,
            dueDate: todo.dueDate.toJSON(),
            doneDate: todo.doneDate ? todo.doneDate.toJSON() : null
        };
    });
    return projectAsObject;
}

function saveSelectedProject(id){
    ls.setItem("selectedProject", id);
}

function getSelectedProject(){
    return ls.getItem("selectedProject");
}

export {
    storageAvailable,
    getProjectsFromLocalStorage,
    saveProjectToLocalStorage,
    saveSelectedProject,
    getSelectedProject,
}