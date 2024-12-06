class Controller {

    // static addAlert(type, message) {
    //     const aDiv = View.createElement('div',null,
    //         `alert alert-${type} alert-dismissible fade show d-inline-block float-end opacity-100 alert-fixed rounded-4 m-0`);
    //     aDiv.setAttribute('role', 'alert');
    //     aDiv.innerHTML = message +
    //         `<button type="button"
    //         class="btn-close" data-bs-dismiss="alert"
    //         aria-label="Close">
    //     </button>`;
    //     app.view.alertContainer.appendChild(aDiv);
    //     setTimeout(function () {
    //         aDiv.classList.remove('show');
    //         aDiv.remove();
    //     }, 4000);
    // }
    static addAlert(type, message) {
        const alertContainer = document.getElementById('alertContainer');
        const alertDiv = document.createElement('div');
        
        alertDiv.className = `alert alert-${type} alert-dismissible fade`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        app.view.alertContainer.appendChild(alertDiv);
        
        // Trigger the animation after DOM reflow
        setTimeout(() => {
            alertDiv.classList.add('show');
        }, 50);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => alertDiv.remove(), 500);
        }, 4000);
    }
    

    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.speed = 300;

        let crestString = "";
        for (let each of this.model.world.league.teams) {
            crestString += each.crest.render()
        }
        document.getElementById("footerFinalRow").innerHTML = crestString;
        //this.model.world.league.skipToday()

        //this.setupAfternoonView()
        this.setupShopView()


    }

    

    setupAfternoonView() {
        this.view = new AfternoonView();
        this.setTime();
        this.model.world.league.reloadTeams()

        // set user info
        this.view.navBar.setCounters(this.model.users[0])
        this.view.userPage.setCardDisplay(this.model.users[0])
        // navbar
        if(this.model.users[0].hasClickedUserIcon){
            document.getElementById("userIconNag").classList.add("hide");
        }

        this.view.schedulePage.addSchedule(this.model.world.league.getSchedule())
        this.view.addMenuItemSingleGamePages(this.model.world);
        this.view.bindMenuBarClick(this.handleShowPage)
        // set up ticker items
        const gameDetails = this.model.world.getGameDetails();
        const tickerArray = [];
        for (let each of gameDetails) {
            tickerArray.push(each.scoreString);
        }
        this.model.world.newsTicker.addItems(tickerArray);

        // set the ticker speed
        const newsTickerRibbonSize = document.getElementById('newsTickerRibbon').clientWidth
        this.model.world.newsTicker.setSpeed(newsTickerRibbonSize / 100);
        //this.view.addPageMenuItems(this.model.world);
        this.view.homePage.addGameTableScores(this.model.world.getGameDetails())
        this.view.addAllSingleGamePages(this.model.world);

        this.gameDetails = this.model.world.getGameDetails();
        this.view.liveGamesPage.addGameWidgets(this.gameDetails);
        this.view.standingsPage.update(this.model.world.league.getStandingsTableTeams(), this.model.world.league.getStandingsTablePitchers(10), this.model.world.league.getStandingsTableBatters(10))

        this.view.bindContinueButtonClick(this.handleContinueButtonClick);

        // Set a new interval
        this.gameMessageInterval = setInterval(() => {
            app.update();
        }, this.speed);
    }

    setupShopView() {
        this.view = new ShopView();
        this.setTime();
        // update user info
        this.view.userPage.update(this.model.users[0])
        this.view.userPage.setCardDisplay(this.model.users[0])
        // navbar
        this.view.navBar.setCounters(this.model.users[0])
        if(this.model.users[0].hasClickedUserIcon){
            document.getElementById("userIconNag").classList.add("hide");
        }

        this.view.schedulePage.addSchedule(this.model.world.league.getSchedule())
        this.view.bindMenuBarClick(this.handleShowPage)
        this.view.standingsPage.update(this.model.world.league.getStandingsTableTeams(), this.model.world.league.getStandingsTablePitchers(10), this.model.world.league.getStandingsTableBatters(10))

        this.view.bindContinueButtonClick(this.handleContinueButtonClick);
        const cardContainer = this.view.homePage.root.querySelector("#homePageCardContainer")
        // set up shop
        const numberOfCards = 25
        this.model.world.shop.setBatterCards(Shop.splitThreeWays(numberOfCards)[0])
        this.model.world.shop.setFavTeamCards(Shop.splitThreeWays(numberOfCards)[1])
        this.model.world.shop.setPitcherCards(Shop.splitThreeWays(numberOfCards)[2])
        this.view.homePage.setShop(this.model.world.shop.getCardDisplay(numberOfCards));
        this.view.bindShopButtonClick(this.handleShopButtonClick);
        this.model.world.newsTicker.setShopText();
        // set the ticker speed
        const newsTickerRibbonSize = document.getElementById('newsTickerRibbon').clientWidth
        this.model.world.newsTicker.setSpeed(newsTickerRibbonSize / 100);
    }

    handleContinueButtonClick = () => {
        // update the model state
        this.model.next()
        // update the view
        switch(this.model.state){
            case ModelState.MORNING:
                this.setupShopView()
                break
            case ModelState.AFTERNOON:
                this.setupAfternoonView()
                break
            case ModelState.NIGHT:
                break
        }
    }

    handleShopButtonClick = (value) => {
        if (this.model.world.shop.isPurchaseAffordable(value, this.model.users[0]) 
            && this.model.users[0].hasRoomForThisCard(this.model.world.shop.onDisplay[value])
            ) {
            this.model.attemptShopPurchase(value, this.model.users[0])
            // update the view
            document.getElementById("shopCardSlot" + value + "Button").disabled = true;
            document.getElementById("shopCardSlot" + value + "Button").textContent = "SOLD";
            document.getElementById("shopCardSlot" + value + "Button").classList.remove("btn-warning");
            document.getElementById("shopCardSlot" + value + "Button").classList.add("btn-black");
            document.getElementById("shopCardSlot" + value).style.opacity = 0.25;
        }
        else if (!this.model.users[0].hasRoomForThisCard(this.model.world.shop.onDisplay[value])) {
            console.log(this.model.world.shop.onDisplay[value])
            Controller.addAlert("danger", `oops! no room for more cards! you have ${this.model.users[0].cards.length}/${this.model.users[0].maxCards}🃏. can you buy +1 Hand Size?`)
        }
        else if (!this.model.world.shop.isPurchaseAffordable(value, this.model.users[0])) {
            console.log("not enough money")
            Controller.addAlert("danger", `oops! not enough money! you have ${this.model.users[0].valuables.money}💰, but that costs ${this.model.world.shop.onDisplay[value].cost}💰`)
        }
        this.view.userPage.update(this.model.users[0])
        this.view.userPage.setCardDisplay(this.model.users[0])
        this.view.navBar.setCounters(this.model.users[0])
    }
    handleShowPage = (id) => {
        if (!id) return
        this.view.showPage(id);
        if(id === "userPage"){
            this.model.users[0].hasClickedUserIcon = true;
            document.getElementById("userIconNag").classList.add("hide");
        }
    }

    setTime(){
        this.view.homePage.root.querySelector("#dateAndTime").innerHTML = "Year "+this.model.world.league.currentSeason+" Day "+this.model.world.league.seasons[this.model.world.league.currentSeason].day
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
        // update user info
        this.view.userPage.update(this.model.users[0])
        this.view.navBar.setCounters(this.model.users[0])

        // check if the games are done
        if (this.model.world.league.isTodayDone()) {
            this.view.showTodayIsDone();
            this.view.standingsPage.root.querySelector("#standingsSection").innerHTML =
                `<div class="row"><div class="col-lg-6">` + this.model.world.league.getStandingsTableTeams()
                + `</div><div class="col-lg-6">` + this.model.world.league.getStandingsTablePitchers(10)
                + this.model.world.league.getStandingsTableBatters(10) + "</div>";
            clearInterval(this.gameMessageInterval)
            // update news ticker one last time
            setTimeout(() => {
                this.model.world.newsTicker.update(gameMessages);
                this.model.world.newsTicker.show();
            }, this.speed)
        }
    }




}