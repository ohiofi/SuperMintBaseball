class NightView extends View{
    constructor(){
        super();
        this.addMenuItemHome()
        this.addMenuItemSchedule()
        this.addMenuItemStandings()

        // home
        this.homePage = new NightHomePage();
        this.pageContainer.append(this.homePage.render());

        // schedule
        this.schedulePage = new SchedulePage()
        this.pageContainer.append(this.schedulePage.render());

        // standings page
        this.standingsPage = new StandingsPage();
        this.pageContainer.append(this.standingsPage.render());
    }

    setupNightView(model) {
        this.setTime(model);
        // navbar stuff
        this.navBar.setCounters(model.users[0]);
        this.userPage.setCardDisplay(model.users[0]);
        this.userPage.updateUserInfo(model.users[0]);
        if (model.users[0].hasClickedUserIcon) {
            document.getElementById("userIconNag").classList.add("hide");
        }

        //
        
        // this.addMenuItemSingleGamePages(model.world);
        // set up news ticker
        // const gameDetails = model.world.getGameDetails();
        // const tickerArray = gameDetails.map(each => each.scoreString);
        model.world.newsTicker.setItems(["🆘 PLEASE STAY TUNED FOR A SPECIAL ANNOUNCEMENT 🆘", "🆘 PLEASE STAY TUNED FOR A SPECIAL ANNOUNCEMENT 🆘"]);
        this.navBar.renderTicker(model.world.newsTicker.items); // Display the updated ticker items
        const newsTickerRibbonSize = document.getElementById('newsTickerRibbon').clientWidth;
        model.world.newsTicker.setSpeed(newsTickerRibbonSize / 100);

        this.schedulePage.addSchedule(model.world.league.getSchedule(model.world.year));

        const standings = {
            teams: model.world.league.getStandingsTableTeams(),
            pitchers: model.world.league.getStandingsTablePitchers(10),
            batters: model.world.league.getStandingsTableBatters(10),
        };
        this.standingsPage.update(standings.teams, standings.pitchers, standings.batters);
        const els = document.getElementsByClassName("nightContinueButton");
        Array.from(els).forEach((el) => { el.classList.add("hide")});
        
        //this.liveGamesPage.addGameWidgets(gameDetails);
        // single game pages
        //this.addAllSingleGamePages(model.world);
        
    }
}