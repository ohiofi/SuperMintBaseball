class View{
    static createElement(tag, idName, classNames, content) {
        const element = document.createElement(tag);
        if (idName) {
            element.id = idName;
        }
        if (classNames && classNames.indexOf(' ') >= 0) {
            classNames.split(" ").forEach((each) => {
                if (each.length > 0) {
                    element.classList.add(each);
                }

            });
            // for (let each of classNames) {
            //   element.classList.add(each);
            // }
        } else if (classNames) {
            element.classList.add(classNames);
        }
        if (content) {
            element.innerHTML = content;
        }
        return element
    }

    constructor(){
        this.app = document.querySelector("#root");

        // news ticker
        this.newsTickerContainer = View.createElement("div", "newsTickerContainer", "mt-4");
        this.tickerItems = [];

        // menu bar
        this.pageMenuBar = View.createElement("ul", "pageMenuBar", "pagination border-0");
        this.addMenuItemHome()
        this.addMenuItemSchedule()
        this.addMenuItemStandings()

        // add the pages
        this.pageContainer = View.createElement("div", "pageContainer");

        // home
        this.homePage = new HomePage();
        this.pageContainer.append(this.homePage.render());

        // schedule
        this.schedulePage = new SchedulePage()
        this.pageContainer.append(this.schedulePage.render());

        // standings page
        this.standingsPage = new StandingsPage();
        this.pageContainer.append(this.standingsPage.render());

        // stats modal
        this.modal = new StatsModal();
        this.app.append(this.newsTickerContainer, this.pageMenuBar, this.pageContainer, this.modal.render())

        
    }

    addMenuItem(pageId, menuItemId, iconName) {
        const menuItem = View.createElement("li", menuItemId, "page-item bg-transparent");
        const menuLink = View.createElement(
            "a",
            null,
            "page-link bg-transparent border-0 link-light link-opacity-25 link-opacity-100-hover"
        );
        menuLink.dataset.linkToPageId = pageId;
        menuLink.innerHTML = `<span class="material-symbols-outlined">${iconName}</span>`;
        menuItem.append(menuLink);
        this.pageMenuBar.append(menuItem);
    }

    addMenuItemHome() {
        this.addMenuItem("homePage", "homePageMenuItem", "home");
    }
    
    addMenuItemSchedule() {
        this.addMenuItem("schedulePage", "schedulePageMenuItem", "calendar_clock");
    }
    
    addMenuItemStandings() {
        this.addMenuItem("standingsPage", "standingsPageMenuItem", "format_list_numbered");
    }

    bindMenuBarClick(handler) {
        this.pageMenuBar.addEventListener('click', event => {
            if (event.target.localName === 'span') {
                //const id = event.target.parentElement.id
                const id = event.target.parentElement.dataset.linkToPageId;
                handler(id)
            }
            if (event.target.localName === 'a') {
                //const id = event.target.parentElement.id
                const id = event.target.dataset.linkToPageId;
                handler(id)
            }
        })
    }
    bindContinueButtonClick(handler) {
        const els = document.getElementsByClassName("continueButton");
        Array.from(els).forEach((el) => {
            el.addEventListener('click', event => {

                if (event.target.localName === 'button') {

                    handler()
                }
            })
        })
    }

    showPage(pageName) {
        const els = document.getElementsByClassName("page");
        Array.from(els).forEach((el) => {
            el.classList.add("hide")
        });
        const page = document.getElementById(pageName);
        page.classList.remove("hide");

        // switch active menu bar item
        const items = document.getElementsByClassName("page-item");
        Array.from(items).forEach((listItem) => {
            listItem.classList.remove("active")
        });
        document.getElementById(pageName + "MenuItem").classList.add("active");

        // scroll down the feed
        const container = page.querySelector(".messageFeedContainer");
        if (container !== null) {
            container.scrollTop = container.scrollHeight;
            page.querySelector(".messageJumpButton").classList.add("hide");
        }
    }



}