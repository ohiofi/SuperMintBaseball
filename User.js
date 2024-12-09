class User {
    constructor(name) {
        this.name = name;
        this.hasClickedUserIcon = false;
        this.lives = 3; // 🩸
        this.level = 1; // 🚀
        this.valuables = new Valuables({
            "money": 30, // 🌕🌝💰
            "greenMagic": 3,// 🌵🪴🌿☘️💹
            "redMagic": 4,// 🔥🎟️
            "blueMagic": 5// 💧💦🌊🧢
        });
        this.cards = [];
        this.maxCards = 5;
        this.favoriteSpeed = 4000;
    }

    

    addCard(cardToAdd, leagueIdObject) {
        //console.log(leagueIdObject)
        if (this.hasRoomForThisCard(cardToAdd)) {
            this.cards.push(cardToAdd);
            if (cardToAdd.leagueIdNumber > -1){
                leagueIdObject.manager.subscribe(this.handleEvent);
            }
        }
    }

    get clickedUserIcon() {
        return this.hasClickedUserIcon;
    }

    // goal emoji is 🎯🏁
    getGoal(){
        return this.level * this.level * 150;
    }

    // victory points emoji is 👑
    getVictoryPoints(){
        return this.valuables.greenMagic * this.valuables.redMagic * this.valuables.blueMagic;
    }

    handleEvent = (data) => {
        //console.log("User sees this data: ",data);
        // loop thru cards 
        for(let i=0; i<this.cards.length;i++){
            if(this.cards[i].isTriggered(data)){
                this.cards[i].addRewardToUser(this)
                View.addAlert("success","+" +this.cards[i].rewardAmount + this.cards[i].valuables.getEmoji()+" <small>"+this.cards[i].name + " " + this.cards[i].pastTenseEventString + "</small>")
            }
        }
    }

    hasRoomForThisCard(card) {
        return this.cards.length < this.maxCards;
    }

    removeCard(indexLoc, leagueIdObject) {

    }

    set clickedUserIcon(value) {
        this.hasClickedUserIcon = value;
    }
}