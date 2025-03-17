document.getElementById('load-local').addEventListener('click', loadLocalProjects);
document.getElementById('load-remote').addEventListener('click', loadRemoteProjects);

function loadLocalProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    displayProjects(projects);
}

function loadRemoteProjects() {
    fetch('https://my-json-server.typicode.com/ant019/cse134-hw5/db.json')
        .then(response => response.json())
        .then(data => {
            displayProjects(data); // Ensure the correct path to the projects array
        })
        .catch(error => console.error('Error fetching remote projects:', error));
}

function displayProjects(projects) {
    const container = document.getElementById('project-cards-container');
    container.innerHTML = '';

    projects.forEach(project => {
        const projectCard = document.createElement('project-card');
        projectCard.setAttribute('title', project.title);
        projectCard.setAttribute('description', project.description);
        projectCard.setAttribute('link', project.link);

        if (project.image) {
            projectCard.setAttribute('image', project.image);
            projectCard.setAttribute('alt', project.alt);
        } else if (project.iframe) {
            projectCard.setAttribute('iframe', project.iframe);
            projectCard.setAttribute('alt', project.alt);
        }

        container.appendChild(projectCard);
    });
}