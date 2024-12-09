const ModelState = {
    MORNING:0,
    AFTERNOON:1,
    NIGHT:2
}


class Model {
    constructor() {
        // The state of the model
        //this.game = JSON.parse(localStorage.getItem('savedGame')) || new Game();
        this.world = new World();
        this.users = [new User()];
        this.state = ModelState.MORNING;
    }

    addUser() {
        const newUser = new User();

        this.users.push(newUser)
    }

    

    _commit(todos) {
        this.onTodoListChanged(todos)
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    attemptShopPurchase(value, user) {
        if(!user.hasRoomForThisCard(this.world.shop.onDisplay[value])){
            //console.log("Oops no more room for more cards")
        }
        else if (this.world.shop.isPurchaseAffordable(value, user)) {
            if(value == -1){
                // plus one hand card
                console.log(value)
                this.users[0].valuables.money -= Shop.plusOneHandCardPrice();
                this.users[0].maxCards++;
                Shop.plusOneHandSizeSquarePrice++;
                return
            }
            const buyingCard = this.world.shop.getPurchase(value, user);
            if (buyingCard) {
                this.users[0].addCard(buyingCard, this.world.league.lookup(buyingCard.leagueIdNumber));
            }
        }
    }



    getNextGameMessages() {
        return this.world.nextGameMessages();
    }




    next() {
        switch (this.state) {
            case ModelState.MORNING:
                console.log("morning -> afternoon")
                // shop cleans out all the old cards
                this.world.shop.setInventoryToZero();
                this.world.shop.displaySize = Math.max(this.world.shop.displaySize - 2, 5);
                this.state = ModelState.AFTERNOON;
                break;
            case ModelState.AFTERNOON:
                console.log("afternoon -> night")
                this.state = ModelState.NIGHT;
                break;
            case ModelState.NIGHT:
                console.log("night -> morning")
                this.world.day++;
                // setup shop for next day
                this.world.shop.addCards(this.world.league.getTeamsPlayingToday(this.world.year,this.world.day));
                this.state = ModelState.MORNING;
                break;
        }
    }

    reloadTeams(){
        this.model.world.league.reloadTeams()
    }


}