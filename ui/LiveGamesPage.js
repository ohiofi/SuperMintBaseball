class LiveGamesPage {
    constructor() {
        this.root = View.createElement("div", "liveGamesPage", "page hide");
        this.root.innerHTML = `
            <h3 id="liveGamesPageHeadline" class="pb-4  display-6 ">Live Games</h3>
            <div class="row">
                <div class="pageSummary col pb-4">Today's games are currently being played</div>
                <div class="col">
                    <button type="button" class="continueButton bouncy btn btn-warning hide">CONTINUE</button>
                </div>
            </div>
            <div id="widgetsContainer" class="container"></div>
        `.trim();
        this.widgets = [];
    }

    addGameWidgets(gameMessages) {
        const widgetsContainer = this.root.querySelector('#widgetsContainer');
        for (let i = 0; i < gameMessages.length; i++) {
            this.widgets[i] = new GameWidgetComponent()
            this.widgets[i].render(gameMessages[i])
            widgetsContainer.append(this.widgets[i])
        }
    }

    render(){
        return this.root;
    }

    updateGameWidgets(gameDetails) {
        gameDetails.forEach((detail, i) => {
            this.widgets[i].render(detail);
        });
    }


    
}