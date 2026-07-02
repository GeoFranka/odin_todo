import { formatRelative } from "date-fns";
import createTodo from "./Todo.js";

const priorityAsText = {
    1: "high priority",
    2: "medium priority",
    3: "low priority"
};

function toggleDetail(e){
    const btn = e.target;
    btn.classList.toggle("expand");
    btn.classList.toggle("collapse");
    const detailDiv = btn.parentElement.parentElement.querySelector(".todo-detail");
    detailDiv.classList.toggle("collapsed");
}

function todoForm(todoList){
    const todoForm = document.createElement('form');
    todoForm.classList.add("todo");

    const mainDiv = document.createElement('div');
    mainDiv.classList.add("todo-main");
    todoForm.appendChild(mainDiv);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add("icon", "undone");
    doneBtn.setAttribute("type", "button");
    mainDiv.appendChild(doneBtn);

    const titleInput = document.createElement('input');
    titleInput.classList.add("todo-title");
    titleInput.setAttribute("name", "todo-title");
    titleInput.setAttribute("id", "todo-title");
    titleInput.setAttribute("placeholder", "What should be done?");
    mainDiv.appendChild(titleInput);

    const dueDateInput = document.createElement('input');
    dueDateInput.classList.add("due-date");
    dueDateInput.setAttribute("type", "date");
    dueDateInput.setAttribute("name", "due-date");
    dueDateInput.setAttribute("id", "due-date");
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowAsString = tomorrow.toISOString().split("T")[0];
    dueDateInput.value = tomorrowAsString;
    mainDiv.appendChild(dueDateInput);

    const detailDiv = document.createElement('div');
    detailDiv.classList.add("todo-detail");
    todoForm.appendChild(detailDiv);

    const descrInput = document.createElement('input');
    descrInput.classList.add("todo-descr");
    descrInput.setAttribute("name", "todo-descr");
    descrInput.setAttribute("id", "todo-descr");
    descrInput.setAttribute("placeholder", "Explain further.");
    detailDiv.appendChild(descrInput);

    const prioDropdown = document.createElement('select');
    prioDropdown.classList.add("priority");
    prioDropdown.setAttribute("name", "priority");
    prioDropdown.setAttribute("id", "priority");
    for (const [key, value] of Object.entries(priorityAsText)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = value;
        if(key==2){
            option.setAttribute("selected", "");
        }
        prioDropdown.appendChild(option);
    }
    detailDiv.appendChild(prioDropdown);

    detailDiv.appendChild(document.createElement('div'));

    const saveBtn = document.createElement('button');
    saveBtn.classList.add("icon", "save");
    saveBtn.setAttribute("type", "button");
    saveBtn.addEventListener('click', () => {
        const newTodo = createTodo(titleInput.value, descrInput.value, dueDateInput.value, prioDropdown.value);
        todoList.push(newTodo);
        todoForm.remove();
        const todoDiv = displayTodo(newTodo);
        document.querySelector(".todos").appendChild(todoDiv);
    });
    detailDiv.appendChild(saveBtn);

    return todoForm;
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

    const descrDiv = document.createElement('div');
    descrDiv.classList.add("todo-descr");
    descrDiv.textContent = todo.description;
    detailDiv.appendChild(descrDiv);

    const prioDiv = document.createElement('div');
    prioDiv.classList.add("priority");
    prioDiv.textContent = todo.getPriority();
    detailDiv.appendChild(prioDiv);

    return todoDiv;

};

export { todoForm };