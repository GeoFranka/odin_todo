import '../node_modules/modern-normalize/modern-normalize.css';
import "./style.css";
import Project from "./Project.js";
import domManagerProjects from './displayProjects.js';
import displayProject from './displayProject.js';

const projects = [];
let defaultProjectId;

function init(){
    const myDefaultProject = new Project("My To Dos", "just the default project");
    defaultProjectId = myDefaultProject.id;
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    myDefaultProject.addTodo("do the dishes", "just do it, ok", tomorrow);
    projects.push(myDefaultProject);

    const newDummyProject = new Project("Trip to Switzerland", "We're going there in August!");
    projects.push(newDummyProject);
}

init();

const domManager = domManagerProjects(projects);
domManager.displayProjects();

domManager.toggleActiveProject(defaultProjectId);
displayProject(defaultProjectId, projects);
