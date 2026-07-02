function createTodo(title, description, dueDate, priority) {

    if(priority==null){
        priority = 2;
    }

    const priorityAsText = {
        1: "high priority",
        2: "medium priority",
        3: "low priority"
    };

    let doneDate = null;

    function setAsDone(){
        doneDate = new Date();
    }

    function setAsUndone(){
        doneDate = null;
    }

    function isDone(){
        return doneDate != null;
    }

    function getPriority(){
        return priorityAsText[priority];
    }

    return {
        title,
        description,
        dueDate,
        getPriority,
        isDone,
        setAsDone,
        setAsUndone,
    }

}

export default createTodo;