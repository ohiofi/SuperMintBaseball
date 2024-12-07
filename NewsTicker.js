class NewsTicker {

    constructor() {
        this.items = [];
        this.breakingNewsItems = [];
        this.parentDiv;
        this.slideDivs;
        this.teamNames = [];
    }

    /**
     * Cleans up expired breaking news items from the queue.
     * Should be explicitly called to handle cleanup logic.
     */
    cleanUpBreakingNews() {
        if (this.breakingNewsItems.length > 0) {
            this.breakingNewsItems.shift();
        }
    }

    /**
     * Marks the first breaking news item for removal if needed.
     */
    flagBreakingNewsForRemoval() {
        if (this.breakingNewsItems.length > 0) {
            const firstItem = this.breakingNewsItems[0];
            if (!firstItem.flaggedForRemoval) {
                firstItem.flaggedForRemoval = true;
            } else {
                // If already flagged, remove it
                this.breakingNewsItems.shift();
            }
        }
    }

    /**
     * Getter method only reads data; does not alter any state.
     * @returns {string[]} List of items to display (breaking news takes precedence).
     */
    getVisibleTickerItems() {
        if (this.breakingNewsItems.length > 0) {
            // Return only the first breaking news item
            return [this.breakingNewsItems[0].text];
        }

        return [...this.items];
    }

    handleEvent = (data) => {
        if (data.eventType === StatsEventType.GAME_WINNER) {
            this.setBreakingNews(this.teamNames[data.teamId] + " win! ");
        }
    }

    // should occur on a fixed schedule, decrements breaking news countdown
    show() {

        this.parentDiv = document.getElementById('newsTickerContainer');
        this.slideDivs = this.parentDiv.querySelectorAll('.newsTickerItem');

        for (let i = 0; i < this.slideDivs.length; i++) {
            if (this.breakingNewsItems.length > 0) {
                this.slideDivs[i].innerHTML = this.breakingNewsItems[0].text;
                
            } else {
                this.slideDivs[i].innerHTML = this.items[i];
            }
            //this.slideDivs[i].style.top = (this.slideCounter % this.slideDivs.length * -1) + "em"; 
            //     this.slideDivs[i].style.left = (this.slideCounter % this.slideDivs.length * -100) + "vw"; 
        }
        if(this.breakingNewsItems.length > 0 && this.breakingNewsItems[0].flaggedForRemoval){
            this.breakingNewsItems.splice(0,1);
        } else if(this.breakingNewsItems.length > 0 && !this.breakingNewsItems[0].flaggedForRemoval){
            this.breakingNewsItems[0].flaggedForRemoval = true;
        }

    }

    setItems(array){
        this.items = array;
    }

    setSpeed(numberOfSeconds){
            const ticker = document.getElementById('newsTickerRibbon');
            if (ticker) {
              ticker.style.animationDuration = `${numberOfSeconds}s`;
            }
          
    }

    // can happen out of schedule
    setBreakingNews(someString) {

        this.breakingNewsItems.push({
            text: '<span class="text-white">' + someString + '</span>',
            flaggedForRemoval: false
        });
        this.parentDiv = document.getElementById('newsTickerContainer');
        this.slideDivs = this.parentDiv.querySelectorAll('.newsTickerItem');

        for (let i = 0; i < this.slideDivs.length; i++) {
            this.slideDivs[i].innerHTML = this.breakingNewsItems[0].text;
        }
    }

    setShopText(){
        this.items = [
            "WE ARE BACK!",
            "I AM THE NEW TICKER",
            "INVEST IN TRADING CARDS",
            "BUY SOMETHIN' WILL YA!",
            "LOOK ON MY WARES, YE MIGHTY, AND REJOICE",
            "PLAY NICE",
            "NO STEALING",
            "PAY ME AND I'LL TALK",
            "EVERYTHING IS YOURS TO TAKE",
            "THIS IS AMERICA'S PASTIME... SHOPPING!",
            "I REMAIN UNCHANGED",
            "LET'S PLAY MONEY MAKING GAME",
            "WE NEED A PITCHER",
            "NOT A BELLY ITCHER",
            "BROWSE OUR LATEST DEALS",
            "RISE, STAY AWAKE",
            "BOY, YOU'RE RICH",
            "TAKE ANY ONE YOU WANT",
            "YOU ARE NO LONGER AVOIDING THE ORDINARY ACT OF REALITY",
            "BOY, THIS IS REALLY EXPENSIVE!",
            "WHO'S ON FIRST BASE? PRIDE. SECOND BASE IS GREED, THIRD BASE WRATH... SLOTH IS ON THE BENCH",
        ];
    }


    // can happen out of schedule
    update(myArray) {
        this.flagBreakingNewsForRemoval();
        //this.parentDiv = document.getElementById('newsTickerContainer');
        //this.slideDivs = this.parentDiv.querySelectorAll('.newsTickerItem');
        // add 2x as many items as there are games. add 4x if only 1 or 2 games.
        let multiplier = 2;
        if (myArray.length < 3) multiplier = 4;
        for (let i = 0; i < myArray.length * multiplier; i++) {
            this.items[i] = myArray[i % myArray.length].scoreString;
            //this.slideDivs[i].innerHTML = this.items[i];
        }
        this.setSpeed()
    }
}