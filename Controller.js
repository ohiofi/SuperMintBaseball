class Controller {



    

    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.speed = 3000;

        let crestString = "";
        for (let each of this.model.world.league.teams) {
            crestString += each.crest.render()
        }
        document.getElementById("footerFinalRow").innerHTML = crestString;
        //this.model.world.league.skipToday()

       
        this.setupCurrentView();

        
    }

    

    // setupAfternoonView() {
    //     this.view = new AfternoonView();
    //     this.setTime();
        

    //     // set user info
    //     this.view.navBar.setCounters(this.model.users[0])
    //     this.view.userPage.setCardDisplay(this.model.users[0])
    //     // navbar
    //     if(this.model.users[0].hasClickedUserIcon){
    //         document.getElementById("userIconNag").classList.add("hide");
    //     }

    //     this.view.schedulePage.addSchedule(this.model.world.league.getSchedule())
    //     this.view.addMenuItemSingleGamePages(this.model.world);
    //     this.view.bindMenuBarClick(this.handleShowPage)
    //     // set up ticker items
    //     const gameDetails = this.model.world.getGameDetails();
    //     const tickerArray = [];
    //     for (let each of gameDetails) {
    //         tickerArray.push(each.scoreString);
    //     }
    //     this.model.world.newsTicker.addItems(tickerArray);

    //     // set the ticker speed
    //     const newsTickerRibbonSize = document.getElementById('newsTickerRibbon').clientWidth
    //     this.model.world.newsTicker.setSpeed(newsTickerRibbonSize / 100);
    //     //this.view.addPageMenuItems(this.model.world);
    //     this.view.homePage.addGameTableScores(this.model.world.getGameDetails())
    //     this.view.addAllSingleGamePages(this.model.world);

    //     this.gameDetails = this.model.world.getGameDetails();
    //     this.view.liveGamesPage.addGameWidgets(this.gameDetails);
    //     this.view.standingsPage.update(this.model.world.league.getStandingsTableTeams(), this.model.world.league.getStandingsTablePitchers(10), this.model.world.league.getStandingsTableBatters(10))

    //     this.view.bindContinueButtonClick(this.handleContinueButtonClick);

        // Set a new interval
        // this.gameMessageInterval = setInterval(() => {
        //     app.update();
        // }, this.speed);
    // }

    // setupShopView() {
    //     this.view = new ShopView();
    //     this.setTime();
    //     // update user info
    //     this.view.userPage.update(this.model.users[0])
    //     this.view.userPage.setCardDisplay(this.model.users[0])
    //     // navbar
    //     this.view.navBar.setCounters(this.model.users[0])
    //     if(this.model.users[0].hasClickedUserIcon){
    //         document.getElementById("userIconNag").classList.add("hide");
    //     }

    //     this.view.schedulePage.addSchedule(this.model.world.league.getSchedule())
    //     this.view.bindMenuBarClick(this.handleShowPage)
    //     this.view.standingsPage.update(this.model.world.league.getStandingsTableTeams(), this.model.world.league.getStandingsTablePitchers(10), this.model.world.league.getStandingsTableBatters(10))

    //     this.view.bindContinueButtonClick(this.handleContinueButtonClick);
    //     const cardContainer = this.view.homePage.root.querySelector("#homePageCardContainer")
    //     // set up shop
    //     const numberOfCards = 25
    //     this.model.world.shop.setSluggerCards(Shop.splitThreeWays(numberOfCards)[0])
    //     this.model.world.shop.setFavTeamCards(Shop.splitThreeWays(numberOfCards)[1])
    //     this.model.world.shop.setPitcherCards(Shop.splitThreeWays(numberOfCards)[2])
    //     this.view.homePage.setShop(this.model.world.shop.getCardDisplay(numberOfCards));
    //     this.view.bindShopBuyButtonClick(this.handleShopBuyButtonClick);
    //     this.model.world.newsTicker.setShopText();
    //     // set the ticker speed
    //     const newsTickerRibbonSize = document.getElementById('newsTickerRibbon').clientWidth
    //     this.model.world.newsTicker.setSpeed(newsTickerRibbonSize / 100);
    // }

    handleAfternoonContinueButtonClick = () => {
        // update the model state
        this.model.next()
        // update the view
        this.setupCurrentView()
        // const els = document.getElementsByClassName("afternoonContinueButton");
        // Array.from(els).forEach((el) => { el.classList.add("hide")});
    }

    handleShopContinueButtonClick = () => {
        // update the model state
        this.model.next()
        // update the view
        this.setupCurrentView()
        // const els = document.getElementsByClassName("shopContinueButton");
        // Array.from(els).forEach((el) => { el.classList.add("hide")});
    }

    handleNightContinueButtonClick = () => {
        // update the model state
        this.model.next()
        // update the view
        this.setupCurrentView()
        // const els = document.getElementsByClassName("shopContinueButton");
        // Array.from(els).forEach((el) => { el.classList.add("hide")});
    }


    handleShopBuyButtonClick = (value) => {
        if (this.model.world.shop.isPurchaseAffordable(value, this.model.users[0]) 
            && this.model.users[0].hasRoomForThisCard(this.model.world.shop.onDisplay[value])
            ) {
            this.model.attemptShopPurchase(value, this.model.users[0])
            
            //this.view.userPage.updateUserInfo(this.model.users[0]);
            this.view.userPage.setCardDisplay(this.model.users[0]);

            // update the shop view
            this.view.updateShopView(value);
        }
        else if (!this.model.users[0].hasRoomForThisCard(this.model.world.shop.onDisplay[value])) {
            //console.log(this.model.world.shop.onDisplay[value])
            View.addAlert("danger", `Oops! No room for more cards! You have ${this.model.users[0].cards.length}/${this.model.users[0].maxCards}<span class="noto">🃏</span>. Either sell one you own OR buy +1 Hand Size`)
        }
        else if (!this.model.world.shop.isPurchaseAffordable(value, this.model.users[0])) {
            //console.log("not enough money")
            View.addAlert("danger", `Oops! Not enough money! You have ${this.model.users[0].valuables.money}<span class="noto">🪙</span>, but that costs ${this.model.world.shop.onDisplay[value].cost}<span class="noto">🪙</span>`)
        }
        //this.view.userPage.updateUserInfo(this.model.users[0])
        //this.view.navBar.setCounters(this.model.users[0])
    }
    handleShopBuyPlusOneHandClick = (value) => {
        console.log(value)
        if (this.model.world.shop.isPurchaseAffordable(value, this.model.users[0]) ) {
            this.model.attemptShopPurchase(value, this.model.users[0])
            
            //this.view.userPage.updateUserInfo(this.model.users[0]);
            this.view.userPage.setCardDisplay(this.model.users[0]);

            // update the shop view
            this.view.disablePlusOneHandCard();
        }
        else if (!this.model.world.shop.isPurchaseAffordable(value, this.model.users[0])) {
            //console.log("not enough money")
            View.addAlert("danger", `Oops! Not enough money! You have ${this.model.users[0].valuables.money}<span class="noto">🪙</span>, but that costs ${this.model.world.shop.onDisplay[value].cost}<span class="noto">🪙</span>`)
        }
        this.view.userPage.updateUserInfo(this.model.users[0])
        this.view.navBar.setCounters(this.model.users[0])
    }
    handleShowPage = (id) => {
        //console.log(id)
        if (!id) return
        this.view.showPage(id);
        if(id === "userPage"){
            this.model.users[0].hasClickedUserIcon = true;
            document.getElementById("userIconNag").classList.add("hide");
        }
    }
    handleSpeedSelect = (speedSelect) => {
        this.speed = speedSelect;
        this.model.users[0].favoriteSpeed = speedSelect;
        if(this.gameMessageInterval){
            clearInterval(this.gameMessageInterval)
            this.startGameLoop()
        }
        
    }

    // setTime(){
    //     this.view.homePage.root.querySelector("#dateAndTime").innerHTML = "Year "+this.model.world.league.currentSeason+" Day "+this.model.world.league.seasons[this.model.world.league.currentSeason].day
    // }

    setupAfternoonView(){
        this.view.setupAfternoonView(this.model)
        this.view.bindAfternoonContinueButtonClick(this.handleAfternoonContinueButtonClick);
        this.view.navBar.bindNavBarClick(this.handleShowPage)
        this.view.userPage.bindSpeedSelect(this.handleSpeedSelect)
        this.startGameLoop();
    }

    setupCurrentView(){
        switch(this.model.state){
            case ModelState.MORNING:
                this.view = new ShopView();
                this.setupShopView()
                break
            case ModelState.AFTERNOON:
                this.view = new AfternoonView();
                this.setupAfternoonView()
                break
            case ModelState.NIGHT:
                this.view = new NightView();
                this.setupNightView()
                break
        }
    }

    setupShopView() {
        // Delegate view setup to the ShopView
        this.view.setupShopView(this.model);
        // Bind events
        this.view.homePage.bindShopBuyButtonClick(this.handleShopBuyButtonClick);
        this.view.homePage.bindShopBuyPlusOneHandClick(this.handleShopBuyPlusOneHandClick);
        this.view.bindShopContinueButtonClick(this.handleShopContinueButtonClick);
        this.view.navBar.bindNavBarClick(this.handleShowPage)
        this.view.userPage.bindSpeedSelect(this.handleSpeedSelect)
        this.model.users[0].manager.subscribe(this.view.navBar.handleEvent)
        this.model.users[0].manager.subscribe(this.view.userPage.handleEvent)
    }

    setupNightView(){
        this.view.setupNightView(this.model)
        this.view.bindNightContinueButtonClick(this.handleNightContinueButtonClick);
        this.view.navBar.bindNavBarClick(this.handleShowPage)
        this.view.userPage.bindSpeedSelect(this.handleSpeedSelect)
        this.model.world.plot.setIntroScript(this.model)
        this.startGameLoop()
    }

    startGameLoop() {
        this.gameMessageInterval = setInterval(() => {
            this.update()
        }, this.speed);
    }

    update(){
        if(this.model.state === ModelState.AFTERNOON) this.updateAfternoon();
        if(this.model.state === ModelState.NIGHT) this.updateNight();
    }

    updateAfternoon() {
        const gameMessages = this.model.world.nextGameMessages(this.model.world.year, this.model.world.day);
        // update home page scores
        this.view.homePage.addGameTableScores(gameMessages);
        // Live Games
        this.view.liveGamesPage.updateGameWidgets(gameMessages);
        // single game pages
        // Update single game pages
        for (let i = 0; i < gameMessages.length; i++) {
            if (this.view.singleGamePages[i]) {
                this.view.singleGamePages[i].update(gameMessages[i]);
            }
            if (this.view.liveGamesPage.widgets[i]) {
                this.view.liveGamesPage.widgets[i].render(gameMessages[i]);
            }
        }
        // ticker
        this.model.world.newsTicker.update(gameMessages);
        const tickerItems = this.model.world.newsTicker.getVisibleTickerItems();
        this.view.navBar.setTickerItems(tickerItems);
        // update user info
        this.view.navBar.setCounters(this.model.users[0]);
        this.view.userPage.updateUserInfo(this.model.users[0]);
        // Check if all games are done
        if (this.model.world.league.isTodayDone(this.model.world.year,this.model.world.day)) {
            this.view.showTodayIsDone();
            clearInterval(this.gameMessageInterval)
            // update news ticker one last time
            setTimeout(() => {
                this.model.world.newsTicker.update(gameMessages);
                this.view.navBar.setTickerItems(this.model.world.newsTicker.getVisibleTickerItems());
            }, this.speed)
        }
        
    }

    updateNight(){
        this.view.homePage.addSocialPost(this.model.world.plot.next(this.model));
    }



        // for (let i = 0; i < gameMessages.length; i++) {

        //     // update single game pages
        //     this.view.singleGamePages[i].update(gameMessages[i])
        //     // update game widgets
        //     this.view.liveGamesPage.widgets[i].update(gameMessages[i]);
        // }
        // // update news ticker
        // this.model.world.newsTicker.update(gameMessages);
        // this.model.world.newsTicker.show();
        // // update user info
        // this.view.userPage.update(this.model.users[0])
        // this.view.navBar.setCounters(this.model.users[0])

        // // check if the games are done
        // if (this.model.world.league.isTodayDone()) {
        //     this.view.showTodayIsDone();
        //     this.view.standingsPage.root.querySelector("#standingsSection").innerHTML =
        //         `<div class="row"><div class="col-lg-6">` + this.model.world.league.getStandingsTableTeams()
        //         + `</div><div class="col-lg-6">` + this.model.world.league.getStandingsTablePitchers(10)
        //         + this.model.world.league.getStandingsTableBatters(10) + "</div>";
        //     clearInterval(this.gameMessageInterval)
        //     // update news ticker one last time
        //     setTimeout(() => {
        //         this.model.world.newsTicker.update(gameMessages);
        //         this.model.world.newsTicker.show();
        //     }, this.speed)
        // }
    




}