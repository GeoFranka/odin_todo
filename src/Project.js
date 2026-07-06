import Todo from "./Todo.js";

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

    addTodo(title, description, dueDate, priority){
        this.todoList.push(new Todo(title, description, dueDate, priority, this));
    }

    deleteTodo(id){
        const todoIndex = this.todoList.findIndex(t => {
            return t.id == id;
        });
        this.todoList.splice(todoIndex, 1);
    }

}
