document.getElementById('project-form').addEventListener('submit', saveProject);
document.getElementById('load-local').addEventListener('click', loadLocalProjects);
document.getElementById('load-remote').addEventListener('click', loadRemoteProjects);

function saveProject(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const link = document.getElementById('link').value;
    const image = document.getElementById('image').value;
    const iframe = document.getElementById('iframe').value;
    const alt = document.getElementById('alt').value;
    
    const project = { title, description, link, image, iframe, alt };
    
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    const existingProjectIndex = projects.findIndex(p => p.title === title);
    
    if (existingProjectIndex !== -1) {
        projects[existingProjectIndex] = project;
    } else {
        projects.push(project);
    }
    
    localStorage.setItem('projects', JSON.stringify(projects));
    displayProjects(projects);
}

function loadLocalProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    displayProjects(projects);
}

function loadRemoteProjects() {
    fetch('https://api.jsonbin.io/v3/b/67d7a7068a456b7966774467/latest', {
        headers: {
            'X-Master-Key': '$2a$10$ABfB9P0BD28Hr9AqYVy3xOOUH7/nJOVOv4D9B9IeOIs53Wb1Bp0c2'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayProjects(data.record); 
    })
    .catch(error => console.error('Error fetching remote projects:', error));
}

function displayProjects(projects) {
    const container = document.getElementById('project-list');
    container.innerHTML = '';

    projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.classList.add('project-item');
        
        const title = document.createElement('h3');
        title.textContent = project.title;
        projectItem.appendChild(title);
        
        const description = document.createElement('p');
        description.textContent = project.description;
        projectItem.appendChild(description);
        
        const link = document.createElement('a');
        link.href = project.link;
        link.textContent = 'Read more';
        projectItem.appendChild(link);
        
        if (project.image) {
            const img = document.createElement('img');
            img.src = project.image;
            img.alt = project.alt;
            projectItem.appendChild(img);
        } else if (project.iframe) {
            const iframe = document.createElement('iframe');
            iframe.src = project.iframe;
            iframe.width = "100%";
            iframe.height = "300px";
            iframe.setAttribute('frameborder', '0');
            projectItem.appendChild(iframe);
        }
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteProject(index));
        projectItem.appendChild(deleteButton);
        
        container.appendChild(projectItem);
    });
}

function deleteProject(index) {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
    displayProjects(projects);
}