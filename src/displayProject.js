export default function displayProject(id, projectArray){

    const project = projectArray.find(pr=>{
        return pr.id == id;
    });

    const projectDiv = document.querySelector("#main .project");
    projectDiv.textContent = "";

    const title = document.createElement("h1");
    title.classList.add("project-title");
    title.textContent = project.title;
    projectDiv.appendChild(title);

    const description = document.createElement("p");
    description.classList.add("project-descr");
    description.textContent = project.description;
    projectDiv.appendChild(description);

};