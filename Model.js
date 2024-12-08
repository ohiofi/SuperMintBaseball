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
        this.state = ModelState.NIGHT;
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
                this.state = ModelState.AFTERNOON;
                break;
            case ModelState.AFTERNOON:
                this.state = ModelState.NIGHT;
                break;
            case ModelState.NIGHT:
                this.state = ModelState.MORNING;
                break;
        }
    }

    reloadTeams(){
        this.model.world.league.reloadTeams()
    }


}