const CardType = {
    PITCHER:"Pitcher",
    SLUGGER:"Slugger",
    FAV_TEAM:"Fav Team",
    INCREASE_HAND_SIZE:"Increase Hand Size"
}

class TradingCard {
    static getPlaceholderCard(){
            const card = new TradingCard(CardType.INCREASE_HAND_SIZE,null, Shop.plusOneHandCardPrice());
            card.leagueIdNumber = -1;
            card.container.innerHTML = `
            <trading-card 
                name="Your Cards Go Here"
                cardLine1="Placeholder <span class='noto'>🫥</span>"
                cardLine2="This Is Where I'd Put My Cards"
                cardLine3="If I Had Any"
                cardLine4="(not a real card)"
                cost="?"
                colorLight="rgba(127,127,255,0.0)"
                colorMid="rgba(127,127,255,0.0)"
                colorDark="rgba(127,127,255,0.0)"
                emoji="🫥">
            </trading-card>`.trim();
            return card;
    }

    static counter = 0;
    constructor(cardType, player, cost, rewardAmount, valuables, eventType) {
        this.cardId = TradingCard.counter++;
        this.name = null;
        this.cardType = cardType;
        this.team = null;
        this.leagueIdNumber = null;
        this.colorScheme = { light: "black", mid: "black", dark: "black" };
        this.gradientRotation = rng.random();   
        this.profilePic = null;
        if (player != null) {
            this.name = player.firstName + " " + player.lastName;
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
        this.pastTenseEventString = null;
        switch (this.eventType) {
            case StatsEventType.STRIKEOUTS_THROWN:
                this.eventString = "strikeout thrown"
                this.pastTenseEventString = "threw a strikeout!";
                break
            case StatsEventType.HITS:
                this.eventString = "hit"
                this.pastTenseEventString = "got a hit!";
                break
        }
        this.container = View.createElement("span");
        if (!this.valuables) return
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
            gradientRotation="${this.gradientRotation}"
            emoji="${this.profilePic}"
            font="13px Arial">
        </trading-card>`.trim();
    }

    // this approach is necessary so that one card can trigger other cards
    addRewardToUser(user){
        user.valuables.add(this.valuables)
    }
    equals(otherObject) {
        return this.leagueIdNumber === otherObject.leagueIdNumber
    }
    isTriggered(statsEvent) {
        if(statsEvent.playerId === this.leagueIdNumber){
            if (statsEvent.eventType === this.eventType) {
                return true;
            }
            if (this.eventType === StatsEventType.HITS
                && (
                    statsEvent.eventType === StatsEventType.SINGLES 
                    || statsEvent.eventType === StatsEventType.DOUBLES 
                    || statsEvent.eventType === StatsEventType.TRIPLES 
                    || statsEvent.eventType === StatsEventType.HOME_RUNS
                )) {
                return true
            }
        }
        
        return false;
    }
    render() {
        return this.container
    }

}