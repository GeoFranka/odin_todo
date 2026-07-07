import { getProjectsFromLocalStorage } from "./localStorage.js";

class Todo {

    id = crypto.randomUUID();
    projectId;
    title; 
    description; 
    #priority;
    dueDate; 
    doneDate;

    static priorityAsText = {
        1: "high priority",
        2: "medium priority",
        3: "low priority"
    };

    constructor(title, description, dueDate, priority, project){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.#priority = priority || 2;
        this.projectId = project.id;
    }

    get priority(){
        return Todo.priorityAsText[this.#priority];
    }

    get done(){
        return this.doneDate != null;
    }

    markDone(){
        this.doneDate = new Date();
    }

    markUndone(){
        this.doneDate = null;
    }

    delete(){
        let projects = getProjectsFromLocalStorage();
        const myProject = projects.find(p=>{return p.id==this.projectId;});
        myProject.deleteTodo(this.id);
    }

}

export default Todo;