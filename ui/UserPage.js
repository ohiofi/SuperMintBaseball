class UserPage{
    constructor(){
        this.root = View.createElement("div","userPage","page hide");
        this.root.innerHTML = `
            <h3 id="userPageHeadline" class="pb-4 display-6 ">User</h3>
            <div class="row">
                <div class="pageSummary col pb-4">You are user</div>
                <div class="col">
                    <button type="button" class="continueButton bouncy btn btn-warning hide">CONTINUE</button>
                </div>
            </div>
            <div class="container mt-5">
            <!-- User Information Card -->
            <div class="card text-secondary bg-222 shadow">
                <div class="card-header text-center">
                    <h3><span id="userName">John Doe</span></h3>
                </div>
                <div class="card-body">
                    
                    <div class="row text-center">
                        <div class="col">
                            <strong>Lives ❤️</strong>
                            <p id="userLives">3</p>
                        </div>
                        <div class="col">
                            <strong>Money 💰</strong>
                            <p id="money">50</p>
                        </div>
                        <div class="col">
                            <strong>Stocks 💹</strong>
                            <p id="stocks">0</p>
                        </div>
                        <div class="col">
                            <strong>Tickets 🎟️</strong>
                            <p id="tickets">0</p>
                        </div>
                        <div class="col">
                            <strong>Caps 🧢</strong>
                            <p id="caps">0</p>
                        </div>
                        <div class="col">
                            <strong>Cards 🃏</strong>
                            <p><span id="cardsCount">0</span>/<span id="maxCards">5</span></p>
                        </div>
                    </div>

                    <div id="userPageCardContainer" class="row"></div>
                    
                </div>
            </div>
        </div>
        
        `.trim();
    }

    setCardDisplay(user){
        this.root.querySelector("#userPageCardContainer").innerHTML = "";
        for(let i=0; i<user.cards.length; i++){
            
            this.root.querySelector("#userPageCardContainer").innerHTML += `
            <span class="col row">
                <span id="userCardSlot${i}" class="col text-center">
                </span>
                <div class="col-12 text-center pb-5">
                    <button id="userCardSlot${i}Button" type="button" value=${i} class="shopButton btn btn-danger">SELL ME +${user.cards[i].cost/2}💰</button>
                </div>
            </span>
            `
            this.root.querySelector("#userCardSlot"+i).append(user.cards[i].render())
        }    
    }

    update(user) {
        // Update the user name, lives, valuables, and cards count in the HTML
        this.root.querySelector('#userName').innerText = user.name;
        this.root.querySelector('#userLives').innerText = user.lives;
        this.root.querySelector('#money').innerText = user.valuables.money;
        this.root.querySelector('#stocks').innerText = user.valuables.stocks;
        this.root.querySelector('#tickets').innerText = user.valuables.tickets;
        this.root.querySelector('#caps').innerText = user.valuables.caps;
        this.root.querySelector('#cardsCount').innerText = user.cards.length;
        this.root.querySelector('#maxCards').innerText = user.maxCards;
        this.setCardDisplay(user);
    }
    
    render(){
        return this.root;
    }
}