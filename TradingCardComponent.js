class TradingCardComponent extends HTMLElement {
    static cardCounter = 0;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Extract attributes
        this.name = this.getAttribute('name') || 'Unknown Player';
        this.cardLine1 = this.getAttribute('cardLine1') || 'No Reward';
        this.cardLine2 = this.getAttribute('cardLine2') || 'Unknown Team';
        this.cardLine3 = this.getAttribute('cardLine3') || 'Unknown Position';
        this.cardLine4 = this.getAttribute('cardLine4') || 'Click to see stats';
        this.cost = this.getAttribute('cost') || 'N/A';
        this.colorLight = this.getAttribute('colorLight') || '#FFD700';
        this.colorMid = this.getAttribute('colorMid') || '#994500';
        this.colorDark = this.getAttribute('colorDark') || '#664500';
        this.gradientRotation = rng.random();   
        this.emoji = this.getAttribute('emoji') || '🏃';
        this.font = this.getAttribute('font') || '13px';
        this.uniqueCanvasId = `canvas-${TradingCardComponent.cardCounter++}`;

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
              
                <span class="cardName"><small>${this.name}</small></span>
                <span class="cardCost"><small>${this.cost}💰</small></span>
              
            </div>
            <div class="tradingCardImage">
              <canvas id="${this.uniqueCanvasId}"></canvas>
            </div>
            <div class="tradingCardBody">
       
                <div class="cardLine1 py-0 my-0"><small>${this.cardLine1}</small></div>
                <div class="cardLine2 py-0 my-0">${this.cardLine2}</div>
                <div class="cardLine3 py-0 my-0">${this.cardLine3}</div>
                <div class="cardLine4 pb-5"><small>${this.cardLine4}</small></div>
   
            </div>
          </div>
        </div>
      `;

        // Render the canvas
        setTimeout(() => this.drawCanvas(shadow.querySelector(`#${this.uniqueCanvasId}`)),1);
    }

    drawCanvas(canvas, emoji) {
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = 200 / 10;
        canvas.height = 150 / 10;

        // Create a gradient for the background
        const gradient = ctx.createLinearGradient(canvas.width * this.gradientRotation, 0, canvas.width * (1-this.gradientRotation), canvas.height);
        gradient.addColorStop(0.33, this.colorMid);
        gradient.addColorStop(0.77, this.colorDark);

        // Apply the gradient as the background
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.filter = "contrast(70%) brightness(130%)";
        // Set font size and alignment for the emoji
        // ctx.font = (emoji.length == 1 ? 33 : 7/emoji.length+6)+'px';
        
        ctx.font = this.font;
        
        


        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.colorLight

        // Draw the emoji
        ctx.strokeText(this.emoji , canvas.width*0.51 , canvas.height * 0.6);

        ctx.fillText(this.emoji , canvas.width*0.51 , canvas.height * 0.6);

    }

    getStyles() {
      const borderSize = "4px";
        return `
        .tradingCard {
          position: relative;
          width: 200px;
          height: 300px;
          display: inline-block;
          border-radius: 5px;
          margin:5px;
          
        }
        
        .tradingCardContents {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border-radius: 5px;
          
          box-shadow: 0 0 5px rgba(0, 0, 0, 1);
          transition: 0.3s ease;
          overflow: hidden;
        }
        
        .tradingCardHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 10px;
          color: ${this.colorLight};
          background: ${this.colorDark};
          /*font-size: 1em;*/
          font-size:${Math.min(290/this.name.length, 16)}px;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: ${borderSize} solid ${this.colorMid};
        }
        .tradingCardImage {
          position: relative;
          height: 50%;
          background: ${this.colorDark};
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: ${borderSize} solid ${this.colorLight};
          border-bottom: ${borderSize} solid ${this.colorLight};
        }
        .tradingCardImage canvas {
          width: 100%;
          height: auto;
          image-rendering: pixelated;
        }
        .tradingCardBody {
          padding: 0px 0px 50px 0px;
          color: #fff;
          background: ${this.colorDark};
          font-size: 0.85em;
          text-align: center;
          border-top: ${borderSize} solid ${this.colorMid};
          line-height:1.4em;
        }
        .tradingCardBody p {
          margin: 5px 0;
        }
        .cardLine1 {
          font-size: 1.35em;
          font-weight: bold;
          text-align: center;
          
          line-height:1.9em;
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
            box-shadow: 3px 3px 15px rgba(0, 0, 0, 1);
            transform-origin: right top;
            transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) rotateZ(0.2deg);
        }

        .tradingCardHoverPoint:nth-child(2):hover ~ .tradingCardContents {
            box-shadow: -3px 3px 15px rgba(0, 0, 0, 1);
            transform-origin: left top;
            transform: perspective(1000px) rotateX(2deg) rotateY(2deg) rotateZ(-0.2deg);
        }

        .tradingCardHoverPoint:nth-child(3):hover ~ .tradingCardContents {
            box-shadow: 3px -3px 15px rgba(0, 0, 0, 1);
            transform-origin: right bottom;
            transform: perspective(1000px) rotateX(-10deg) rotateY(-10deg) rotateZ(-0.2deg);
        }

        .tradingCardHoverPoint:nth-child(4):hover ~ .tradingCardContents {
            box-shadow: -3px -3px 15px rgba(0, 0, 0, 1);
            transform-origin: left bottom;
            transform: perspective(1000px) rotateX(-10deg) rotateY(10deg) rotateZ(0.2deg);
        }
        

      `;
    }

    
}

// Define the custom element
customElements.define('trading-card', TradingCardComponent);
