class TradingCard{
    
    static counter = 0;
    constructor(player, cost, rewardAmount, valuables, eventType){
        this.cardId = TradingCard.counter++;
        this.name = null;
        this.cardType = null;
        this.team = null;
        this.leagueIdNumber = null;
        this.colorScheme = {light:"black",mid:"black",dark:"black"};
        this.profilePic = null;
        if(player != null){
            this.name = player.firstName + " " + player.lastName;
            this.cardType = player.position;
            this.team = player.teamPlaceAbbreviation + " " + player.teamMascot;
            this.leagueIdNumber = player.leagueIdNumber;
            this.colorScheme = player.colorScheme;
            this.profilePic = player.profilePic;
        }

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
        if(!this.valuables) return
        this.container.innerHTML = `
        <trading-card 
            onclick="app.view.modal.update(${this.leagueIdNumber});" 
            data-bs-target="#statsModal" 
            data-bs-toggle="modal"
            name="${this.name}"
            cardLine1="+${this.rewardAmount} ${this.valuables.getEmoji()} per ${this.eventString}"
            cardLine2="${this.team}"
            cardLine3="${this.cardType}"
            cardLine4="Click for Player stats"
            
            cost="${this.cost}"
            colorLight="${this.colorScheme.light}"
            colorMid="${this.colorScheme.mid}"
            colorDark="${this.colorScheme.dark}"
            emoji="${this.profilePic}"
            font="13px Arial">
        </trading-card>`.trim();
    }
    equals(otherObject){
        return this.leagueIdNumber === otherObject.leagueIdNumber
    }
    render() {
        return this.container
    }

}