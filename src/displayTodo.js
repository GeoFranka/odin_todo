import { formatRelative, formatISO } from "date-fns";
import Todo from "./Todo.js";
import createInput from "./inputFactory.js";
import { displayChecklist, checklistItemForm } from "./displayChecklist.js";
import displayProject from "./displayProject.js";

function toggleDetail(e){
    const btn = e.target;
    btn.classList.toggle("expand");
    btn.classList.toggle("collapse");
    const detailDiv = btn.parentElement.parentElement.querySelector(".todo-detail");
    detailDiv.classList.toggle("collapsed");
}

function showDoneDate(todo, div){
    if(todo.done){
        const relativeDoneDate = formatRelative(todo.doneDate, new Date());
        div.textContent = "Done: " + relativeDoneDate.split(" at ")[0];
    } else {
        div.textContent = "";
    }
}

function todoForm(project){
    const todoForm = document.createElement('form');
    todoForm.classList.add("todo");

    const mainDiv = document.createElement('div');
    mainDiv.classList.add("todo-main");
    todoForm.appendChild(mainDiv);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add("icon", "undone");
    doneBtn.setAttribute("type", "button");
    mainDiv.appendChild(doneBtn);

    const titleInput = createInput("text", "todo-title", "todo-title", "What should be done?");
    mainDiv.appendChild(titleInput);

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowAsString = formatISO(tomorrow, {representation: 'date'});
    const dueDateInput = createInput("date", "due-date", "due-date", "", tomorrowAsString);
    mainDiv.appendChild(dueDateInput);

    const detailDiv = document.createElement('div');
    detailDiv.classList.add("todo-detail");
    todoForm.appendChild(detailDiv);

    const descrInput = createInput("text", "todo-descr", "todo-descr", "Explain further.");
    detailDiv.appendChild(descrInput);

    const prioDropdown = document.createElement('select');
    prioDropdown.classList.add("priority");
    prioDropdown.setAttribute("name", "priority");
    prioDropdown.setAttribute("id", "priority");
    Object.entries(Todo.priorityAsText).forEach(([key, value]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = value;
        if(key==='2'){
            option.setAttribute("selected", "");
        }
        prioDropdown.appendChild(option);
    });

    detailDiv.appendChild(prioDropdown);

    detailDiv.appendChild(document.createElement('div'));

    const saveBtn = document.createElement('button');
    saveBtn.classList.add("icon", "save");
    saveBtn.setAttribute("type", "button");
    saveBtn.addEventListener('click', () => {
        const newTodo = project.addTodo({
            title: titleInput.value, 
            description: descrInput.value, 
            dueDate: dueDateInput.valueAsDate, 
            priority: prioDropdown.value});
        project.saveToLocalStorage();
        displayProject(project);
    });
    detailDiv.appendChild(saveBtn);

    return todoForm;
}

export default function displayTodo(todo, collapsed = true){

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const mainDiv = document.createElement('div');
    mainDiv.classList.add("todo-main");
    let prioClass = "";
    if(todo.done){
        prioClass = "done";
    } else {
        switch(todo.priority){
            case '1': {
                prioClass = "high-prio";
                break;
            }
            case '2': {
                prioClass = "medium-prio";
                break;
            }
            default: {
                prioClass = "low-prio";
            }
        }
    }
    mainDiv.classList.add(prioClass);
    todoDiv.appendChild(mainDiv);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add("icon");
    doneBtn.classList.add(todo.done?"done":todo.checklistPartlyCompleted?"partly-done":"undone");
    doneBtn.addEventListener('click', e => {
        if(todo.done){
            todo.markUndone();
        } else {
            todo.markDone();
        }
        displayProject(todo.project);
    });
    mainDiv.appendChild(doneBtn);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add("todo-title");
    titleDiv.classList.add(todo.done?"done":"undone");
    titleDiv.textContent = todo.title;
    mainDiv.appendChild(titleDiv);

    const dueDateDiv = document.createElement('div');
    dueDateDiv.classList.add("due-date");
    dueDateDiv.classList.add(todo.done?"done":"undone");
    const relativeDueDate = formatRelative(todo.dueDate, new Date());
    dueDateDiv.textContent = relativeDueDate.split(" at ")[0];
    mainDiv.appendChild(dueDateDiv);

    const expandBtn = document.createElement('button');
    expandBtn.classList.add("icon", collapsed?"expand":"collapse");
    expandBtn.addEventListener('click', toggleDetail);
    mainDiv.appendChild(expandBtn);

    const detailDiv = document.createElement('div');
    detailDiv.classList.add("todo-detail");
    if(collapsed){
        detailDiv.classList.add("collapsed");
    }
    todoDiv.appendChild(detailDiv);

    const descrDiv = document.createElement('div');
    descrDiv.classList.add("todo-descr");
    descrDiv.textContent = todo.description;
    detailDiv.appendChild(descrDiv);

    const prioDiv = document.createElement('div');
    prioDiv.classList.add("priority");
    prioDiv.textContent = todo.priorityAsText;
    detailDiv.appendChild(prioDiv);

    detailDiv.appendChild(displayChecklist(todo));
    detailDiv.appendChild(document.createElement('div'));   // placeholder

    const doneDateDiv = document.createElement('div');
    doneDateDiv.classList.add("done-date");
    if(todo.done){
        showDoneDate(todo, doneDateDiv);
    }
    detailDiv.appendChild(doneDateDiv);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add("icon", "delete");
    deleteBtn.setAttribute("title", "Delete this to do");
    deleteBtn.addEventListener('click', () => {
        todo.delete();
        todoDiv.remove();
    });
    detailDiv.appendChild(deleteBtn);

    return todoDiv;

};

export { todoForm };