class NewsTicker {

    constructor() {
        this.items = [];
        this.breakingNewsItems = [];
        this.parentDiv;
        this.slideDivs;
        this.teamNames = [];
    }

    handleEvent = (data) => {
        if (data.eventType === StatsEventType.GAME_WINNER) {
            this.setBreakingNews(this.teamNames[data.teamId] + " win! ");
        }
    }

    // should occur on a fixed schedule, slides the ticker, decrements breaking news countdown
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

    setSpeed(numberOfSeconds){
        
            const ticker = document.getElementById('newsTickerRibbon');
            
            // Check if ticker exists
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


    // can happen out of schedule
    update(myArray) {
        this.parentDiv = document.getElementById('newsTickerContainer');
        this.slideDivs = this.parentDiv.querySelectorAll('.newsTickerItem');
        // add 2x as many items as there are games. add 4x if only 1 or 2 games.
        let multiplier = 2;
        if (myArray.length < 3) multiplier = 4;
        for (let i = 0; i < myArray.length * multiplier; i++) {
            this.items[i] = myArray[i % myArray.length].scoreString;
            this.slideDivs[i].innerHTML = this.items[i];
        }
        //this.setSpeed()
    }
}