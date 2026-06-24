import '../node_modules/modern-normalize/modern-normalize.css';
import "./style.css";
import Project from './Project.js';

const myDefaultProject = new Project("My To Dos", "just the default project");
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
myDefaultProject.addTodo("do the dishes", "just do it, ok", tomorrow);

console.log(myDefaultProject);
console.log("hello world!");