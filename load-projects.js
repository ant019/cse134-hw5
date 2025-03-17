document.getElementById('load-local').addEventListener('click', loadLocalProjects);
document.getElementById('load-remote').addEventListener('click', loadRemoteProjects);

function loadLocalProjects() {
    let projects = JSON.parse(localStorage.getItem('projects'));
    if (!projects) {
        fetch('db.json')
            .then(response => response.json())
            .then(data => {
                projects = data.projects;
                localStorage.setItem('projects', JSON.stringify(projects));
                displayProjects(projects);
            })
            .catch(error => console.error('Error fetching local projects:', error));
    } else {
        displayProjects(projects);
    }
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
    const container = document.getElementById('project-cards-container');
    container.innerHTML = '';

    projects.forEach(project => {
        console.log('Adding project:', project);

        const projectCard = document.createElement('project-card');

        if (project.title) projectCard.setAttribute('title', project.title);
        if (project.description) projectCard.setAttribute('description', project.description);
        if (project.link) projectCard.setAttribute('link', project.link);

        if (project.image) {
            projectCard.setAttribute('image', project.image);
            projectCard.setAttribute('alt', project.alt || 'Project image');
        } else if (project.iframe) {
            projectCard.setAttribute('iframe', project.iframe);
            projectCard.setAttribute('alt', project.alt || 'Project iframe');
        }

        console.log('Created project-card:', projectCard);

        container.appendChild(projectCard);
    });
}