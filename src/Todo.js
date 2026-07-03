class Todo {

    id = crypto.randomUUID();
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

    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.#priority = priority || 2;
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

}

export default Todo;