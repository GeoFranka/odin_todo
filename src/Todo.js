class Todo {

    id;
    project;
    title; 
    description; 
    priority;
    dueDate; 
    doneDate;

    static priorityAsText = {
        1: "high priority",
        2: "medium priority",
        3: "low priority"
    };

    constructor(title, description, dueDate, priority, id, doneDate, project){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority || 2;
        if(id){
            this.id = id;
        } else {
            this.id = crypto.randomUUID();
        }
        this.doneDate = doneDate;
        this.project = project;
    }

    get priorityAsText(){
        return Todo.priorityAsText[this.priority];
    }

    get done(){
        return this.doneDate != null;
    }

    markDone(){
        this.doneDate = new Date();
        this.project.saveToLocalStorage();
    }

    markUndone(){
        this.doneDate = null;
        this.project.saveToLocalStorage();
    }

    delete(){
        this.project.deleteTodo(this.id);
        this.project.saveToLocalStorage();
    }

}

export default Todo;