class TradingCard{
    constructor(player, cost, rewardAmount, valuables, eventType){
        this.name = player.firstName + " " + player.lastName;
        this.position = player.position;
        this.team = player.teamPlaceAbbreviation + " " + player.teamMascot;
        this.leagueIdNumber = player.leagueIdNumber;
        this.colorScheme = player.colorScheme;
        this.profilePic = player.profilePic;
        this.cost = cost
        this.rewardAmount = rewardAmount
        this.valuables = valuables
        // console.log(valuables)
        this.eventType = eventType
        this.eventString = null;
        switch(this.eventType){
            case StatsEventType.STRIKEOUTS_THROWN:
                this.eventString = "strikeout thrown"
                break
            case StatsEventType.HITS:
                this.eventString = "hit"
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