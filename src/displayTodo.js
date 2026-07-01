export default function displayTodo(todo){

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const doneBtn = document.createElement('button');
    doneBtn.classList.add("icon");
    doneBtn.classList.add(todo.isDone()?"done":"undone");
    doneBtn.addEventListener('click', e => {
        if(todo.isDone()){
            todo.setAsUndone();
        } else {
            todo.setAsDone();
        }
        doneBtn.classList.toggle("undone");
        doneBtn.classList.toggle("done");
        titleDiv.classList.toggle("undone");
        titleDiv.classList.toggle("done");
    });
    todoDiv.appendChild(doneBtn);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add("todo-title");
    titleDiv.classList.add(todo.isDone()?"done":"undone");
    titleDiv.textContent = todo.title;
    todoDiv.appendChild(titleDiv);

    const dueDateDiv = document.createElement('div');
    dueDateDiv.classList.add("due-date");
    dueDateDiv.textContent = todo.dueDate.toDateString();
    todoDiv.appendChild(dueDateDiv);

    const expandBtn = document.createElement('button');
    expandBtn.classList.add("icon", "expand");
    todoDiv.appendChild(expandBtn);

    return todoDiv;

};