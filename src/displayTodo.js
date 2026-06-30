export default function displayTodo(todo){

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const doneBtn = document.createElement('button');
    doneBtn.classList.add("icon");
    doneBtn.classList.add(todo.isDone()?"done":"undone");
    todoDiv.appendChild(doneBtn);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add("todo-title");
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