class UserPage{
    constructor(){
        this.root = View.createElement("div","userPage","page hide");
        this.root.innerHTML = `
            <h3 id="userPageHeadline" class="pb-4 display-6 ">User</h3>
            <div class="row">
                <div class="pageSummary col pb-4">You are user</div>
                <!--div class="col">
                    <button type="button" class="afternoonContinueButton bouncy btn btn-warning">CONTINUE</button>
                </div-->
            </div>
            <div class="container my-5">
            <div class="row text-center border-bottom border-dark bg-000 rounded-2 p-1 mb-4">
            <div class="col">
    <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="The player's current experience level.">Level</a>
    <div><span id="userLevel" class="font-monospace">3</span><span class="noto">🚀</span></div>
</div>
            <div class="col">
    <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Victory points required to level up. Victory Points are Red Magic multiplied by Green Magic multiplied by Blue Magic.">VP/Goal</a>
    <div><span id="userVP" class="font-monospace">3</span>/<span id="vpGoal" class="font-monospace">3</span><span class="noto">👑</span></div>
</div>

<div class="col">
    <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="The player's remaining lives.">Lives</a>
    <div><span id="userLives" class="font-monospace">3</span><span class="noto">🩸</span></div>
</div>

</div>
<div class="row text-center border-bottom border-dark bg-000 rounded-2 p-1 mb-4">
<div class="col">
    <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Money. Spend it to buy cards. Earn magic which generates victory points.">Money</a>
    <div><span id="money" class="font-monospace">50</span><span class="noto">🪙</span></div>
</div>
<div class="col">
    <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Red Magic Points used for fire, love, blood, etc.">Red MP</a>
    <div><span id="redMagic" class="font-monospace">0</span><span class="noto">🔥</span></div>
</div>
<div class="col">
    <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Green Magic Points used for plants, nature, healing, etc.">Green MP</a>
    <div><span id="greenMagic" class="font-monospace">0</span><span class="noto">🌵</span></div>
</div>
<div class="col">
    <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Blue Magic Points used for water, cold, the sky, etc.">Blue MP</a>
    <div><span id="blueMagic" class="font-monospace">0</span><span class="noto">💧</span></div>
</div>
<div class="col">
    <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Trading Cards. Number the player currently holds and the maximum number the player can hold.">Cards</a>
    <div><span class="cardsCount font-monospace">0</span>/<span class="maxCards font-monospace">5</span><span class="noto">🃏</span></div>
</div>

            </div>

                <ul class="nav nav-tabs  nav-fill" id="userTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link link-secondary active" id="cards-tab" data-bs-toggle="tab" data-bs-target="#cards" 
                        type="button" role="tab" aria-controls="cards" aria-selected="false">Cards</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link link-secondary" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" 
                        type="button" role="tab" aria-controls="profile" aria-selected="true">Profile</button>
                    </li>
                    
                    <li class="nav-item" role="presentation">
                        <button class="nav-link link-secondary" id="feed-tab" data-bs-toggle="tab" data-bs-target="#feed" 
                        type="button" role="tab" aria-controls="feed" aria-selected="false">Feed</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link link-secondary" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings" 
                        type="button" role="tab" aria-controls="settings" aria-selected="false">Settings</button>
                    </li>
                </ul>

                <div class="tab-content" id="userTabContent">

                    <!-- Cards Tab -->
                    <div class="tab-pane fade show active" id="cards" role="tabpanel" aria-labelledby="cards-tab">
                        <div class="card text-secondary bg-222 shadow pb-4 mt-0">
                            <div class="card-header text-center">
                                <h3>Cards 
                                <span class="cardsCount font-monospace">0</span>/<span class="maxCards font-monospace">5</span><span class="noto">🃏</span>
                            </div>
                            <div id="userPageCardContainer" class="card-body row p-4">
                                <!-- Cards content dynamically inserted here -->
                                ${TradingCard.getPlaceholderCard()}
                            </div>
                        </div>
                    </div>

                    <!-- Profile Tab -->
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="card text-secondary bg-222 shadow pb-4 mt-0">
                            <div class="card-header text-center">
                                <h3><span id="userName">John Doe</span></h3>
                            </div>
                            <div class="card-body">
                                User stats go here
                                
                            </div>
                        </div>
                    </div>

                    

                    <!-- Feed Tab -->
                    <div class="tab-pane fade" id="feed" role="tabpanel" aria-labelledby="feed-tab">
                        <div class="card text-secondary bg-222 shadow pb-4 mt-0">
                            <div class="card-header text-center">
                                <h3>Feed</h3>
                            </div>
                            <div class="card-body">
                                <div id="messageFeedContainer" class="messageFeedContainer bg-333 shadow rounded-2">
                                    <div id="messageJumpButton" class="messageJumpButton rounded-3 text-center mx-auto bg-warning hide w-50">
                                        Jump To Newest Update
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Settings Tab -->
                    <div class="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                        <div class="card text-secondary bg-222 shadow pb-4 mt-0">
                            <div class="card-header text-center">
                                <h3>Settings</h3>
                            </div>
                            <div class="card-body">
                                <p>Settings content goes here...</p>
                                <div class="container mt-5">
                                    <div class="form-floating">
                                        <select class="form-select" id="speedSelect" aria-label="Speed selection">
                                            <option value="100">⏩ FAST</option>
                                            <option value="1000">⏩ Hedgehog</option>
                                            <option value="2000">⏩ Tiger</option>
                                            <option value="3000">⏩ Bison </option>
                                            <option value="4000" selected>NORMAL</option>
                                            <option value="5000">⏪ Cow</option>
                                            <option value="6000">⏪ Crab</option>
                                            <option value="7000">⏪ Worm</option>
                                            <option value="8000">⏪ SLOW</option>
                                        </select>
                                        <label for="speedSelect">Select Speed</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container my-5">
                <div class="mb-4">
                    <h2>Character Creator</h2>
                </div>
                
                <form class="w-50">
                    <!-- Character Name Input 
                    <div class="mb-3">
                        <label for="characterName" class="form-label">Character Name</label>
                        <input type="text" class="form-control" id="characterName" placeholder="Enter character name">
                    </div>
                    -->

                    <div class="mb-3">
                        <label class="form-label">Hat Style</label>
                        <select class="form-select" id="hatStyle">
                            <option selected>Choose style</option>
                            <option value="1">Style 1</option>
                            <option value="2">Style 2</option>
                            <option value="3">Style 3</option>
                            <option value="4">Style 4</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Clothes Style</label>
                        <select class="form-select" id="clothesStyle">
                            <option selected>Choose style</option>
                            <option value="1">Style 1</option>
                            <option value="2">Style 2</option>
                            <option value="3">Style 3</option>
                            <option value="4">Style 4</option>
                        </select>
                    </div>

                    <!-- Character Appearance Sliders -->
                    <div class="mb-3">
                        <label for="characterHeight" class="form-label">Height</label>
                        <input type="range" class="form-range" id="characterHeight" min="120" max="220" step="1">
                    </div>

                    <div class="mb-3">
                        <label for="characterStrength" class="form-label">Strength</label>
                        <input type="range" class="form-range" id="characterStrength" min="1" max="10" step="1">
                    </div>

                    <div class="mb-3">
                        <label for="characterAgility" class="form-label">Agility</label>
                        <input type="range" class="form-range" id="characterAgility" min="1" max="10" step="1">
                    </div>

                    <!-- Character Class Selection -->
                    <div class="mb-3">
                        <label class="form-label">Character Class</label>
                        <div class="btn-group" role="group">
                            <input type="radio" class="btn-check" name="characterClass" id="warrior" autocomplete="off">
                            <label class="btn btn-outline-primary" for="warrior">Warrior</label>

                            <input type="radio" class="btn-check" name="characterClass" id="mage" autocomplete="off">
                            <label class="btn btn-outline-primary" for="mage">Mage</label>

                            <input type="radio" class="btn-check" name="characterClass" id="rogue" autocomplete="off">
                            <label class="btn btn-outline-primary" for="rogue">Rogue</label>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="text-center">
                        <button type="button" class="btn btn-success">Create Character</button>
                    </div>
                </form>
            </div>

        `.trim();
        }

        bindSpeedSelect(handler){
            this.root.querySelector('#speedSelect');
            speedSelect.addEventListener('change', event => {
                const selectedSpeed = event.target.value;
                console.log(`Selected speed: ${selectedSpeed}`);
                handler(selectedSpeed)
            });
        }

    setCardDisplay(user){
        this.root.querySelector("#userPageCardContainer").innerHTML = "";
        // add placeholder card if user has no cards...
        if(user.cards.length==0){
            this.root.querySelector("#userPageCardContainer").innerHTML = `
            <span class="col row">
                <span id="userCardSlotZ" class="col text-center">
                
                </span>
                <div class="col-12 text-center pb-5">
                    <button id="userCardSlotZButton" type="button" class="shopButton btn btn-outline-danger" disabled>SELL ME</button>
                </div>
            </span>
            `
            this.root.querySelector("#userCardSlotZ").append(TradingCard.getPlaceholderCard().render())
            
        }
        for(let i=0; i<user.cards.length; i++){
            
            this.root.querySelector("#userPageCardContainer").innerHTML += `
            <span class="col row">
                <span id="userCardSlot${i}" class="col text-center">
                </span>
                <div class="col-12 text-center pb-5">
                    <button id="userCardSlot${i}Button" type="button" value=${i} class="shopButton btn btn-outline-danger">SELL ME +${Math.floor(user.cards[i].cost*0.8)}<span class="noto">🪙</span></button>
                </div>
            </span>
            `
            this.root.querySelector("#userCardSlot"+i).append(user.cards[i].render())
        }    
    }

    updateUserInfo(user) {
        if(user.hasClickedUserIcon){
            document.getElementById("userIconNag").classList.add("hide");
        }
        // Update the user name, lives, valuables, and cards count in the HTML
        this.root.querySelector('#userName').innerText = user.name;
        this.root.querySelector('#userLives').innerText = user.lives;
        this.root.querySelector('#userLevel').innerText = user.level;
        this.root.querySelector('#userVP').innerText = user.getVictoryPoints();
        this.root.querySelector('#vpGoal').innerText = user.getGoal();
        this.root.querySelector('#money').innerText = user.valuables.money;
        this.root.querySelector('#greenMagic').innerText = user.valuables.greenMagic;
        this.root.querySelector('#redMagic').innerText = user.valuables.redMagic;
        this.root.querySelector('#blueMagic').innerText = user.valuables.blueMagic;
        this.root.querySelector('#speedSelect').value = user.favoriteSpeed;
        //this.root.querySelector('#cardsCount').innerText = user.cards.length;
        this.root.querySelectorAll('.cardsCount').forEach(element => {
            element.innerText = user.cards.length;
        });
        this.root.querySelectorAll('.maxCards').forEach(element => {
            element.innerText = user.maxCards;
        });
        //this.setCardDisplay(user);
    }
    
    render(){
        return this.root;
    }
}