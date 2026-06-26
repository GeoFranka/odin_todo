import displayProject from "./displayProject.js";

function displaySidebar(projectsArray, selectedProjectId){

    const projectsDiv = document.querySelector(".projects");
    const projectBtns = document.getElementsByClassName("project-btn");

    projectsArray.forEach(project => {
        const btn = document.createElement("button");
        btn.classList.add("project-btn");
        btn.textContent = project.title;
        btn.dataset.id = project.id;
        btn.addEventListener("click", e => {
            const id = e.target.dataset.id;
            displaySingleProject(id);
        });
        projectsDiv.appendChild(btn);
    });

    displaySingleProject(selectedProjectId);

    function displaySingleProject(id){
        toggleActiveProject(id);
        const project = projectsArray.find(pr=>{
            return pr.id == id;
        });
        displayProject(project);
    }

    function toggleActiveProject(id){
        for(let i=0; i<projectBtns.length; i++){
            const btn = projectBtns[i];
            if(btn.dataset.id === id){
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        }
    }
}

export default displaySidebar;
