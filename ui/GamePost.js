class GamePost {
    constructor(gameMessage){
        const timestamp = new Date().toLocaleTimeString(); 
        this.root = View.createElement("div",null,"post bg-111")
        this.root.innerHTML = `
            <span class="username">
                <span class="pe-4">${gameMessage.inning}</span>
                <span class="pe-4">${gameMessage.awayTeam}:&nbsp;${gameMessage.score.away}</span>
                <span class="pe-4">${gameMessage.homeTeam}:&nbsp;${gameMessage.score.home}</span>
            </span> <span class="timestamp">${timestamp}</span>
            <p>${gameMessage.render()}</p>
            <span>
            <sub class='baseIcon gamePostLeftBase'>${gameMessage.baseIcons.charAt(0)}</sub>
                <sup class='baseIcon gamePostCenterBase'>${gameMessage.baseIcons.charAt(1)}</sup>
                <sub class='baseIcon gamePostRightBase'>${gameMessage.baseIcons.charAt(2)}</sub>
            </span>
            <span class="font-monospace">
                
                B: ${gameMessage.count.balls} S: ${gameMessage.count.strikes} O: ${gameMessage.count.outs}
             </span>
        `.trim();

    }
    render(){
        return this.root
    }
}