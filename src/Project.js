import Todo from "./Todo.js";
import { compareAsc } from "date-fns";
import { saveProjectToLocalStorage } from "./localStorage.js";

export default class Project {
    id;
    title;
    description;
    todoList = [];

    constructor(title, description, id){
        this.title = title;
        this.description = description;
        this.id = id|| crypto.randomUUID();
    }

    get todos(){
        return this.todoList;
    }

    addTodo({title, description, dueDate, priority, id, doneDate, checklist = []}){
        const newTodo = new Todo({
            title, description, dueDate, priority, id, doneDate, checklist, 
            project: this
        });

        this.todoList.push(newTodo);
        this.sortTodos();
        return newTodo;
    }

    deleteTodo(id){
        const todoIndex = this.todoList.findIndex(t => {
            return t.id === id;
        });

        if(todoIndex>-1){
            this.todoList.splice(todoIndex, 1);
        }
    }

    sortTodos(){
        this.todoList.sort((a,b)=>{
            if(a.done && !b.done){
                return 1;
            } else if(!a.done && b.done){
                return -1;
            } else if(a.done && b.done){
                return compareAsc(a.doneDate, b.doneDate);
            } else {
                return compareAsc(a.dueDate, b.dueDate);
            }
        });
    }

    saveToLocalStorage(){
        saveProjectToLocalStorage(this);
    }

}
