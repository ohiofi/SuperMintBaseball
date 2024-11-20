class LiveGamesPage {
    constructor() {
        this.root = View.createElement("div", "liveGamesPage", ["page", "hide"]);
        this.headline = View.createElement("h3", null, "pb-4", "Live Games");
        this.root.append(this.headline);

        this.widgetsContainer = View.createElement("div", "widgetsContainer", "container");
        this.root.append(this.widgetsContainer);

        this.widgets = []
    }

    addGameWidgets(gameMessages) {
        for (let i = 0; i < gameMessages.length; i++) {
            this.widgets[i] = new GameWidget(i, gameMessages[i])
            //widgetsContainer.append(this.widgets[i].render());
            //this.widgets[i] = View.createElement("game-widget");
            // this.widgets[i].setAttribute("page-number",i);
            // this.widgets[i].setAttribute("away-id", gameMessages[i].awayId);
            // this.widgets[i].setAttribute("home-id",gameMessages[i].homeId);
            this.widgetsContainer.append(this.widgets[i].render())
            
        }
        this.root.append(this.widgetsContainer);
        
    }

    render(){
        return this.root;
    }


    
}