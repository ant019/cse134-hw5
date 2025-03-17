class ProjectCard extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'description', 'link', 'image', 'iframe', 'alt'];
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.card = document.createElement('div');
        this.card.classList.add('card');

        this.titleElement = document.createElement('h2');
        this.card.appendChild(this.titleElement);

        this.mediaContainer = document.createElement('div');
        this.mediaContainer.classList.add('media-container');
        this.card.appendChild(this.mediaContainer);

        this.descriptionElement = document.createElement('p');
        this.card.appendChild(this.descriptionElement);

        this.linkElement = document.createElement('a');
        this.linkElement.textContent = 'Read more';
        this.card.appendChild(this.linkElement);

        const style = document.createElement('style');
        style.textContent = `
            .card {
                display: flex;
                flex-direction: column;
                border: 1px solid var(--secondary-color);
                border-radius: 0.25rem;
                padding: 1rem;
                background-color: var(--sidebar-color);
                color: var(--text-color);
                margin: 1rem;
            }
            .card img, .card iframe {
                max-width: 100%;
                height: auto;
                border-radius: 0.25rem;
            }
            .card h2 {
                font-size: 1.5rem;
                margin: 0.5rem 0;
            }
            .card p {
                font-size: 1rem;
                margin: 0.5rem 0;
            }
            .card a {
                color: var(--primary-color);
                text-decoration: none;
                margin-top: 0.5rem;
            }
        `;
        this.shadow.appendChild(style);
        this.shadow.appendChild(this.card);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'title') this.titleElement.textContent = newValue || 'Untitled Project';
        if (name === 'description') this.descriptionElement.textContent = newValue || 'No description provided';
        if (name === 'link') this.linkElement.href = newValue || '#';

        if (name === 'image' || name === 'iframe') {
            this.mediaContainer.innerHTML = ''; 
            if (name === 'image') {
                const img = document.createElement('img');
                img.src = newValue;
                img.alt = this.getAttribute('alt') || 'Project Image';
                this.mediaContainer.appendChild(img);
            } else if (name === 'iframe') {
                const iframe = document.createElement('iframe');
                iframe.src = newValue;
                iframe.width = "100%";
                iframe.height = "300px";
                this.mediaContainer.appendChild(iframe);
            }
        }
    }
}

customElements.define('project-card', ProjectCard);
