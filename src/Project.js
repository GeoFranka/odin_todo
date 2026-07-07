import Todo from "./Todo.js";
import { saveProjectToLocalStorage } from "./localStorage.js";

export default class Project {

    title;
    id = crypto.randomUUID();
    description;
    todoList = [];

    constructor(title, description){
        this.title = title;
        this.description = description;
        saveProjectToLocalStorage(this);
    }

    get todos(){
        return this.todoList;
    }

    addTodo(title, description, dueDate, priority){
        this.todoList.push(new Todo(title, description, dueDate, priority, this));
        saveProjectToLocalStorage(this);
    }

    deleteTodo(id){
        const todoIndex = this.todoList.findIndex(t => {
            return t.id == id;
        });
        if(todoIndex>-1){
            this.todoList.splice(todoIndex, 1);
        }
        saveProjectToLocalStorage(this);
    }

}
