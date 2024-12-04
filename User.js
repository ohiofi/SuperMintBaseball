class User {
    constructor(name) {
        this.name = name;
        this.lives = 3;
        this.valuables = new Valuables({
            "money": 30,
            "stocks": 0,
            "tickets": 0,
            "caps": 0
        });
        this.cards = [];
        this.maxCards = 5;
    }

    addCard(cardToAdd, leagueIdObject) {
        if (this.hasRoomForThisCard(cardToAdd)) {
            this.cards.push(cardToAdd);
            if (cardToAdd.cardType === CardType.PITCHER
                || cardToAdd.cardType === CardType.SLUGGER
                || cardToAdd.cardType === CardType.FAV_TEAM)
            {
                leagueIdObject.manager.subscribe(this.handleEvent);
            }


        }
    }

    handleEvent = (data) => {
        console.log("User sees this data: ",data);
        // loop thru cards 
        for(let i=0; i<this.cards.length;i++){
            if(this.cards[i].isTriggered(data)){
                this.valuables.add(this.cards[i].valuables)
                Controller.addAlert("success",this.cards[i].name + " " + this.cards[i].pastTenseEventString + " +" +this.cards[i].rewardAmount + this.cards[i].valuables.getEmoji())
            }
        }
    }

    hasRoomForThisCard(card) {
        if (card.leagueIdNumber === -1) return true; // player always has room for the +1 Hand Size card
        return this.cards.length < this.maxCards
    }

    removeCard(indexLoc, leagueIdObject) {

    }
}