class GameWidgetComponent extends HTMLElement {
    constructor() {
        super();

        // Attach a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Dynamically load the external Bootstrap CSS into the shadow DOM
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
        this.shadowRoot.appendChild(link);

        // Create the template
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
          .game-widget {
            background-color: #000;
            border-radius: 0.5rem;
            color: white;
            display: flex;
            flex-direction: row;
            margin-bottom: 1rem;
          }
          .col-lg {
            flex: 1;
            padding: 1rem;
          }
            /*
          .link {
            cursor: pointer;
            text-decoration: underline;
          }
          .link:hover {
            text-decoration: underline;
          }
          .font-monospace {
            font-family: monospace;
          }
            */
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
                   
                }

                /* Adjust the positioning offsets */
                sub.gameWidgetLeftBase {
                    transform: translateX(0.75em) translateY(0em);
                }

                sup.gameWidgetCenterBase {
                    transform: translateX(0em) translateY(0.37em);
                }

                sub.gameWidgetRightBase {
                    transform: translateX(-0.75em) translateY(0em);
                }
                    
                @-moz-document url-prefix(){
                    sub.gameWidgetLeftBase {
                        transform: translateX(0.5em) translateY(0em);
                    }

                    sup.gameWidgetCenterBase {
                        transform: translateX(0em) translateY(0.36em);
                    }

                    sub.gameWidgetRightBase {
                        transform: translateX(-0.5em) translateY(0em);
                    }
                }
        </style>
        <div class="game-widget shadow rounded-2 row mb-4">
          <!-- Left Section -->
          <div class="col-12 col-lg-4 px-4 pt-4 py-lg-4 text-white">
            <span class="inning"></span>
            <div class="away-line row">
              <div class="away-name col-10 text-start link">Away Team</div>
              <div class="away-score col-2 text-end h3 font-monospace"></div>
            </div>
            <div class="home-line row">
              <div class="home-name col-10 text-start link">Home Team</div>
              <div class="home-score col-2 text-end h3 font-monospace"></div>
            </div>
          </div>
  
          <!-- Center Section -->
          <div class="col-12 col-lg-4 m-0 px-3 py-lg-4 text-white row">
            <div class="base-icons col-3 col-lg-12 m-0 px-0 pt-2 pb-3 ps-lg-3 pt-lg-4 text-white text-center">
        
                    <sub class="baseIcon font-monospace gameWidgetLeftBase" id="base-icon-0"></sub>
                    <sup class="baseIcon font-monospace gameWidgetCenterBase" id="base-icon-1"></sup>
                    <sub class="baseIcon font-monospace gameWidgetRightBase" id="base-icon-2"></sub>
  
            </div>
            <div class="count-container col-9 col-lg-12 m-0 p-0 pt-2 pb-3 text-white row row-cols-lg-6">
              <div class="balls-label col font-monospace text-end">B:</div>
              <div class="balls col font-monospace text-start">0</div>
              <div class="strikes-label col font-monospace text-end">S:</div>
              <div class="strikes col font-monospace text-start">0</div>
              <div class="outs-label col font-monospace text-end">O:</div>
              <div class="outs col font-monospace text-start">0</div>
            </div>
          </div>
  
          <!-- Right Section -->
          <div class="col-12 col-lg-4 px-4 pb-4 py-lg-4 text-white lh-sm log"></div>
        </div>
      `;

        // Append the template content to the shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {

        //const modalTrigger = this.shadowRoot.getElementById('open-modal');

        

    }

    disconnectedCallback() {
        this._removeEventListeners();
    }

    // _addEventListeners() {
    //     const inning = this.shadowRoot.querySelector('.inning');
    //     inning.addEventListener('click', this._onInningClick.bind(this));

    //     const awayName = this.shadowRoot.querySelector('.away-name');
    //     awayName.addEventListener('click', this._onAwayNameClick.bind(this));

    //     const homeName = this.shadowRoot.querySelector('.home-name');
    //     homeName.addEventListener('click', this._onHomeNameClick.bind(this));
    // }

    _removeEventListeners() {
        const inning = this.shadowRoot.querySelector('.inning');
        inning.removeEventListener('click', this._onInningClick);

        const awayName = this.shadowRoot.querySelector('.away-name');
        awayName.removeEventListener('click', this._onAwayNameClick);

        const homeName = this.shadowRoot.querySelector('.home-name');
        homeName.removeEventListener('click', this._onHomeNameClick);
    }

    // _onInningClick() {
    //     const pageNumber = this.getAttribute('page-number');
    //     const els = document.getElementsByClassName('page');
    //     Array.from(els).forEach((el) => el.classList.add('hide'));
    //     const page = document.getElementById(`page${pageNumber}`);
    //     page.classList.remove('hide');
    //     const container = page.children[1];
    //     container.scrollTop = container.scrollHeight;
    // }

    // _onAwayNameClick() {
    //     const awayId = this.getAttribute('away-id');
    //     app.view.modal.update(awayId);
    // }

    // _onHomeNameClick() {
    //     const homeId = this.getAttribute('home-id');
    //     app.view.modal.update(homeId);
    // }

    render(gameMessage) {
        this.shadowRoot.querySelector('.inning').textContent = gameMessage.inning;
        this.shadowRoot.querySelector('.away-name').innerHTML = gameMessage.awayNameWithLink;
        this.shadowRoot.querySelector('.home-name').innerHTML = gameMessage.homeNameWithLink;
        this.shadowRoot.querySelector('.away-score').textContent = gameMessage.score.away;
        this.shadowRoot.querySelector('.home-score').textContent = gameMessage.score.home;
        const baseIcons = gameMessage.baseIcons;
        this.shadowRoot.getElementById('base-icon-0').textContent = baseIcons.charAt(0);
        this.shadowRoot.getElementById('base-icon-1').textContent = baseIcons.charAt(1);
        this.shadowRoot.getElementById('base-icon-2').textContent = baseIcons.charAt(2);
        this.shadowRoot.querySelector('.balls').textContent = gameMessage.count.balls;
        this.shadowRoot.querySelector('.strikes').textContent = gameMessage.count.strikes;
        this.shadowRoot.querySelector('.outs').textContent = gameMessage.count.outs;
        this.shadowRoot.querySelector('.log').innerHTML = gameMessage.log;
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
customElements.define('game-widget', GameWidgetComponent);
