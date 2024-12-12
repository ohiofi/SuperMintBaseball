class FavTeamCard extends TradingCard{
    
    constructor(cardType, team, cost, rewardAmount, valuables, eventType){
        super(cardType, null, cost, rewardAmount, valuables, eventType)
        this.cardId = TradingCard.counter++;
        this.name = team.place.name.toUpperCase() + " " + team.mascot;
        this.cardType = CardType.FAV_TEAM;
        this.team = team.place.abbreviation.toUpperCase() + " " + team.mascot;
        this.leagueIdNumber = team.leagueIdNumber;
        this.colorScheme = team.colorScheme;
        this.profilePic = team.place.abbreviation.toUpperCase();
        this.pastTenseEventString = null;
        
        this.eventString = null;
        switch(this.eventType){
            case StatsEventType.RUNS_SCORED:
                this.eventString = "run scored"
                this.pastTenseEventString = "scored a run!";
                break
        }
        this.container = View.createElement("span");
        this.container.innerHTML = `
        <trading-card 
            onclick="app.view.modal.update(${this.leagueIdNumber});" 
            data-bs-target="#statsModal" 
            data-bs-toggle="modal"
            name="${this.name}"
            cardLine1="+${this.rewardAmount} ${this.valuables.getEmoji()} per ${this.eventString}"
            cardLine2="${this.team}"
            cardLine3="${this.cardType}"
            cardLine4="Click for Team stats"
            cost="${this.cost}"
            colorLight="${this.colorScheme.light}"
            colorMid="${this.colorScheme.mid}"
            colorDark="${this.colorScheme.dark}"
            emoji="${this.profilePic}"
            fontSize="${(18/this.profilePic.length+3)+'px'}"
            fontFamily="monospace">
        </trading-card>`.trim();
    }
    isTriggered(statsEvent) {
        if (statsEvent.teamId === this.leagueIdNumber && statsEvent.eventType === this.eventType){
            return true;
        }
    }
    render() {
        return this.container
    }
}