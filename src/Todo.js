import ChecklistItem from "./ChecklistItem.js";

class Todo {

    id;
    project;
    title; 
    description;
    checklist = [];
    priority;
    dueDate; 
    doneDate;

    static priorityAsText = {
        1: "high priority",
        2: "medium priority",
        3: "low priority"
    };

    constructor(title, description, dueDate, priority, id, doneDate, checklist, project){
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
        if(checklist.length>0){
            this.checklist = checklist;
        }
        this.project = project;
    }

    get priorityAsText(){
        return Todo.priorityAsText[this.priority];
    }

    get done(){
        return this.doneDate != null;
    }

    get checklistCompleted(){
        return this.checklist.length==0 || this.checklist.every(item => item.done);
    }

    get checklistPartlyCompleted(){
        return this.checklist.some(item=>item.done) && !(this.checklist.every(item=>item.done));
    }

    get checklistUncompleted(){
        return this.checklist.length==0 || this.checklist.every(item => !item.done);
    }

    set completeChecklist(value){
        this.checklist.forEach(item=>{
            item.done = value;
        });
    }

    addChecklistItem(name, id, done){
        const newItem = new ChecklistItem(name, id, done);
        this.checklist.push(newItem);
        return newItem;
    }

    markDone(){
        this.doneDate = new Date();
        this.completeChecklist = true;
        this.project.sortTodos();
        this.project.saveToLocalStorage();
    }

    markUndone(){
        this.doneDate = null;
        this.project.sortTodos();
        this.project.saveToLocalStorage();
    }

    delete(){
        this.project.deleteTodo(this.id);
        this.project.saveToLocalStorage();
    }

}

export default Todo;