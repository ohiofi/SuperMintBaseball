class GameWidget extends HTMLElement {
    constructor() {
      super();
  
      // Attach a shadow DOM
      this.attachShadow({ mode: 'open' });
  
      // Create the template
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          .game-widget {
            background-color: #111;
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
          .link {
            cursor: pointer;
            text-decoration: none;
          }
          .link:hover {
            text-decoration: underline;
          }
          .font-monospace {
            font-family: monospace;
          }
        </style>
        <div class="game-widget">
          <!-- Left Section -->
          <div class="col-lg px-4 pt-4 text-white">
            <a class="inning link"></a>
            <div class="away-line row">
              <a class="away-name col-10 text-start link">Away Team</a>
              <div class="away-score col-2 text-end h3 font-monospace"></div>
            </div>
            <div class="home-line row">
              <a class="home-name col-10 text-start link">Home Team</a>
              <div class="home-score col-2 text-end h3 font-monospace"></div>
            </div>
          </div>
  
          <!-- Center Section -->
          <div class="col-lg m-0 px-3 text-white row">
            <div class="base-icons col-3 text-center"></div>
            <div class="count-container col-9 row">
              <div class="balls-label col font-monospace text-end">B:</div>
              <div class="balls col font-monospace text-start">0</div>
              <div class="strikes-label col font-monospace text-end">S:</div>
              <div class="strikes col font-monospace text-start">0</div>
              <div class="outs-label col font-monospace text-end">O:</div>
              <div class="outs col font-monospace text-start">0</div>
            </div>
          </div>
  
          <!-- Right Section -->
          <div class="col-lg px-4 pb-4 text-white lh-sm log"></div>
        </div>
      `;
  
      // Append the template content to the shadow DOM
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  
    connectedCallback() {
      this._addEventListeners();
    }
  
    disconnectedCallback() {
      this._removeEventListeners();
    }
  
    _addEventListeners() {
      const inning = this.shadowRoot.querySelector('.inning');
      inning.addEventListener('click', this._onInningClick.bind(this));
  
      const awayName = this.shadowRoot.querySelector('.away-name');
      awayName.addEventListener('click', this._onAwayNameClick.bind(this));
  
      const homeName = this.shadowRoot.querySelector('.home-name');
      homeName.addEventListener('click', this._onHomeNameClick.bind(this));
    }
  
    _removeEventListeners() {
      const inning = this.shadowRoot.querySelector('.inning');
      inning.removeEventListener('click', this._onInningClick);
  
      const awayName = this.shadowRoot.querySelector('.away-name');
      awayName.removeEventListener('click', this._onAwayNameClick);
  
      const homeName = this.shadowRoot.querySelector('.home-name');
      homeName.removeEventListener('click', this._onHomeNameClick);
    }
  
    _onInningClick() {
      const pageNumber = this.getAttribute('page-number');
      const els = document.getElementsByClassName('page');
      Array.from(els).forEach((el) => el.classList.add('hide'));
      const page = document.getElementById(`page${pageNumber}`);
      page.classList.remove('hide');
      const container = page.children[1];
      container.scrollTop = container.scrollHeight;
    }
  
    _onAwayNameClick() {
      const awayId = this.getAttribute('away-id');
      app.view.modal.update(awayId);
    }
  
    _onHomeNameClick() {
      const homeId = this.getAttribute('home-id');
      app.view.modal.update(homeId);
    }
  
    update(gameMessage) {
      this.shadowRoot.querySelector('.inning').textContent = gameMessage.inning;
      this.shadowRoot.querySelector('.away-score').textContent = gameMessage.score.away;
      this.shadowRoot.querySelector('.home-score').textContent = gameMessage.score.home;
      this.shadowRoot.querySelector('.base-icons').innerHTML = gameMessage.baseIcons;
      this.shadowRoot.querySelector('.balls').textContent = gameMessage.count.balls;
      this.shadowRoot.querySelector('.strikes').textContent = gameMessage.count.strikes;
      this.shadowRoot.querySelector('.outs').textContent = gameMessage.count.outs;
      this.shadowRoot.querySelector('.log').innerHTML = gameMessage.log;
    }
  }
  
  // Define the custom element
  customElements.define('game-widget', GameWidget);
  