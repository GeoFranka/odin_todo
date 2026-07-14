function displayChecklistItem(item){
    const itemDiv = document.createElement('div');
    itemDiv.classList.add("checklist-item");
    
    const doneBtn = document.createElement('button');
    doneBtn.classList.add("icon");
    doneBtn.classList.add(item.done?"checklist-done":"checklist-undone");
    doneBtn.addEventListener('click', ()=>{
        item.done = !item.done;
        doneBtn.classList.toggle("checklist-undone");
        doneBtn.classList.toggle("checklist-done");
    });
    itemDiv.appendChild(doneBtn);

    const nameSpan = document.createElement('span');
    nameSpan.classList.add("checklist-item-name");
    nameSpan.textContent = item.name;
    itemDiv.appendChild(nameSpan);

    return itemDiv;
}

function displayChecklist(todo){

    const checklistWrapper = document.createElement('div');
    checklistWrapper.classList.add("checklist-wrapper");
    const checklistDiv = document.createElement('div');
    checklistDiv.classList.add("checklist");
    checklistWrapper.appendChild(checklistDiv);

    todo.checklist.forEach(item=>{
        checklistDiv.appendChild(displayChecklistItem(item));
    });

    const checklistAddButton = document.createElement('button');
    checklistAddButton.classList.add("icon", "checklist-add");
    checklistAddButton.setAttribute("title", "Add a checklist item");
    checklistAddButton.addEventListener('click', ()=>{
        checklistItemForm(todo, checklistDiv);
    });
    checklistWrapper.appendChild(checklistAddButton);

    return checklistWrapper;

}

function checklistItemForm(todo, checklistDiv){

    const itemForm = document.createElement('form');
    itemForm.classList.add("checklist-item");
    const doneBtn = document.createElement('button');
    doneBtn.classList.add("icon", "checklist-undone");
    itemForm.appendChild(doneBtn);
    const nameInput = document.createElement('input');
    nameInput.classList.add("checklist-item-name");
    nameInput.setAttribute("placeholder", "name it");
    itemForm.appendChild(nameInput);
    const saveBtn = document.createElement('button');
    saveBtn.classList.add("icon", "save");
    saveBtn.addEventListener('click', () => {
        const newItem = todo.addChecklistItem(nameInput.value);
        itemForm.remove();
        checklistDiv.appendChild(displayChecklistItem(newItem));
        todo.project.saveToLocalStorage();
    });
    itemForm.appendChild(saveBtn);
    checklistDiv.appendChild(itemForm);

    nameInput.focus();

}

export {displayChecklist, checklistItemForm};