function createTodo(title, description, dueDate, priority) {

    if(priority==null){
        priority = 2;
    }

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

    return {
        title,
        description,
        dueDate,
        priority,
        isDone,
        setAsDone,
        setAsUndone,
    }

}

export default createTodo;