class View{

    static addAlert(type, message, autoDismiss = false) {
        const alertContainer = document.getElementById('alertContainer');
        const alertDiv = View.createElement('div',null, `alert alert-${type} alert-dismissible fade py-1 m-1`);
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close py-2" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        alertContainer.appendChild(alertDiv);
        
        // Trigger the animation after DOM reflow
        setTimeout(() => {
            alertDiv.classList.add('show');
        }, 50);

        if(autoDismiss){
            // Auto-remove after 4 seconds
            setTimeout(() => {
                alertDiv.classList.remove('show');
                setTimeout(() => alertDiv.remove(), 500);
            }, 4000);

        }
    }

        
    
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
        this.app.innerHTML = "";
        this.viewContainer = View.createElement("div","viewContainer","container mt-5 pt-5")

        this.alertContainer = View.createElement("span","alertContainer","position-fixed alert-fixed w-25 mt-3 bottom-0 end-0 p-3")
        // news ticker
        //this.newsTickerContainer = View.createElement("div", "newsTickerContainer", "mt-4 bg-danger");
        //this.tickerItems = [];

        // menu bar
        this.navBar = new NavBar();
        // this.addMenuItemHome()
        // this.addMenuItemSchedule()
        // this.addMenuItemStandings()

        // add the pages
        this.pageContainer = View.createElement("div", "pageContainer");
        this.userPage = new UserPage();
        this.pageContainer.append(this.userPage.render());
        

        // stats modal
        this.modal = new StatsModal();
        this.viewContainer.append( this.pageContainer, this.modal.render())
        this.app.append(this.alertContainer, this.newsTickerContainer, this.navBar.render(), this.viewContainer)
        
    }

    addMenuItem(pageId, menuItemId, iconName) {
        const menuItem = View.createElement("li", menuItemId, "nav-item bg-transparent");
        const menuLink = View.createElement(
            "a",
            null,
            "nav-link bg-transparent border-0 link-light link-opacity-25 link-opacity-100-hover"
        );
        menuLink.dataset.linkToPageId = pageId;
        menuLink.innerHTML = `<span class="mt-1 material-symbols-outlined">${iconName}</span>`;
        menuItem.append(menuLink);
        this.navBar.add(menuItem);
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

    

    // bindMenuBarClick(handler) {
    //     this.navBar.root.addEventListener('click', event => {
    //         // console.log(event)
    //         if (event.target.localName === 'span' || event.target.localName === 'nobr'){
    //             const id = event.target.parentElement.dataset.linkToPageId;
    //             handler(id)
    //         }
    //         else if (event.target.localName === 'a') {
    //             //const id = event.target.parentElement.id
    //             const id = event.target.dataset.linkToPageId;
    //             handler(id)
    //         }
    //         else if (event.target.localName === 'text' || event.target.localName === 'polygon' ) {
    //             //const id = event.target.parentElement.id
    //             const id = event.target.parentElement.parentElement.parentElement.parentElement.dataset.linkToPageId;
    //             handler(id)
    //         }
    //     })
    // }

    bindAfternoonContinueButtonClick(handler) {
        const els = document.getElementsByClassName("afternoonContinueButton");
        Array.from(els).forEach((el) => {
            el.addEventListener('click', event => {

                if (event.target.localName === 'button') {

                    handler()
                }
            })
        })
    }

    bindNightContinueButtonClick(handler) {
        const els = document.getElementsByClassName("nightContinueButton");
        Array.from(els).forEach((el) => {
            el.addEventListener('click', event => {

                if (event.target.localName === 'button') {

                    handler()
                }
            })
        })
    }
    
    bindShopContinueButtonClick(handler) {
        const els = document.getElementsByClassName("shopContinueButton");
        Array.from(els).forEach((el) => {
            el.addEventListener('click', event => {

                if (event.target.localName === 'button') {

                    handler()
                }
            })
        })
    }

    // bindShopButtonClick(handler) {
    //     const els = document.getElementsByClassName("shopButton");
    //     Array.from(els).forEach((el) => {
    //         el.addEventListener('click', event => {

    //             if (event.target.localName === 'button') {
    //                 const id = event.target.value
    //                 handler(id)
    //             }
    //         })
    //     })
    // }

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

    setTime(model) {
        const dateAndTime = document.getElementById('dateAndTime');
        if (dateAndTime) {
            dateAndTime.innerHTML = `Year ${model.world.year} Day ${model.world.day}`;
        }
    }



}