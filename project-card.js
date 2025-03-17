class ProjectCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h2');
        title.textContent = this.getAttribute('title');
        card.appendChild(title);

        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('media-container');
        if (this.hasAttribute('iframe')) {
            const iframe = document.createElement('iframe');
            iframe.src = this.getAttribute('iframe');
            iframe.width = "100%";
            iframe.height = "300px";
            iframe.setAttribute('frameborder', '0');
            mediaContainer.appendChild(iframe);
        } else if (this.hasAttribute('image')) {
            const picture = document.createElement('picture');
            const img = document.createElement('img');
            img.src = this.getAttribute('image');
            img.alt = this.getAttribute('alt');
            picture.appendChild(img);
            mediaContainer.appendChild(picture);
        }
        card.appendChild(mediaContainer);

        const description = document.createElement('p');
        description.textContent = this.getAttribute('description');
        card.appendChild(description);

        const link = document.createElement('a');
        link.href = this.getAttribute('link');
        link.textContent = 'Read more';
        card.appendChild(link);

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
        shadow.appendChild(style);
        shadow.appendChild(card);
    }
}

customElements.define('project-card', ProjectCard);