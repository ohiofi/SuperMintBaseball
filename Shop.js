class Shop{
    constructor(){
        this.root = View.createElement("div","shop","container row pb-4")
        this.pitcherCards = [];
        this.sluggerCards = [];
        this.onDisplay = [];
    }

    getThreeCards(){
        for(let i=0; i<3; i++){
            const indexToRemove = Math.floor(rng.random()*this.pitcherCards.length)
            this.onDisplay.push(this.pitcherCards.splice(indexToRemove, 1)[0])
        }
        this.root.innerHTML = `
            <span class="col col-md-4  row">
                <span id="slot1" class="col-12 text-center">
                </span>
                <div class="col-12 text-center">
                    <button type="button" class="btn btn-warning">BUY ME!</button>
                </div>
            </span>
            <span class="col col-md-4  row">
                <span id="slot2" class="col-12  text-center">
                </span>
                <div class="col-12 text-center">
                    <button type="button" class="btn btn-warning">BUY ME!</button>
                </div>
            </span>
            <span class="col col-md-4  row">
                <span id="slot3" class="col-12 text-center">
                </span>
                <div class="col-12 text-center">
                    <button type="button" class="btn btn-warning">BUY ME!</button>
                </div>
            </span>
        `
        this.root.querySelector("#slot1").append(this.onDisplay[0].render())
        this.root.querySelector("#slot2").append(this.onDisplay[1].render())
        this.root.querySelector("#slot3").append(this.onDisplay[2].render())
        return this.root
    }
}