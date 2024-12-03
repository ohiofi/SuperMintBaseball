class NavBar {
    constructor(){
        this.root = View.createElement("nav","navbar","navbar navbar-expand-sm bg-111 navbar-dark fixed-top flex-wrap")
        this.root.innerHTML = `
            <div id="newsTickerContainer" class="mt-1 col-12 small"></div>
            <div class="container col-12">
                <a class="navbar-brand text-secondary link-secondary link-opacity-25 link-opacity-100-hover" data-link-to-page-id="homePage" href="#">ioBaseball</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul id="navBarList" class="navbar-nav me-auto">

                </ul>
                <span class="d-flex">
                    
                    <span class=" font-monospace text-secondary pt-1 pe-3" data-link-to-page-id="userPage">
                        <span id="moneyCounter">100</span><span class="opacity-75">💰</span>
                        <span id="stocksCounter">1</span><span class="opacity-75">💹</span>
                        <span id="ticketsCounter">3</span><span class="opacity-75">🎟️</span>
                        <span id="capsCounter">5</span><span class="opacity-75">🧢</span>
                    </span>
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
        this.root.querySelector("#moneyCounter").innerHTML = user.valuables.money;
        this.root.querySelector("#stocksCounter").innerHTML = user.valuables.stocks;
        this.root.querySelector("#ticketsCounter").innerHTML = user.valuables.tickets;
        this.root.querySelector("#capsCounter").innerHTML = user.valuables.caps;
    }

    render(){
        return this.root;
    }
}