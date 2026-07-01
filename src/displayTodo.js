import { formatRelative } from "date-fns";

function toggleDetail(e){
    const btn = e.target;
    btn.classList.toggle("expand");
    btn.classList.toggle("collapse");
    const detailDiv = btn.parentElement.parentElement.querySelector(".todo-detail");
    detailDiv.classList.toggle("collapsed");
}

export default function displayTodo(todo){

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const mainDiv = document.createElement('div');
    mainDiv.classList.add("todo-main");
    todoDiv.appendChild(mainDiv);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add("icon");
    doneBtn.classList.add(todo.isDone()?"done":"undone");
    doneBtn.addEventListener('click', e => {
        if(todo.isDone()){
            todo.setAsUndone();
        } else {
            todo.setAsDone();
        }
        [doneBtn, titleDiv, dueDateDiv].forEach(element => {
            element.classList.toggle("undone");
            element.classList.toggle("done");
        });
    });
    mainDiv.appendChild(doneBtn);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add("todo-title");
    titleDiv.classList.add(todo.isDone()?"done":"undone");
    titleDiv.textContent = todo.title;
    mainDiv.appendChild(titleDiv);

    const dueDateDiv = document.createElement('div');
    dueDateDiv.classList.add("due-date");
    dueDateDiv.classList.add(todo.isDone()?"done":"undone");
    const relativeDueDate = formatRelative(todo.dueDate, new Date());
    dueDateDiv.textContent = relativeDueDate.split(" at ")[0];
    mainDiv.appendChild(dueDateDiv);

    const expandBtn = document.createElement('button');
    expandBtn.classList.add("icon", "expand");
    expandBtn.addEventListener('click', toggleDetail);
    mainDiv.appendChild(expandBtn);

    const detailDiv = document.createElement('div');
    detailDiv.classList.add("todo-detail", "collapsed");
    todoDiv.appendChild(detailDiv);

    // placeholder div:
    detailDiv.appendChild(document.createElement('div'));

    const descrDiv = document.createElement('div');
    descrDiv.classList.add("todo-title");
    descrDiv.textContent = todo.description;
    detailDiv.appendChild(descrDiv);

    const prioDiv = document.createElement('div');
    prioDiv.classList.add("priority");
    prioDiv.textContent = todo.priority;
    detailDiv.appendChild(prioDiv);

    return todoDiv;

};