class StatsModal {
    constructor() {
        this.root = View.createElement("div", "statsModal", "modal");
        this.root.innerHTML = `
            <div class="modal-dialog modal-dialog-centered  modal-lg">
                <div class="modal-content bg-dark">
                    <div class="modal-header bg-dark text-light border-0">
                        <h4 id="statsModalTitle" class="modal-title">Modal Heading</h4>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div id="statsModalBody" class="modal-body bg-dark text-light">
                        Modal body..
                    </div>
                </div>
            </div>
        `.trim();
    }
    update(leagueIdNumber) {
        console.log("modal "+leagueIdNumber)
        const object = app.model.world.league.lookup(leagueIdNumber);
        if (object === null) throw new Error("updateModal could not find " + leagueIdNumber);

        document.getElementById("statsModalTitle").innerHTML = object.getFullName();
        document.getElementById("statsModalBody").innerHTML = object.getStatsTable();
    }
    render() {
        return this.root;
    }
}