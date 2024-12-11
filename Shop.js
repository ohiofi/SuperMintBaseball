class Shop{
    static increaseHandSizeBasePrice = 9
    static increaseHandSizeSquarePrice = 1
    // takes an integer sum and splits it into three parts such that the total equals the given sum.
    static splitThreeWays(sum) {
        const part1 = Math.ceil(sum / 3); // First part
        const part2 = Math.ceil((sum - part1) / 2);               // Second part
        const part3 = sum - part1 - part2;   // Third part ensures the total equals sum
        return [part1, part2, part3];
    }
    static getHandSizeCard(cost){
        const card = new TradingCard(CardType.INCREASE_HAND_SIZE,null, Shop.increaseHandSizeBasePrice + Shop.increaseHandSizeSquarePrice * Shop.increaseHandSizeSquarePrice);
        card.leagueIdNumber = -1;
        card.container.innerHTML = `
        <trading-card 
            name="+1 HAND SIZE ✋"
            cardLine1="Hold 1 additional card"
            cardLine2="✋"
            cardLine3="✋"
            cardLine4="✋"
            cost="${Shop.increaseHandSizeBasePrice + Shop.increaseHandSizeSquarePrice * Shop.increaseHandSizeSquarePrice}"
            colorLight="#FFFFFF"
            colorMid="#333333"
            colorDark="#000000"
            emoji="✋">
        </trading-card>`.trim();
        return card;
    }

    constructor(){
        this.displaySize = 25
        this.favTeamCards = [];
        this.pitcherCards = [];
        this.sluggerCards = [];
        this.onDisplay = [];
        
    }

    addCards(teamArray){
        for(let i=0; i<teamArray.length;i++){
            if(!this.isCardInShop(teamArray[i].leagueIdNumber)){
                this.favTeamCards.push(
                    new FavTeamCard(
                        CardType.FAV_TEAM,
                        teamArray[i],
                        4,
                        1,
                        new Valuables({"greenMagic":1}),
                        StatsEventType.RUNS_SCORED
                    )
                )
            }
            if(!this.isCardInShop(teamArray[i].getPitcher().leagueIdNumber)){
                this.pitcherCards.push(
                    new TradingCard(
                        CardType.PITCHER,
                        teamArray[i].getPitcher(),
                        20,
                        1,
                        new Valuables({"redMagic":1}),
                        StatsEventType.STRIKEOUTS_THROWN
                    )
                )
            }
            if(!this.isCardInShop(teamArray[i].getSlugger().leagueIdNumber)){
                this.sluggerCards.push(
                    new TradingCard(
                        CardType.SLUGGER,
                        teamArray[i].getSlugger(),
                        2,
                        1,
                        new Valuables({"blueMagic":1}),
                        StatsEventType.HITS
                    )
                )
            }
        }
    }

    attemptShopPurchase(value, user) {
        const card = this.onDisplay[value];
        if (this.isPurchaseAffordable(value, user) && user.hasRoomForThisCard(card)) {
            user.addCards(card);
            user.valuables.money -= card.cost;
            // Mark card as sold
            this.onDisplay[value] = null;
        }
    }

    // getCardDisplay(number){
    //     for(let i=0; i<number; i++){
    //         if(this.onDisplay[i] != null){
    //             this.root.innerHTML += `
    //             <span class="col row">
    //                 <span id="shopCardSlot${i}" class="col-12 text-center">
    //                 </span>
    //                 <div class="col-12 text-center pb-5">
    //                     <button id="shopCardSlot${i}Button" type="button" value=${i} class="shopButton btn btn-outline-warning">BUY ME -${this.onDisplay[i].cost}🌕</button>
    //                 </div>
    //             </span>
    //             `
    //             this.root.querySelector("#shopCardSlot"+i).append(this.onDisplay[i].render())
    //         }
    //     }
    //     // always add the +1 Hand Size card
    //     const handSizeCard = Shop.getHandSizeCard()
    //     this.root.innerHTML += `
    //             <span class="col row">
    //                 <span id="shopCardSlotHandSizeCard" class="col-12 text-center">
    //                 </span>
    //                 <div class="col-12 text-center pb-5">
    //                     <button id="shopCardSlotHandSizeCardButton" type="button" value="-1" 
    //                         class="handSizeCardButton btn btn-outline-warning">BUY ME -${handSizeCard.cost}🌕</button>
    //                 </div>
    //             </span>
    //             `
    //             this.root.querySelector("#shopCardSlotHandSizeCard").append(handSizeCard.render())
    //     return this.root
    // }
    getCardsOnDisplay() {
        this.onDisplay = [
            ...this.sluggerCards.slice(0,  Shop.splitThreeWays(this.displaySize)[0]),
            ...this.favTeamCards.slice(0, Shop.splitThreeWays(this.displaySize)[1]),
            ...this.pitcherCards.slice(0, Shop.splitThreeWays(this.displaySize)[2]),
        ];
        return this.onDisplay;
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
    isCardInShop(leagueIdNumber){
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
    setSluggerCards(number){
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
    setInventoryToZero(){
        // destroy remaining cards
        this.favTeamCards = [];
        this.pitcherCards = [];
        this.sluggerCards = [];
        this.onDisplay = [];
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