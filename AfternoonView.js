class AfternoonView extends View{
    

    constructor() {
        super();
        //this.app = document.querySelector("#root");

        //this.app.innerHTML = null

        // news ticker
        //this.newsTickerContainer = View.createElement("div", "newsTickerContainer", "mt-4");
        //this.tickerItems = [];

        // menu bar
        //this.navBar = new NavBar();
        // this.navBar = View.createElement("ul", "pageMenuBar", "pagination border-0");
        this.addMenuItemHome()
        this.addMenuItemSchedule()
        this.addMenuItemStandings()
        this.addMenuItemLive()

        //this.pageContainer = View.createElement("div", "pageContainer");

        // // home
        this.homePage = new AfternoonHomePage();
        this.pageContainer.append(this.homePage.render());

         // standings page
         this.standingsPage = new StandingsPage();
         this.pageContainer.append(this.standingsPage.render());

        // schedule
        this.schedulePage = new SchedulePage()
        this.pageContainer.append(this.schedulePage.render());

       

        // live games
        this.liveGamesPage = new LiveGamesPage();
        this.gameWidgetContainer = View.createElement("div", "game-widget-container", "container");
        this.gameWidgetItems = [];
        this.pageContainer.append(this.liveGamesPage.render());

        // a bunch of single game pages
        this.singleGamePages = [];

        // stats modal
        //this.modal = new StatsModal();
        
    }

    

    addAllSingleGamePages(game) {
        // this.addPageHome(game);
        const scores = game.getGameDetails();
        for (let i = 0; i < scores.length; i++) {
            this.singleGamePages[i] = new SingleGamePage(i, scores[i]);
            this.pageContainer.append(this.singleGamePages[i].render());
        }
    }

    addMenuItemLive() {
        const menuItem = View.createElement("li", "liveGamesPageMenuItem", "nav-item bg-transparent pt-1");
        const menuLink = View.createElement("a", null, "nav-link bg-transparent border-0 link-light link-opacity-25 link-opacity-100-hover")
        menuLink.dataset.linkToPageId = "liveGamesPage";
        menuLink.innerHTML = `<span class="material-symbols-outlined size-24">
stadium
</span>`;
        menuItem.append(menuLink);
        this.navBar.add(menuItem);
    }

    addMenuItemSingleGamePages(game) {
        const scores = game.getGameDetails();
        const dropdownNavItem = View.createElement("li","dropdownNavItem","nav-item dropdown pt-1")
        dropdownNavItem.innerHTML = `
            <a class="nav-link dropdown-toggle link-light link-opacity-25 link-opacity-100-hover" href="#" role="button" data-bs-toggle="dropdown"><span class="material-symbols-outlined">
sports_baseball
</span></a>
            <ul id="singleGamesDropdownMenu" class="dropdown-menu bg-dark shadow">
            </ul>
        `.trim();
        for (let i = 0; i < scores.length; i++) {
            const dropdownLi = View.createElement("li", "game" + i + "PageMenuItem", "bg-dark");
            const dropdownA = View.createElement("a", null, "dropdown-item bg-transparent border-0 link-light link-opacity-25 link-opacity-100-hover");
            dropdownA.dataset.linkToPageId = "game" + i + "Page";
            dropdownA.innerHTML = `<span class="size-48">
            ${scores[i].awayTeam} @ ${scores[i].homeTeam}
      </span>`;
            dropdownLi.append(dropdownA);
            dropdownNavItem.querySelector("#singleGamesDropdownMenu").append(dropdownLi);
            this.navBar.add(dropdownNavItem);
        }
    }

    setupAfternoonView(model) {
        this.setTime(model);
        // navbar stuff
        this.navBar.setCounters(model.users[0]);
        this.userPage.setCardDisplay(model.users[0]);
        this.userPage.updateUserInfo(model.users[0]);
        if (model.users[0].hasClickedUserIcon) {
            document.getElementById("userIconNag").classList.add("hide");
        }

        //
        
        this.addMenuItemSingleGamePages(model.world);
        // set up news ticker
        const gameDetails = model.world.getGameDetails();
        const tickerArray = gameDetails.map(each => each.scoreString);
        model.world.newsTicker.setItems(tickerArray);
        this.navBar.renderTicker(model.world.newsTicker.items); // Display the updated ticker items
        console.log(this.navBar)
        const newsTickerRibbonSize = document.getElementById('newsTickerRibbon').clientWidth;
        model.world.newsTicker.setSpeed(newsTickerRibbonSize / 100);

        this.homePage.addGameTableScores(gameDetails);
        

        this.schedulePage.addSchedule(model.world.league.getSchedule(model.world.year));

        const standings = {
            teams: model.world.league.getStandingsTableTeams(),
            pitchers: model.world.league.getStandingsTablePitchers(10),
            batters: model.world.league.getStandingsTableBatters(10),
        };
        this.standingsPage.update(standings.teams, standings.pitchers, standings.batters);
        
        this.liveGamesPage.addGameWidgets(gameDetails);
        // single game pages
        this.addAllSingleGamePages(model.world);
        
    }

    showTodayIsDone() {
        this.homePage.root.querySelector("#homePageHeadline").textContent = "Today is Done";

        this.standingsPage.root.querySelector("#standingsPageHeadline").textContent = "Current Standings";

        this.liveGamesPage.root.querySelector("#liveGamesPageHeadline").textContent = "(Formerly) Live Games";

        const items = document.getElementsByClassName("pageSummary");
        Array.from(items).forEach((each) => {
            each.innerHTML = `All of today's games have finished!`;
        });
        const btns = document.getElementsByClassName("afternoonContinueButton");
        Array.from(btns).forEach((btn) => {
            btn.classList.remove("hide");
        });

    }
}