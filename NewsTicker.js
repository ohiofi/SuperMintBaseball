class NewsTicker {
    constructor() {
        this.items = [];
        this.breakingNewsCountdown = 0; // return to regular news when countdown reaches 0
        this.breakingNewsItem = "";
        this.parentDiv;
        this.slideDivs;
        this.slideCounter = 0;

    }
    // should occur on a fixed schedule, slides the ticker, decrements breaking news countdown
    show() {
        
        this.parentDiv = document.getElementById('newsTickerContainer');
        this.slideDivs = this.parentDiv.querySelectorAll('.newsTickerItem');
        
        for (let i = 0; i < this.slideDivs.length; i++) {
            if (this.breakingNewsCountdown > 0) {
                this.slideDivs[i].innerHTML = this.breakingNewsItem;
            }else{
                this.slideDivs[i].innerHTML = this.items[i];
            }
            this.slideDivs[i].style.top = (this.slideCounter % this.slideDivs.length * -1) + "em"; 
        }
        
        if(this.breakingNewsCountdown > 0){
            this.breakingNewsCountdown--;
        }else{
            this.slideCounter++;
        }
        
        

    }
    // can happen out of schedule
    setBreakingNews(someString) {
        this.breakingNewsCountdown = 1;
        this.breakingNewsItem = '<span class="bg-warning text-black">'+someString+'</span>';
        this.parentDiv = document.getElementById('newsTickerContainer');
        this.slideDivs = this.parentDiv.querySelectorAll('.newsTickerItem');
        
        for (let i = 0; i < this.slideDivs.length; i++) {
            this.slideDivs[i].innerHTML = this.breakingNewsItem;
        }
    }

    // can happen out of schedule
    update(myArray) {
        this.parentDiv = document.getElementById('newsTickerContainer');
        this.slideDivs = this.parentDiv.querySelectorAll('.newsTickerItem');
        for (let i = 0; i < myArray.length; i++) {
            this.items[i] = myArray[i];
            this.slideDivs[i].innerHTML = this.items[i];
        }
    }
}