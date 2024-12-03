class User{
    constructor(name){
        this.name = name;
        this.lives = 3;
        this.valuables = new Valuables({
            "money":50,
            "stocks":0,
            "tickets":0,
            "caps":0
        });
        this.cards = [];
        this.maxCards = 5;
    }

    addCard(cardToAdd){
        if(this.hasRoomForThisCard(cardToAdd)){
            this.cards.push(cardToAdd)
        }
    }

    handleEvent(data){
        console.log("User sees this data: "+data);
    }

    hasRoomForThisCard(card){
        if(card.leagueIdNumber === -1) return true; // player always has room for the +1 Hand Size card
        return this.cards.length < this.maxCards
    }
}