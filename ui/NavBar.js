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
                        <span id="moneyCounter" class="font-monospace">100</span><span class="opacity-75 small">💰</span>&nbsp;
                        <span id="stocksCounter" class="font-monospace ">1</span><span class="opacity-75 small">💹</span>&nbsp;
                        <span id="ticketsCounter" class="font-monospace ">3</span><span class="opacity-75 small">🎟️</span>&nbsp;
                        <span id="capsCounter" class="font-monospace ">5</span><span class="opacity-75 small">🧢</span>&nbsp;
                        <span class="cardsCount font-monospace ">0</span>/<span class="maxCards font-monospace">5</span><span class="opacity-75  small">🃏</span>
                    </span>
                    
                    
                    

                        <span id="userIconNag"><span class="badge text-bg-warning bouncy">YOUR CARDS →</span></span>
                        <a id="userPageMenuItem" class="material-symbols-outlined text-secondary link link-secondary link-opacity-25 link-opacity-100-hover text-decoration-none"
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

    setCounters(user){
        console.log(38)
        this.root.querySelector("#moneyCounter").innerHTML = user.valuables.money;
        this.root.querySelector("#stocksCounter").innerHTML = user.valuables.stocks;
        this.root.querySelector("#ticketsCounter").innerHTML = user.valuables.tickets;
        this.root.querySelector("#capsCounter").innerHTML = user.valuables.caps;
    }

    render(){
        return this.root;
    }
}