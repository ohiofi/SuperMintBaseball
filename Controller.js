class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        for(let each of this.model.world.league.teams){
            document.getElementById("footerFinalRow").innerHTML+=each.crest.render()
        }
        this.model.world.league.skipToday()

        //this.setupAfternoonView()
        this.setupShopView()
        
        
    }

    setupAfternoonView(){
        this.view = new AfternoonView();
        this.model.world.league.reloadTeams()
        
        this.view.schedulePage.addSchedule(this.model.world.league.getSchedule())
        this.view.addMenuItemSingleGamePages(this.model.world);
        this.view.bindMenuBarClick(this.handleShowPage)
        this.view.addNewsTickerItems(this.model.world);
        
        // set the speed
        const newsTickerRibbonSize = document.getElementById('newsTickerRibbon').clientWidth
        this.model.world.newsTicker.setSpeed(newsTickerRibbonSize/100);
        //this.view.addPageMenuItems(this.model.world);
        this.view.homePage.addGameTableScores(this.model.world.getGameDetails())
        this.view.addAllSingleGamePages(this.model.world);
        
        this.gameDetails = this.model.world.getGameDetails(); 
        this.view.liveGamesPage.addGameWidgets(this.gameDetails);
        document.getElementById("standingsSection").innerHTML = 
            `<div class="row"><div class="col-lg-6">`+this.model.world.league.getStandingsTableTeams() 
        + `</div><div class="col-lg-6">` + this.model.world.league.getStandingsTablePitchers(6) 
        + this.model.world.league.getStandingsTableBatters(6)+"</div>";
        this.view.bindContinueButtonClick(this.handleContinueButtonClick);
        this.speed = 3500;
        // Set a new interval
        this.gameMessageInterval = setInterval(() => {
            app.update();
        }, this.speed);
    }

    setupShopView(){
        this.view.schedulePage.addSchedule(this.model.world.league.getSchedule())
        this.view.bindMenuBarClick(this.handleShowPage)
        document.getElementById("standingsSection").innerHTML = 
            `<div class="row"><div class="col-lg-6">`+this.model.world.league.getStandingsTableTeams() 
        + `</div><div class="col-lg-6">` + this.model.world.league.getStandingsTablePitchers(6) 
        + this.model.world.league.getStandingsTableBatters(6)+"</div>";

        this.view.bindContinueButtonClick(this.handleContinueButtonClick);
        const cardContainer = this.view.homePage.root.querySelector("#homePageCardContainer")
        // set up shop
        this.view.homePage.root.appendChild(this.model.world.shop.getCards(5));
    }

    

    handleContinueButtonClick = () => {
        // update the model state
        this.model.next()
        // update the view
    }
    handleShowPage = (id) => {
        this.view.showPage(id)
    }

    update() {
        const gameMessages = this.model.world.nextGameMessages();
        // update home page scores
        this.view.homePage.addGameTableScores(gameMessages);
        for (let i = 0; i < gameMessages.length; i++) {
            
            // update single game pages
            this.view.singleGamePages[i].update(gameMessages[i])
            // update game widgets
            this.view.liveGamesPage.widgets[i].update(gameMessages[i]);
        }
        // update news ticker
        this.model.world.newsTicker.update(gameMessages);
        this.model.world.newsTicker.show();
        // check if the games are done
        if(this.model.world.league.isTodayDone()){
            this.view.showTodayIsDone();
            this.view.standingsPage.root.querySelector("#standingsSection").innerHTML =
            `<div class="row"><div class="col-lg-6">` + this.model.world.league.getStandingsTableTeams()
            + `</div><div class="col-lg-6">` + this.model.world.league.getStandingsTablePitchers(5)
            + this.model.world.league.getStandingsTableBatters(5) + "</div>";
            clearInterval(this.gameMessageInterval)
            // update news ticker one last time
            setTimeout(()=>{
                this.model.world.newsTicker.update(gameMessages);
                this.model.world.newsTicker.show();
            }, this.speed)
        }
    }




}