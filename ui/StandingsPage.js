class StandingsPage{
    constructor(){
        this.root = View.createElement("div","standingsPage","page hide");
        this.root.innerHTML = `
        <h3 id="standingsPageHeadline" class="pb-4">Previous Standings</h3>

        <div class="row">
            <div class="pageSummary col pb-4">
                Today's games are currently being played. Standings will be updated once today's games are finished.
            </div>
            <div class="col">
                <button type="button" class="continueButton bouncy btn btn-warning hide">CONTINUE</button>
            </div>
        </div>
        <div id="standingsSection"></div>
        `.trim();
    }
    render(){
        return this.root;
    }
}