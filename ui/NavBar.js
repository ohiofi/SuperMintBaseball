class NavBar {
    constructor(){
        this.root = View.createElement("nav","navbar","navbar navbar-expand-sm bg-111 navbar-dark fixed-top flex-wrap")
        this.root.innerHTML = `
            <div id="newsTickerContainer" class="mt-1 col-12 small"></div>
            <div class="container col-12">
                <a class="navbar-brand text-secondary link-light link-opacity-25 link-opacity-100-hover" data-link-to-page-id="homePage" href="#">ioBaseball</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul id="navBarList" class="navbar-nav me-auto">

                </ul>
                <span class="d-flex">
                    <a class="material-symbols-outlined text-secondary link link-light link-opacity-25 link-opacity-100-hover text-decoration-none">
                        account_circle
                    </a>
                </span>
                </div>
            </div>
        `
    }

    add(newElement){
        document.getElementById("navBarList").appendChild(newElement);
    }

    render(){
        return this.root;
    }
}