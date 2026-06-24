function getProjectBtns(){
    return document.getElementsByClassName("project-btn");
}

function displayProject(e){
    const myBtn = e.target;
    const projectBtns = getProjectBtns();
    for(let i=0; i<projectBtns.length; i++){
        projectBtns[i].classList.remove("active");
    }
    myBtn.classList.add("active");
    console.log(myBtn.dataset.id);
}

export default function displayProjects(projectsArray){

    const projectsDiv = document.querySelector(".projects");

    projectsArray.forEach(project => {
        const btn = document.createElement("button");
        btn.classList.add("project-btn");
        btn.textContent = project.title;
        btn.dataset.id = project.id;
        projectsDiv.appendChild(btn);
    });

    const projectBtns = getProjectBtns();

    for(let i=0; i<projectBtns.length; i++){
        projectBtns[i].addEventListener("click", displayProject);
    }

}
