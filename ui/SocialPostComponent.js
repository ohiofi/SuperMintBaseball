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

                .divider {
                    height: 1px;
                    background-color: #ed1d61;
                    border:none;
                    margin-right:20px;
                }

                .font-monospace {
                    font-family: monospace, monospace;
                }

                #headline{
                    height: 40px;
                    line-height: 40px;
                    padding: 10px;
                    border-radius: 8px;
                    -webkit-border-radius: 8px 8px 0px 0px;
                    border-radius: 8px 8px 0px 0px; 
                }

                #log{
                    padding: 10px;
                    border-radius: 8px;
                }
                
                .post {
                    border-radius: 8px;
                    /*padding: 10px;*/
                    margin: 10px 0;
                    background-color: #121214;
                    color: hsl(228, 5%, 80%);
                    border-style: solid;
                    border-width: 1px;
                }
                svg{
                    vertical-align: middle;
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
                <div id="headline">
                    <span class="username" id="username"></span> 
                    <span class="timestamp" id="timestamp"></span>
                </div>
                <!--hr class="divider"-->
                <div id="log"></div>
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
        this.shadowRoot.getElementById('username').innerHTML = message.username;
        this.shadowRoot.getElementById('timestamp').textContent = timestamp;
        this.shadowRoot.getElementById('log').innerHTML = message.log;
        if (Object.hasOwn(message, 'colorScheme') && message.colorScheme != null) {
            this.shadowRoot.querySelector('.post').style.color = message.colorScheme.light;
            this.shadowRoot.querySelector('.post').style.borderColor = `${message.colorScheme.dark}`
            this.shadowRoot.querySelector('.post').style.boxShadow = `0px 0px 3px ${message.colorScheme.dark}`
            // this.shadowRoot.querySelector('.divider').style.background = `${message.colorScheme.mid}`
        }

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
