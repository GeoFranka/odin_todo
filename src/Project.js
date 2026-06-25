import createTodo from "./Todo.js";

export default class Project {

    title;
    id = crypto.randomUUID();
    description;
    todoList = [];

    constructor(title, description){
        this.title = title;
        this.description = description;
    }

    get todos(){
        return this.todoList;
    }

    get title(){
        return this.title;
    }

    get id(){
        return this.id;
    }

    get description(){
        return this.description;
    }

    addTodo(title, description, dueDate, priority){
        this.todoList.push(createTodo(title, description, dueDate, priority));
        console.log(this.todoList);
    }

}
