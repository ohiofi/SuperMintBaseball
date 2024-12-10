class StandingsPage{
    constructor(){
        this.root = View.createElement("div","standingsPage","page hide");
        this.root.innerHTML = `
        <h3 id="standingsPageHeadline" class="pb-4  display-6 ">Previous Standings</h3>

        <div class="row">
            <div class="pageSummary col pb-4">
                Today's games are currently being played. Standings will be updated once today's games are finished.
            </div>
            <div class="col">
                <button type="button" class="afternoonContinueButton bouncy btn btn-warning hide">CONTINUE</button>
            </div>
        </div>
        <div id="standingsSection"></div>
        `.trim();
    }
    render(){
        return this.root;
    }
    update(teamTable, pitchersTable, battersTable){
        const standingsSection = this.root.querySelector("#standingsSection")
        standingsSection.innerHTML = 
            `<div class="row"><div class="col-lg-6">`+ teamTable 
            + `</div><div class="col-lg-6">` + pitchersTable 
            + battersTable + "</div>";
    }
}