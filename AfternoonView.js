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

//     addMenuItemHome() {
//         const menuItem = View.createElement("li", "homePageMenuItem", "page-item active");
//         const menuLink = View.createElement("a", null, "page-link bg-transparent border-0 link-light link-opacity-25 link-opacity-100-hover")
//         menuLink.dataset.linkToPageId = "homePage";
//         menuLink.innerHTML = `<span class="material-symbols-outlined size-48">
// home
// </span>`;
//         menuItem.append(menuLink);
//         this.navBar.add(menuItem);
//     }

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
        const dropdownNavItem = View.createElement("li","dropdownNavItem","nav-item dropdown pt-2")
        dropdownNavItem.innerHTML = `
            <a class="nav-link dropdown-toggle text-secondary" href="#" role="button" data-bs-toggle="dropdown">Games</a>
            <ul id="singleGamesDropdownMenu" class="dropdown-menu bg-dark">
            </ul>
        `.trim();
        for (let i = 0; i < scores.length; i++) {
            const dropdownLi = View.createElement("li", "game" + i + "PageMenuItem", "bg-dark");
            const dropdownA = View.createElement("a", null, "dropdown-item bg-transparent border-0 link-light link-opacity-25 link-opacity-100-hover");
            dropdownA.dataset.linkToPageId = "game" + i + "Page";
            dropdownA.innerHTML = `<span class="font-monospace size-48">
            ${scores[i].awayTeam} @ ${scores[i].homeTeam}
      </span>`;
            dropdownLi.append(dropdownA);
            dropdownNavItem.querySelector("#singleGamesDropdownMenu").append(dropdownLi);
            this.navBar.add(dropdownNavItem);
        }
    }

//     addMenuItemStandings() {
//         const menuItem = View.createElement("li", "standingsPageMenuItem", "page-item bg-transparent");
//         const menuLink = View.createElement("a", null, "page-link bg-transparent border-0 link-light link-opacity-25 link-opacity-100-hover")
//         menuLink.dataset.linkToPageId = "standingsPage";
//         menuLink.innerHTML = `<span class="material-symbols-outlined">
// format_list_numbered
// </span>`;
//         menuItem.append(menuLink);
//         this.navBar.add(menuItem);
//     }





    addNewsTickerItems(game) {
        const newsTickerRibbon = View.createElement("p", "newsTickerRibbon", null);
        const scores = game.getGameDetails();
        // add 2x as many items as there are games. add 4x if only 1 or 2 games.
        let multiplier = 2;
        if (scores.length < 3) multiplier = 4
        for (let i = 0; i < scores.length * multiplier; i++) {
            this.tickerItems[i] = View.createElement("span", null, "newsTickerItem");
            this.tickerItems[i].innerHTML = scores[i % scores.length].scoreString;

            newsTickerRibbon.append(this.tickerItems[i]);
        }
        document.getElementById("newsTickerContainer").append(newsTickerRibbon);
    }

    // bindContinueButtonClick(handler) {
    //     const els = document.getElementsByClassName("continueButton");
    //     Array.from(els).forEach((el) => {
    //         el.addEventListener('click', event => {

    //             if (event.target.localName === 'button') {

    //                 handler()
    //             }
    //         })
    //     })
    // }

    // bindMenuBarClick(handler) {
    //     this.navBar.addEventListener('click', event => {
    //         if (event.target.localName === 'span') {
    //             //const id = event.target.parentElement.id
    //             const id = event.target.parentElement.dataset.linkToPageId;
    //             handler(id)
    //         }
    //         if (event.target.localName === 'a') {
    //             //const id = event.target.parentElement.id
    //             const id = event.target.dataset.linkToPageId;
    //             handler(id)
    //         }
    //     })
    // }

    // showPage(pageName) {
    //     const els = document.getElementsByClassName("page");
    //     Array.from(els).forEach((el) => {
    //         el.classList.add("hide")
    //     });
    //     const page = document.getElementById(pageName);
    //     page.classList.remove("hide");

    //     // switch active menu bar item
    //     const items = document.getElementsByClassName("page-item");
    //     Array.from(items).forEach((listItem) => {
    //         listItem.classList.remove("active")
    //     });
    //     document.getElementById(pageName + "MenuItem").classList.add("active");

    //     // scroll down the feed
    //     const container = page.querySelector(".messageFeedContainer");
    //     if (container !== null) {
    //         container.scrollTop = container.scrollHeight;
    //         page.querySelector(".messageJumpButton").classList.add("hide");
    //     }
    // }

    showTodayIsDone() {
        this.homePage.root.querySelector("#homePageHeadline").textContent = "Today is Done";

        this.standingsPage.root.querySelector("#standingsPageHeadline").textContent = "Current Standings";

        this.liveGamesPage.root.querySelector("#liveGamesPageHeadline").textContent = "(Formerly) Live Games";

        const items = document.getElementsByClassName("pageSummary");
        Array.from(items).forEach((each) => {
            each.innerHTML = `All of today's games have finished!`;
        });
        const btns = document.getElementsByClassName("continueButton");
        Array.from(btns).forEach((btn) => {
            btn.classList.remove("hide");
        });

    }
}