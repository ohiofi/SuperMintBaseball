class Shop{
    static increaseHandSizeBasePrice = 24
    static increaseHandSizeSquarePrice = 1
    // takes an integer sum and splits it into three parts such that the total equals the given sum.
    static splitThreeWays(sum) {
        const part1 = Math.ceil(sum / 3); // First part
        const part2 = Math.ceil((sum - part1) / 2);               // Second part
        const part3 = sum - part1 - part2;   // Third part ensures the total equals sum
        return [part1, part2, part3];
    }
    static getHandSizeCard(cost){
        const card = new TradingCard(null, Shop.increaseHandSizeBasePrice + Shop.increaseHandSizeSquarePrice * Shop.increaseHandSizeSquarePrice);
        card.leagueIdNumber = -1;
        card.container.innerHTML = `
        <trading-card 
            name="+1 HAND SIZE ✋"
            position="✋"
            team="✋"
            reward="Hold 1 additional card"
            cost="${Shop.increaseHandSizeBasePrice + Shop.increaseHandSizeSquarePrice * Shop.increaseHandSizeSquarePrice}"
            colorLight="#FFFFFF"
            colorMid="#333333"
            colorDark="#000000"
            emoji="✋">
        </trading-card>`.trim();
        return card;
    }

    constructor(){
        this.root = View.createElement("div","shop","container row pb-4")
        this.favTeamCards = [];
        this.pitcherCards = [];
        this.sluggerCards = [];
        this.onDisplay = [];
        
    }

    addCards(teamArray){
        for(let i=0; i<teamArray.length;i++){
            if(!this.hasCardInShop(teamArray[i].leagueIdNumber)){
                this.favTeamCards.push(
                    new FavTeamCard(
                        teamArray[i],
                        4,
                        5,
                        new Valuables({"stocks":5}),
                        StatsEventType.RUNS_SCORED
                    )
                )
            }
            if(!this.hasCardInShop(teamArray[i].getPitcher().leagueIdNumber)){
                this.pitcherCards.push(
                    new TradingCard(
                        teamArray[i].getPitcher(),
                        20,
                        1,
                        new Valuables({"tickets":1}),
                        StatsEventType.STRIKEOUTS_THROWN
                    )
                )
            }
            if(!this.hasCardInShop(teamArray[i].getSlugger().leagueIdNumber)){
                this.sluggerCards.push(
                    new TradingCard(
                        teamArray[i].getSlugger(),
                        2,
                        10,
                        new Valuables({"caps":10}),
                        StatsEventType.HITS
                    )
                )
            }
        }
    }


    getCardDisplay(number){
        for(let i=0; i<number; i++){
            if(this.onDisplay[i] != null){
                this.root.innerHTML += `
                <span class="col row">
                    <span id="shopCardSlot${i}" class="col-12 text-center">
                    </span>
                    <div class="col-12 text-center pb-5">
                        <button id="shopCardSlot${i}Button" type="button" value=${i} class="shopButton btn btn-warning">BUY ME -${this.onDisplay[i].cost}💰</button>
                    </div>
                </span>
                `
                this.root.querySelector("#shopCardSlot"+i).append(this.onDisplay[i].render())
            }
        }
        // always add the +1 Hand Size card
        const handSizeCard = Shop.getHandSizeCard()
        this.root.innerHTML += `
                <span class="col row">
                    <span id="shopCardSlotHandSizeCard" class="col-12 text-center">
                    </span>
                    <div class="col-12 text-center pb-5">
                        <button id="shopCardSlotHandSizeCardButton" type="button" value="-1" 
                            class="handSizeCardButton btn btn-warning">BUY ME -${handSizeCard.cost}💰</button>
                    </div>
                </span>
                `
                this.root.querySelector("#shopCardSlotHandSizeCard").append(handSizeCard.render())
        return this.root
    }
    getPurchase(index, user){
        if(!this.isPurchaseAffordable(index, user)) {
            return null;
        }
        user.valuables.money -= this.onDisplay[index].cost;
        const card = this.onDisplay[index];
        // update the shop
        this.onDisplay[index] == null;
        return card;
    }
    hasCardInShop(leagueIdNumber){
        for(let each of this.favTeamCards){
            if(each.leagueIdNumber === leagueIdNumber) return true
        }
        for(let each of this.pitcherCards){
            if(each.leagueIdNumber === leagueIdNumber) return true
        }
        for(let each of this.sluggerCards){
            if(each.leagueIdNumber === leagueIdNumber) return true
        }
        for(let each of this.onDisplay){
            if(each.leagueIdNumber === leagueIdNumber) return true
        }
        return false
    }
    isPurchaseAffordable(index, user){
        
        return user.valuables.money >= this.onDisplay[index].cost;
    }
    setBatterCards(number){
        for(let i=0; i<number; i++){
            if(this.sluggerCards.length == 0) break
            const indexToRemove = Math.floor(rng.random()*this.sluggerCards.length)
            const addedCard = this.sluggerCards.splice(indexToRemove, 1)[0]
            this.onDisplay.push(addedCard);
        }
    }
    setFavTeamCards(number){
        for(let i=0; i<number; i++){
            if(this.favTeamCards.length == 0) break
            const indexToRemove = Math.floor(rng.random()*this.favTeamCards.length)
            const addedCard = this.favTeamCards.splice(indexToRemove, 1)[0]
            this.onDisplay.push(addedCard);
        }
    }
    setPitcherCards(number){
        for(let i=0; i<number; i++){
            if(this.pitcherCards.length == 0) break
            const indexToRemove = Math.floor(rng.random()*this.pitcherCards.length)
            const addedCard = this.pitcherCards.splice(indexToRemove, 1)[0]
            this.onDisplay.push(addedCard);
        }
    }

}