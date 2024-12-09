class SocialPostComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create a template for the component
        const template = document.createElement('template');

        // Define the HTML structure and include the styles
        template.innerHTML = `
            <style>
                /* Encapsulated styles */
                html,
                body {
                    margin-top: 0;
                    font-family: "Roboto Condensed", sans-serif;
                    font-optical-sizing: auto;
                    font-weight: 400;
                    font-style: normal;
                }

                a,
                a:visited {
                color: white; /* Set both regular and visited links to white */
                }

                .font-monospace {
                    font-family: monospace, monospace;
                }
                
                .post {
                    border-radius: 8px;
                    padding: 10px;
                    margin: 10px 0;
                    background-color: #121214;
                    color: hsl(228, 5%, 80%);
                }

                .username {
                    font-weight: bold;
                }

                .timestamp {
                    color: #657786;
                    font-size: 12px;
                }

                
            </style>

            <div class="post">
                <span class="username" id="username"></span> 
                <span class="timestamp" id="timestamp"></span>
                <p id="log"></p>
            </div>
        `.trim();

        // Attach the template content to the shadow root
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
        //console.log(64)
        //const modalTrigger = this.shadowRoot.getElementById('open-modal');

        // Select all anchor tags within the shadow DOM
        const anchorElements = this.shadowRoot.querySelectorAll('a');

        // Loop through each anchor and attach a click event listener
        anchorElements.forEach(anchor => {
            anchor.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the default action if necessary
                this.showStatsModal();
            });
        });
    }

    render() {
        const message = JSON.parse(this.getAttribute('message'));
        //console.log(message)
        const timestamp = new Date().toLocaleTimeString();

        this.shadowRoot.getElementById('timestamp').textContent = timestamp;
        this.shadowRoot.getElementById('username').innerHTML = message.username;
        this.shadowRoot.getElementById('log').innerHTML = message.log;
        // if (Object.hasOwn(message, 'bgcolor')) {
        //     this.shadowRoot.getElementById('log').style.backgroundColor = message.bgcolor;
        // }

    }

    showStatsModal() {
        const modalElement = document.getElementById('statsModal');
        if (modalElement) {
            const statsModal = new bootstrap.Modal(modalElement);
            statsModal.show();
        } else {
            console.error('Modal element with ID "statsModal" not found');
        }
    }
}

// Define the custom element
customElements.define('social-post', SocialPostComponent);
