import Todo from "./Todo.js";
import { saveProjectToLocalStorage } from "./localStorage.js";

export default class Project {

    id;
    title;
    description;
    todoList = [];

    constructor(title, description, id){
        this.title = title;
        this.description = description;
        if(id){
            this.id = id;
        } else {
            this.id = crypto.randomUUID();
        }
    }

    get todos(){
        return this.todoList;
    }

    addTodo(title, description, dueDate, priority, id, doneDate, checklist){
        const newTodo = new Todo(title, description, dueDate, priority, id, doneDate, checklist || [], this);
        this.todoList.push(newTodo);
        return newTodo;
    }

    deleteTodo(id){
        const todoIndex = this.todoList.findIndex(t => {
            return t.id == id;
        });
        if(todoIndex>-1){
            this.todoList.splice(todoIndex, 1);
        }
    }

    saveToLocalStorage(){
        saveProjectToLocalStorage(this);
    }

}
