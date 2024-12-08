class GamePostComponent extends HTMLElement {
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

                .baseIcon {
                    font-size: 2em;
                    line-height: 1;
                    vertical-align: baseline;
                }

                sub.baseIcon,
                sup.baseIcon {
                    margin: 0; /* Remove extra space that might cause layout issues */
                    padding: 0;
                    line-height: 1;
                    display: inline-block; /* Ensures proper alignment */
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    font-size: 2em;
                }

                /* Adjust the positioning offsets */
                sub.gamePostLeftBase {
                    transform: translateX(0.75em) translateY(0.2em);
                }

                sup.gamePostCenterBase {
                    transform: translateX(0em) translateY(-0.2em);
                }

                sub.gamePostRightBase {
                    transform: translateX(-0.75em) translateY(0.2em);
                }
                    
                @-moz-document url-prefix(){
                    sub.gamePostLeftBase {
                        transform: translateX(0.5em) translateY(0.2em);
                    }

                    sup.gamePostCenterBase {
                        transform: translateX(0em) translateY(-0.2em);
                    }

                    sub.gamePostRightBase {
                        transform: translateX(-0.5em) translateY(0.2em);
                    }
                }
            </style>

            <div class="post">
                <span class="username">
                    <span class="pe-4" id="inning"></span>
                    <span class="pe-4" id="away-team"></span>
                    <span class="pe-4" id="home-team"></span>
                </span> 
                <span class="timestamp" id="timestamp"></span>
                <p id="log"></p>
                <span>
                    <sub class="baseIcon font-monospace gamePostLeftBase" id="base-icon-0"></sub>
                    <sup class="baseIcon font-monospace gamePostCenterBase" id="base-icon-1"></sup>
                    <sub class="baseIcon font-monospace gamePostRightBase" id="base-icon-2"></sub>
                </span>
                <span class="font-monospace">
                    B: <span id="balls"></span> S: <span id="strikes"></span> O: <span id="outs"></span>
                </span>
            </div>
        `.trim();

        // Attach the template content to the shadow root
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.render();

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

    static removeSvg(inputString) {
        return inputString.replace(/<svg[\s\S]*?<\/svg>/gi, '');
    }

    render() {
        const gameMessage = JSON.parse(this.getAttribute('game-message'));
        const timestamp = new Date().toLocaleTimeString();

        this.shadowRoot.getElementById('inning').textContent = gameMessage.inning;
        this.shadowRoot.getElementById('away-team').innerHTML = `${GamePostComponent.removeSvg(gameMessage.awayTeam)}: ${gameMessage.score.away}`;
        this.shadowRoot.getElementById('home-team').innerHTML = `${GamePostComponent.removeSvg(gameMessage.homeTeam)}: ${gameMessage.score.home}`;
        this.shadowRoot.getElementById('timestamp').textContent = timestamp;
        this.shadowRoot.getElementById('log').innerHTML = GamePostComponent.removeSvg(gameMessage.log);

        const baseIcons = gameMessage.baseIcons;
        this.shadowRoot.getElementById('base-icon-0').textContent = baseIcons.charAt(0);
        this.shadowRoot.getElementById('base-icon-1').textContent = baseIcons.charAt(1);
        this.shadowRoot.getElementById('base-icon-2').textContent = baseIcons.charAt(2);

        this.shadowRoot.getElementById('balls').textContent = gameMessage.count.balls;
        this.shadowRoot.getElementById('strikes').textContent = gameMessage.count.strikes;
        this.shadowRoot.getElementById('outs').textContent = gameMessage.count.outs;
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
customElements.define('game-post', GamePostComponent);
