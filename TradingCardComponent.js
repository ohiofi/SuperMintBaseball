class TradingCardComponent extends HTMLElement {
    static cardCounter = 0;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Extract attributes
        this.name = this.getAttribute('name') || 'Unknown Player';
        this.position = this.getAttribute('position') || 'Unknown Position';
        this.team = this.getAttribute('team') || 'Unknown Team';
        this.stats = this.getAttribute('stats') || 'N/A';
        this.reward = this.getAttribute('reward') || 'No Reward';
        this.cost = this.getAttribute('cost') || 'N/A';
        this.colorPrimary = this.getAttribute('colorPrimary') || '#FFD700';
        this.colorSecondary = this.getAttribute('colorSecondary') || '#FF4500';
        const emoji = this.getAttribute('emoji') || '🏃';
        const uniqueCanvasId = `canvas-${TradingCardComponent.cardCounter++}`;

        // HTML structure
        shadow.innerHTML = `
        <style>
          ${this.getStyles()}
        </style>
        <div class="tradingCard">
          <div class="tradingCardHoverPoint"></div>
          <div class="tradingCardHoverPoint"></div>
          <div class="tradingCardHoverPoint"></div>
          <div class="tradingCardHoverPoint"></div>
          <div class="tradingCardContents">
            <div class="tradingCardHeader">
              <span class="cardName">${this.name}</span>
              <span class="cardCost"><small>${this.cost}💰</small></span>
            </div>
            <div class="tradingCardImage">
              <canvas id="${uniqueCanvasId}"></canvas>
            </div>
            <div class="tradingCardBody">
            <div class="cardTeam"><small>Team:</small> ${this.team}</div>
              <div class="cardPosition"><small>Position:</small> ${this.position}</div>
              <div class="cardStats"><small>Click to see stats</small></div>
              <div class="cardReward">${this.reward}</div>
            </div>
          </div>
        </div>
      `;

        // Render the canvas
        setTimeout(() => this.drawCanvas(shadow.querySelector(`#${uniqueCanvasId}`), emoji, [this.colorPrimary, this.colorSecondary]), 0);
    }

    drawCanvas(canvas, emoji, colorScheme) {
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = 200 / 10;
        canvas.height = 150 / 10;

        // Create a gradient for the background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0.5, colorScheme[0]);
        gradient.addColorStop(0.5, colorScheme[1]);

        // Apply the gradient as the background
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.filter = "contrast(90%) blur(0.1px) brightness(110%)";
        // Set font size and alignment for the emoji
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw the emoji
        ctx.fillText(emoji, canvas.width / 2, canvas.height * 0.6);

    }

    getStyles() {
        return `
        .tradingCard {
          position: relative;
          width: 200px;
          height: 300px;
          display: inline-block;
          border-radius: 5px;
        }
        
        .tradingCardContents {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border-radius: 5px;
          
          box-shadow: 0 0 5px rgba(0, 0, 0, 1);
          transition: 0.4s ease;
          overflow: hidden;
        }
        
        .tradingCardHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 10px;
          
          color: ${this.colorPrimary};
          
          font-size: 1em;
          font-weight: bold;
          text-transform: uppercase;
        }
        .tradingCardImage {
          position: relative;
          height: 50%;
          background: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 2px solid #333;
          border-bottom: 2px solid #333;
        }
        .tradingCardImage canvas {
          width: 90%;
          height: auto;
          image-rendering: pixelated;
        }
        .tradingCardBody {
          padding: 10px;
          color: #fff;
          background: #333;
          font-size: 0.9em;
          text-align: center;
        }
        .tradingCardBody p {
          margin: 5px 0;
        }
        .cardReward {
          font-size: 1.2em;
          font-weight: bold;
          text-align: center;
          color: #fff;
        }
        .tradingCardHoverPoint {
            position: absolute;
            z-index: 5;
            width: calc(100% / 2);
            height: calc(100% / 2);
        }
        .tradingCardHoverPoint:nth-child(1) { top: 0; left: 0; }
        .tradingCardHoverPoint:nth-child(2) { top: 0; right: 0; }
        .tradingCardHoverPoint:nth-child(3) { bottom: 0; left: 0; }
        .tradingCardHoverPoint:nth-child(4) { bottom: 0; right: 0; }
        .tradingCardHoverPoint:nth-child(1):hover ~ .tradingCardContents {
            box-shadow: 3px 3px 50px rgba(0, 0, 0, 1);
            transform-origin: right top;
            transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) rotateZ(0.2deg);
        }

        .tradingCardHoverPoint:nth-child(2):hover ~ .tradingCardContents {
            box-shadow: -3px 3px 50px rgba(0, 0, 0, 1);
            transform-origin: left top;
            transform: perspective(1000px) rotateX(2deg) rotateY(2deg) rotateZ(-0.2deg);
        }

        .tradingCardHoverPoint:nth-child(3):hover ~ .tradingCardContents {
            box-shadow: 3px -3px 50px rgba(0, 0, 0, 1);
            transform-origin: right bottom;
            transform: perspective(1000px) rotateX(-2deg) rotateY(-2deg) rotateZ(-0.2deg);
        }

        .tradingCardHoverPoint:nth-child(4):hover ~ .tradingCardContents {
            box-shadow: -3px -3px 50px rgba(0, 0, 0, 1);
            transform-origin: left bottom;
            transform: perspective(1000px) rotateX(-2deg) rotateY(2deg) rotateZ(0.2deg);
        }
        

      `;
    }

    
}

// Define the custom element
customElements.define('trading-card', TradingCardComponent);