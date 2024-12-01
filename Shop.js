class Shop{
    constructor(){
        this.root = View.createElement("div","shop","container row pb-4")
        this.pitcherCards = [];
        this.sluggerCards = [];
        this.onDisplay = [];
    }

    addCards(league){
        for(let i=0; i<league.teams.length;i++){
            this.pitcherCards.push(
                new TradingCard(
                    league.teams[i].getPitcher(),
                    20,
                    1,
                    new Valuables({"tickets":1}),
                    StatsEventType.STRIKEOUTS_THROWN
                ))
        }
        for(let i=0; i<league.teams.length;i++){
            this.sluggerCards.push(
                new TradingCard(
                    league.teams[i].getSlugger(),
                    2,
                    10,
                    new Valuables({"caps":10}),
                    StatsEventType.HITS
                ))
        }
    }

    buyCard(user,slotNumber){

    }
    getCards(number){
        for(let i=0; i<number; i++){
            if(this.onDisplay[i] != null){
                this.root.innerHTML += `
                <span class="col row">
                    <span id="cardSlot${i}" class="col-12 text-center">
                    </span>
                    <div class="col-12 text-center">
                        <button id="cardSlot${i}Button" type="button" value=${i} class="shopButton btn btn-warning">BUY ME!</button>
                    </div>
                </span>
                `
                this.root.querySelector("#cardSlot"+i).append(this.onDisplay[i].render())
            }
            // else{
            //     this.root.innerHTML += `
            //     <span class="col row">
            //         <span id="slot${i}" class="col-12 text-center">
            //         SOLD
            //         </span>
            //         <div class="col-12 text-center">
            //             <button disabled type="button" value=${i} class="btn btn-warning">SOLD</button>
            //         </div>
            //     </span>
            //     `
            // }
            
        }
        return this.root
    }
    setPitcherCards(number){
        for(let i=0; i<number; i++){
            const indexToRemove = Math.floor(rng.random()*this.pitcherCards.length)
            const addedCard = this.pitcherCards.splice(indexToRemove, 1)[0]
            this.onDisplay.push(addedCard);
        }
    }

}