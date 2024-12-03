class FavTeamCard extends TradingCard{
    
    constructor(team, cost, rewardAmount, valuables, eventType){
        super(null, cost, rewardAmount, valuables, eventType)
        this.cardId = TradingCard.counter++;
        this.name = team.place.abbreviation.toUpperCase() + " " + team.mascot;
        this.position = "Favorite Team";
        this.team = team.place.abbreviation.toUpperCase() + " " + team.mascot;
        this.leagueIdNumber = team.leagueIdNumber;
        this.colorScheme = team.colorScheme;
        this.profilePic = team.place.abbreviation.toUpperCase();
        
        this.eventString = null;
        switch(this.eventType){
            case StatsEventType.RUNS_SCORED:
                this.eventString = "run scored"
                break
        }
        this.container = View.createElement("span");
        this.container.innerHTML = `
        <trading-card 
            onclick="app.view.modal.update(${this.leagueIdNumber});" 
            data-bs-target="#statsModal" 
            data-bs-toggle="modal"
            name="${this.name}"
            position="${this.position}"
            team="${this.team}"
            reward="+${this.rewardAmount} ${this.valuables.getEmoji()} per ${this.eventString}"
            cost="${this.cost}"
            colorLight="${this.colorScheme.light}"
            colorMid="${this.colorScheme.mid}"
            colorDark="${this.colorScheme.dark}"
            emoji="${this.profilePic}">
        </trading-card>`.trim();
    }
    render() {
        return this.container
    }
}