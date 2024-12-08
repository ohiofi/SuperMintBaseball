class NavBar {
    constructor(){
        this.root = View.createElement("nav","navbar","navbar navbar-expand-sm bg-111 navbar-dark fixed-top flex-wrap")
        this.root.innerHTML = `
            <div id="newsTickerContainer" class="mt-1 col-12 small"></div>
            <div class="container col-12">
                <a class="fs-5 navbar-brand text-secondary me-2" data-link-to-page-id="homePage" href="#">
                    ioBaseball<span style="font-size:7px;padding:1px;border-radius:2px;" class="badge text-bg-secondary font-monospace m-0">
                        BETA
                    </span>
                    
                </a>
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul id="navBarList" class="navbar-nav me-auto">

                </ul>
                <span class="d-flex ">

                    <span id="counterSection"  class=" text-secondary pt-1 pe-1 small" data-link-to-page-id="userPage">
                        <span id="userIconNag"><span class="badge text-bg-warning bouncy z-3 position-relative top-0 start-50">YOUR CARDS →</span></span>
                        <span id="moneyCounter" class="font-monospace">100</span><span class="opacity-75 small">💰</span>&nbsp;
                        <span id="stocksCounter" class="font-monospace ">1</span><span class="opacity-75 small">💹</span>&nbsp;
                        <span id="ticketsCounter" class="font-monospace ">3</span><span class="opacity-75 small">🎟️</span>&nbsp;
                        <span id="capsCounter" class="font-monospace ">5</span><span class="opacity-75 small">🧢</span>&nbsp;
                        <span class="cardsCount font-monospace ">0</span>/<span class="maxCards font-monospace">5</span><span class="opacity-75  small">🃏</span>
                        
                    </span>
                    
                    
                    

                        
                        <a id="userPageMenuItem" class="material-symbols-outlined text-secondary link link-light link-opacity-25 link-opacity-100-hover text-decoration-none"
                            data-link-to-page-id="userPage" >                   
                            account_circle
                        </a>
              
                    
                </span>
                </div>
            </div>
        `
    }

    add(newElement){
        this.root.querySelector("#navBarList").appendChild(newElement);
    }


    bindNavBarClick(handler) {
        this.root.addEventListener('click', event => {
            // console.log(event)
            if (event.target.localName === 'span' || event.target.localName === 'nobr'){
                const id = event.target.parentElement.dataset.linkToPageId;
                handler(id)
            }
            else if (event.target.localName === 'a') {
                //const id = event.target.parentElement.id
                const id = event.target.dataset.linkToPageId;
                handler(id)
            }
            else if (event.target.localName === 'text' || event.target.localName === 'polygon' ) {
                //const id = event.target.parentElement.id
                const id = event.target.parentElement.parentElement.parentElement.parentElement.dataset.linkToPageId;
                handler(id)
            }
        })
    }

    

    render(){
        return this.root;
    }

    setCounters(user){
        //console.log(38)
        this.root.querySelector("#moneyCounter").innerHTML = user.valuables.money;
        this.root.querySelector("#stocksCounter").innerHTML = user.valuables.stocks;
        this.root.querySelector("#ticketsCounter").innerHTML = user.valuables.tickets;
        this.root.querySelector("#capsCounter").innerHTML = user.valuables.caps;
        this.root.querySelectorAll('.cardsCount').forEach(element => {
            element.innerText = user.cards.length;
        });
        this.root.querySelectorAll('.maxCards').forEach(element => {
            element.innerText = user.maxCards;
        });
    }

    renderTicker(tickerItems) {
        const newsTickerRibbon = View.createElement("p", "newsTickerRibbon", null);
        
        // add 2x as many items as there are games. add 4x if only 1 or 2 games.
        let multiplier = 2;
        if (tickerItems.length < 3) multiplier = 4
        for (let i = 0; i < tickerItems.length * multiplier; i++) {
            const tickerItem = View.createElement("span", null, "newsTickerItem");
            tickerItem.innerHTML = tickerItems[i % tickerItems.length];

            newsTickerRibbon.append(tickerItem);
        }
        document.getElementById("newsTickerContainer").append(newsTickerRibbon);
    }

        

    setTickerItems(tickerItems){
        const parentDiv = document.getElementById('newsTickerContainer');
        const slideDivs = parentDiv.querySelectorAll('.newsTickerItem');
        for (let i = 0; i < slideDivs.length; i++) {
            slideDivs[i].innerHTML = tickerItems[i % tickerItems.length];
        }
    }
}