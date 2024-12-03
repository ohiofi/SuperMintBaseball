class GamePost {
    constructor(gameMessage){
        const timestamp = new Date().toLocaleTimeString(); 
        this.root = View.createElement("div",null,"post bg-111")
        this.root.innerHTML = `
            <span class="username">
                <span class="pe-4">${gameMessage.inning}</span>
                <span class="pe-4">${GamePost.removeSvg(gameMessage.awayTeam)}:&nbsp;${gameMessage.score.away}</span>
                <span class="pe-4">${GamePost.removeSvg(gameMessage.homeTeam)}:&nbsp;${gameMessage.score.home}</span>
            </span> <span class="timestamp">${timestamp}</span>
            <p>${GamePost.removeSvg(gameMessage.log)}</p>
            <span>
            <sub class='baseIcon font-monospace gamePostLeftBase'>${gameMessage.baseIcons.charAt(0)}</sub>
                <sup class='baseIcon font-monospace gamePostCenterBase'>${gameMessage.baseIcons.charAt(1)}</sup>
                <sub class='baseIcon font-monospace gamePostRightBase'>${gameMessage.baseIcons.charAt(2)}</sub>
            </span>
            <span class="font-monospace">
                
                B: ${gameMessage.count.balls} S: ${gameMessage.count.strikes} O: ${gameMessage.count.outs}
             </span>
        `.trim();

    }
    render(){
        return this.root
    }

    // It turns out that rendering THOUSANDS of SVGs with gradients is bad for performance. Who knew?
    static removeSvg(inputString) {
        return inputString.replace(/<svg[\s\S]*?<\/svg>/gi, '');
    }
}

// class GamePost {
//     constructor(gameMessage) {
//         const timestamp = new Date().toLocaleTimeString(); 
//         this.root = View.createElement("div", null, "post bg-111");

//         // Create username container
//         const usernameSpan = document.createElement("span");
//         usernameSpan.classList.add("username");

//         // Inning
//         const inningSpan = document.createElement("span");
//         inningSpan.classList.add("pe-4");
//         inningSpan.textContent = gameMessage.inning;
//         usernameSpan.appendChild(inningSpan);

//         // Away team and score
//         const awayTeamSpan = document.createElement("span");
//         awayTeamSpan.classList.add("pe-4");
//         awayTeamSpan.textContent = `${gameMessage.awayTeam}: ${gameMessage.score.away}`;
//         usernameSpan.appendChild(awayTeamSpan);

//         // Home team and score
//         const homeTeamSpan = document.createElement("span");
//         homeTeamSpan.classList.add("pe-4");
//         homeTeamSpan.textContent = `${gameMessage.homeTeam}: ${gameMessage.score.home}`;
//         usernameSpan.appendChild(homeTeamSpan);

//         this.root.appendChild(usernameSpan);

//         // Timestamp
//         const timestampSpan = document.createElement("span");
//         timestampSpan.classList.add("timestamp");
//         timestampSpan.textContent = timestamp;
//         this.root.appendChild(timestampSpan);

//         // Message content
//         const messageParagraph = document.createElement("p");
//         messageParagraph.textContent = gameMessage.render();
//         this.root.appendChild(messageParagraph);

//         // Base Icons container
//         const baseIconsSpan = document.createElement("span");

//         const leftBaseIcon = this.createBaseIcon('sub', 'gamePostLeftBase', gameMessage.baseIcons.charAt(0));
//         const centerBaseIcon = this.createBaseIcon('sup', 'gamePostCenterBase', gameMessage.baseIcons.charAt(1));
//         const rightBaseIcon = this.createBaseIcon('sub', 'gamePostRightBase', gameMessage.baseIcons.charAt(2));

//         baseIconsSpan.appendChild(leftBaseIcon);
//         baseIconsSpan.appendChild(centerBaseIcon);
//         baseIconsSpan.appendChild(rightBaseIcon);

//         this.root.appendChild(baseIconsSpan);

//         // Count display
//         const countSpan = document.createElement("span");
//         countSpan.classList.add("font-monospace");
//         countSpan.textContent = `B: ${gameMessage.count.balls} S: ${gameMessage.count.strikes} O: ${gameMessage.count.outs}`;
//         this.root.appendChild(countSpan);
//     }

//     createBaseIcon(tag, className, content) {
//         const element = document.createElement(tag);
//         element.classList.add("baseIcon", "font-monospace", className);
//         element.textContent = content;
//         return element;
//     }

//     render() {
//         return this.root;
//     }

    
// }




