class NewsTicker {

    constructor() {
        this.items = [];
        this.breakingNewsItems = [];
        this.parentDiv;
        this.slideDivs;

    }
    // should occur on a fixed schedule, slides the ticker, decrements breaking news countdown
    show() {

        this.parentDiv = document.getElementById('newsTickerContainer').children[0];
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
            this.breakingNewsItems.shift()
        } else if(this.breakingNewsItems.length > 0 && !this.breakingNewsItems[0].flaggedForRemoval){
            this.breakingNewsItems.flagged = true;
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
        for (let i = 0; i < myArray.length * 2; i++) {
            this.items[i] = myArray[i % myArray.length];
            this.slideDivs[i].innerHTML = this.items[i];
        }
    }
}