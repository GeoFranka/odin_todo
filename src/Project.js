import createTodo from "./Todo.js";

export default class Project {

    title;
    description;
    todoList = [];

    constructor(title, description){
        this.title = title;
        this.description = description;
    }

    addTodo(title, description, dueDate, priority){
        this.todoList.push(createTodo(title, description, dueDate, priority));
        console.log(this.todoList);
    }

    getTodos(){
        return this.todoList;
    }

}
