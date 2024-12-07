class ShopView extends View{

    constructor(){
        super();
        this.addMenuItemHome()
        this.addMenuItemSchedule()
        this.addMenuItemStandings()

        // home
        this.homePage = new HomePage();
        this.pageContainer.append(this.homePage.render());

        // schedule
        this.schedulePage = new SchedulePage()
        this.pageContainer.append(this.schedulePage.render());

        // standings page
        this.standingsPage = new StandingsPage();
        this.pageContainer.append(this.standingsPage.render());

    }

    getCardDisplayCase(onDisplayArray){
        const cardDisplayCase = View.createElement("div","shopCardDisplayCase"," row p-5 gx-5")
        for(let i=0; i<onDisplayArray.length; i++){
            if(onDisplayArray[i] != null){
                cardDisplayCase.innerHTML += `
                <span class="col row">
                    <span id="shopCardSlot${i}" class="col-12 text-center">
                    </span>
                    <div class="col-12 text-center pb-5">
                        <button id="shopCardSlot${i}Button" type="button" value=${i} class="shopButton btn btn-outline-warning">BUY ME -${onDisplayArray[i].cost}💰</button>
                    </div>
                </span>
                `
                cardDisplayCase.querySelector("#shopCardSlot"+i).append(onDisplayArray[i].render())
            }
        }
        // always add the +1 Hand Size card
        const handSizeCard = Shop.getHandSizeCard()
        cardDisplayCase.innerHTML += `
                <span class="col row">
                    <span id="shopCardSlotHandSizeCard" class="col-12 text-center">
                    </span>
                    <div class="col-12 text-center pb-5">
                        <button id="shopCardSlotHandSizeCardButton" type="button" value="-1" 
                            class="handSizeCardButton btn btn-outline-warning">BUY ME -${handSizeCard.cost}💰</button>
                    </div>
                </span>
                `
                cardDisplayCase.querySelector("#shopCardSlotHandSizeCard").append(handSizeCard.render())
        return cardDisplayCase
    }
    
    setupShopView(model) {
        this.setTime(model);

        // Update user information
        this.userPage.updateUserInfo(model.users[0]);
        this.userPage.setCardDisplay(model.users[0]);
        this.navBar.setCounters(model.users[0]);

        // Handle user icon nag
        if (model.users[0].hasClickedUserIcon) {
            document.getElementById("userIconNag").classList.add("hide");
        }

        // Schedule
        this.schedulePage.addSchedule(model.world.league.getSchedule());

        // Set up the shop display
        const shopDisplay = this.getCardDisplayCase(model.world.shop.getCardsOnDisplay());
        this.homePage.setShop(shopDisplay);

        // Standings
        this.standingsPage.update(
            model.world.league.getStandingsTableTeams(),
            model.world.league.getStandingsTablePitchers(10),
            model.world.league.getStandingsTableBatters(10)
        );

        // Set up news ticker
        model.world.newsTicker.setShopText(); // Ensure the shop text is added
        this.navBar.renderTicker(model.world.newsTicker.items); // create ticker items
        const newsTickerRibbonSize = document.getElementById('newsTickerRibbon').clientWidth;
        model.world.newsTicker.setSpeed(newsTickerRibbonSize / 100);
    }

    updateShopView(value){
        document.getElementById("shopCardSlot" + value + "Button").disabled = true;
        document.getElementById("shopCardSlot" + value + "Button").textContent = "SOLD";
        document.getElementById("shopCardSlot" + value + "Button").classList.remove("btn-warning");
        document.getElementById("shopCardSlot" + value + "Button").classList.add("btn-black");
        document.getElementById("shopCardSlot" + value).style.opacity = 0.25;
    }
}