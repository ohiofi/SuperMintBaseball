class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.speed = 1000;

        let crestString = "";
        for(let each of this.model.world.league.teams){
            crestString+=each.crest.render()
        }
        document.getElementById("footerFinalRow").innerHTML = crestString;
        //this.model.world.league.skipToday()

        this.setupAfternoonView()
        //this.setupShopView()
        
        
    }

    setupAfternoonView(){
        this.view = new AfternoonView();
        this.model.world.league.reloadTeams()
        
        this.view.schedulePage.addSchedule(this.model.world.league.getSchedule())
        this.view.addMenuItemSingleGamePages(this.model.world);
        this.view.bindMenuBarClick(this.handleShowPage)
        // set up ticker items
        const gameDetails = this.model.world.getGameDetails();
        const tickerArray = [];
        for(let each of gameDetails){
            tickerArray.push(each.scoreString);
        }
        this.view.addNewsTickerItems(tickerArray);
        
        // set the speed
        const newsTickerRibbonSize = document.getElementById('newsTickerRibbon').clientWidth
        this.model.world.newsTicker.setSpeed(newsTickerRibbonSize/100);
        //this.view.addPageMenuItems(this.model.world);
        this.view.homePage.addGameTableScores(this.model.world.getGameDetails())
        this.view.addAllSingleGamePages(this.model.world);
        
        this.gameDetails = this.model.world.getGameDetails(); 
        this.view.liveGamesPage.addGameWidgets(this.gameDetails);
        this.view.standingsPage.update(this.model.world.league.getStandingsTableTeams(),this.model.world.league.getStandingsTablePitchers(10),this.model.world.league.getStandingsTableBatters(10))
        // document.getElementById("standingsSection").innerHTML = 
        //     `<div class="row"><div class="col-lg-6">`+this.model.world.league.getStandingsTableTeams() 
        //     + `</div><div class="col-lg-6">` + this.model.world.league.getStandingsTablePitchers(10) 
        //     + this.model.world.league.getStandingsTableBatters(10)+"</div>";

        this.view.bindContinueButtonClick(this.handleContinueButtonClick);
        
        // Set a new interval
        this.gameMessageInterval = setInterval(() => {
            app.update();
        }, this.speed);
    }

    setupShopView(){
        this.view = new ShopView();
        this.view.schedulePage.addSchedule(this.model.world.league.getSchedule())
        this.view.bindMenuBarClick(this.handleShowPage)
        this.view.standingsPage.update(this.model.world.league.getStandingsTableTeams(),this.model.world.league.getStandingsTablePitchers(10),this.model.world.league.getStandingsTableBatters(10))

        this.view.bindContinueButtonClick(this.handleContinueButtonClick);
        const cardContainer = this.view.homePage.root.querySelector("#homePageCardContainer")
        // set up shop
        this.model.world.shop.setPitcherCards(10)
        this.view.homePage.setShop(this.model.world.shop.getCards(10));
        this.view.bindShopButtonClick(this.handleShopButtonClick);
        this.view.addNewsTickerItems(["WE ARE BACK!", "I AM THE TICKER","THIS IS AMERICA'S PASTIME... SHOPPING!", "PLAY NICE", "NO STEALING"]);
    }

    handleContinueButtonClick = () => {
        // update the model state
        this.model.next()
        // update the view
    }

    handleShopButtonClick = (value) => {
        // update the shop
        this.model.world.shop.onDisplay[0] == null;
        // update the view
        document.getElementById("cardSlot"+value+"Button").disabled = true;
        document.getElementById("cardSlot"+value+"Button").textContent = "SOLD";
        document.getElementById("cardSlot"+value).style.opacity = 0.25;
        
    }
    handleShowPage = (id) => {
        if(!id) return
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
            + `</div><div class="col-lg-6">` + this.model.world.league.getStandingsTablePitchers(10)
            + this.model.world.league.getStandingsTableBatters(10) + "</div>";
            clearInterval(this.gameMessageInterval)
            // update news ticker one last time
            setTimeout(()=>{
                this.model.world.newsTicker.update(gameMessages);
                this.model.world.newsTicker.show();
            }, this.speed)
        }
    }




}