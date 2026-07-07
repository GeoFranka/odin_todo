const ls = window.localStorage;

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function getProjectsFromLocalStorage() {

    if(ls.getItem("projects") && ls.getItem("projects").length>0){
        const projectsString = ls.getItem("projects");
        return JSON.parse(projectsString);
    }

    return false;

}

function saveProjectToLocalStorage(project){

    let projects = [];

    if(getProjectsFromLocalStorage()){
        projects = getProjectsFromLocalStorage();
    }

    if(projects.find(p=>{return p.id == project.id;})){
        let projectIndex = projects.findIndex(p=>{
            return p.id == project.id;
        });
        projects[projectIndex] = project;
    } else {
        projects.push(project);
    }

    ls.setItem("projects", JSON.stringify(projects));

}

export {
    storageAvailable,
    getProjectsFromLocalStorage,
    saveProjectToLocalStorage,
}