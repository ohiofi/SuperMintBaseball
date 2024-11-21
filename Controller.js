class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.addNewsTickerItems(this.model.world);
        //this.view.addPageMenuBarItems(this.model.world);
        this.view.homePage.addlistGroupScores(this.model.world)
        this.view.addAllSingleGamePages(this.model.world);
        this.view.addMenuBarItemSingleGamePages(this.model.world);

        this.gameDetails = this.model.world.getGameDetails(); 
        this.view.liveGamesPage.addGameWidgets(this.gameDetails);
        //this.view.addGameMessages(this.gameDetails);

        this.speed = 3000;

        // Set a new interval
        this.gameMessageInterval = setInterval(() => {
            app.update();
        }, this.speed);
    }

    update() {
        const gameMessages = this.model.world.nextGameMessages();
        for (let i = 0; i < gameMessages.length; i++) {
            // update home page scores
            this.view.homePage.listGroupScores[i].innerHTML = gameMessages[i].scoreString;

            // update game widgets
            this.view.liveGamesPage.widgets[i].update(gameMessages[i]);

            // update headlines on single game pages
            this.view.singleGamePages[i].headlineGameScore.innerHTML = gameMessages[i].scoreString;
            // update box scores
            this.view.singleGamePages[i].boxScoreTable.innerHTML = gameMessages[i].boxScoreTable;
            // add game message to single game pages
            this.view.addGameMessages(i, gameMessages[i]);
        }
        
        // update news ticker
        this.model.world.newsTicker.update(gameMessages);
        this.model.world.newsTicker.show();
    }




}