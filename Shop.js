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
                    1,
                    new Valuables({"caps":1}),
                    StatsEventType.HITS
                ))
        }
    }

    getCards(number){
        for(let i=0; i<number; i++){
            const indexToRemove = Math.floor(rng.random()*this.pitcherCards.length)
            this.onDisplay.push(this.pitcherCards.splice(indexToRemove, 1)[0]);
            this.root.innerHTML += `
            <span class="col col-md-4  row">
                <span id="slot${i}" class="col-12 text-center">
                </span>
                <div class="col-12 text-center">
                    <button type="button" class="btn btn-warning">BUY ME!</button>
                </div>
            </span>
            `
            this.root.querySelector("#slot"+i).append(this.onDisplay[i].render())
        }
        return this.root
    }
}