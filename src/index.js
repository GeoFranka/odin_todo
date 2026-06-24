import '../node_modules/modern-normalize/modern-normalize.css';
import "./style.css";
import Project from './Project.js';
import displayProjects from './displayProjects.js';

let projects = [];

const myDefaultProject = new Project("My To Dos", "just the default project");
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
myDefaultProject.addTodo("do the dishes", "just do it, ok", tomorrow);
projects.push(myDefaultProject);

displayProjects(projects);

console.log(projects);
