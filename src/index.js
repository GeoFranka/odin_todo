import '../node_modules/modern-normalize/modern-normalize.css';
import "./style.css";
import Project from "./Project.js";
import displaySidebar from './displaySidebar.js';
import { storageAvailable, getProjectsFromLocalStorage, getSelectedProject, saveSelectedProject } from './localStorage.js';

let projects = [];
let selectedProjectId;

function createDefaultProject(){

    const myDefaultProject = new Project("My To Dos", "");
    projects.push(myDefaultProject);
    myDefaultProject.saveToLocalStorage();

}

function init(){
    
    if(storageAvailable("localStorage") && getProjectsFromLocalStorage()){

        projects = getProjectsFromLocalStorage();
        selectedProjectId = getSelectedProject();

    } else {

        createDefaultProject();

    }

}

init();

displaySidebar(projects, selectedProjectId || projects[0].id);
