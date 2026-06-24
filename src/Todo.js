function createTodo(title, description, dueDate, priority) {

    if(priority==null){
        priority = 2;
    }

    return {
        title,
        description,
        dueDate,
        priority
    }

}

export default createTodo;