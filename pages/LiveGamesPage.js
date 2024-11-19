class LiveGamesPage {
    constructor() {
        this.page = View.createElement("div", "liveGamesPage", ["page", "hide"]);
        this.headline = View.createElement("h3", null, "pb-4", "Live Games");
        this.page.append(this.headline);

        this.widgetsContainer = View.createElement("div", "widgetsContainer", "container");
        this.page.append(this.widgetsContainer);

        this.widgets = []
    }

    addGameWidgets(gameMessages) {
        for (let i = 0; i < gameMessages.length; i++) {
            this.widgets[i] = new GameWidget(i, gameMessages[i])
            
            widgetsContainer.append(this.widgets[i].widget);
            this.page.append(this.widgetsContainer);
        }

        
    }


    
}