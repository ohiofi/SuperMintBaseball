class GameWidget{
    constructor(pageNumber, gameMessage){

       
       
            this.root = View.createElement("div", null, ["game-widget", "shadow", "bg-111", "rounded-2", "row", "mb-4"]);
            // left
            this.left = View.createElement("div", "gameWidget"+pageNumber+"Left", ["col-lg", "px-4", "pt-4", "py-lg-4", "text-white"]);
            this.leftInning = View.createElement("a", "gameWidget"+pageNumber+"LeftInning", 
                ["pb-1", "link", "link-offset-2", "link-light", "link-underline-opacity-25", "link-underline-opacity-100-hover"],gameMessage.inning);
            this.leftInning.addEventListener('click', event => {
                const els = document.getElementsByClassName("page");
                Array.from(els).forEach((el) => {
                    el.classList.add("hide")
                });
                document.getElementById("page" + pageNumber).classList.remove("hide")
                const container = document.getElementById("page" + pageNumber).children[1];
                container.scrollTop = container.scrollHeight
            });
            this.awayLine = View.createElement("div", "gameWidget"+pageNumber+"AwayLine", "row");
            this.awayName = View.createElement("a", "gameWidget"+pageNumber+"AwayName", 
                ["col-10", "text-start", "link", "link-offset-2", "link-light", "link-underline-opacity-25", "link-underline-opacity-100-hover"],gameMessage.awayTeam);
            // data-bs-toggle="modal" data-bs-target="#myModal"
            this.awayName.setAttribute('data-bs-toggle', "modal");
            this.awayName.setAttribute('data-bs-target', "#myModal");
            this.awayName.addEventListener('click', event => {
                app.updateModal(gameMessage.awayId);
            });
            this.awayScore = View.createElement("div", "gameWidget"+pageNumber+"AwayScore", 
                ["col-2", "text-end", "h3", "font-monospace"],gameMessage.scoreObject.away);
            this.awayLine.append(this.awayName, this.awayScore)
            this.homeLine = View.createElement("div", "gameWidget"+pageNumber+"HomeLine", "row");
            this.homeName = View.createElement("a", "gameWidget"+pageNumber+"HomeName", 
                ["col-10", "text-start", "link", "link-offset-2", "link-light", "link-underline-opacity-25", "link-underline-opacity-100-hover"],gameMessage.homeTeam);
            this.homeName.setAttribute('data-bs-toggle', "modal");
            this.homeName.setAttribute('data-bs-target', "#myModal");
            this.homeName.addEventListener('click', event => {
                app.updateModal(gameMessage.homeId);
            });
            this.homeScore = View.createElement("span", "gameWidget"+pageNumber+"HomeScore", ["col-2", "text-end", "h3", "font-monospace"],gameMessage.scoreObject.home);
            this.homeLine.append(this.homeName, this.homeScore)
            this.left.append(this.leftInning, this.awayLine, this.homeLine)
            // center
            this.center = View.createElement("div", null, ["col-lg", "m-0", "px-3", "py-lg-4", "text-white", "row"]);
            this.baseIcons = View.createElement("div", null, ["col-3", "col-lg-12", "m-0", "p-0", "pt-2", "pb-3", "ps-lg-3", "pt-lg-4", "text-white", "text-center"],gameMessage.baseIcons)
            this.countContainer = View.createElement("div", null, ["col-9", "col-lg-12", "m-0", "p-0", "pt-2", "pb-3", "text-white", "row", "row-cols-lg-6"]);
            this.ballsLabel = View.createElement("div", null, ["col", "font-monospace", "text-end"],"B:");
            this.balls = View.createElement("div", null, ["col", "font-monospace", "text-start"],"0");
            this.strikesLabel = View.createElement("div", null, ["col", "font-monospace", "text-end"],"S:");
            this.strikes = View.createElement("div", null, ["col", "font-monospace", "text-start"],"0");
            this.outsLabel = View.createElement("div", null, ["col", "font-monospace", "text-end"],"O:");
            this.outs = View.createElement("div", null, ["col", "font-monospace", "text-start"],"0");
            this.countContainer.append(this.ballsLabel, this.balls, this.strikesLabel, this.strikes, this.outsLabel, this.outs)
            this.center.append(this.baseIcons, this.countContainer)
            // right
            this.right = View.createElement("div", null, ["col-lg", "px-4", "pb-4", "py-lg-4", "text-white", "lh-sm"],gameMessage.log);
            //this.root.append(this.left, this.center, this.right)
            //this.root = View.createElement("div",null,"gameWidget");
            this.root.innerHTML = `
           
             <!-- Left Section -->
             <div class="col-lg px-4 pt-4 text-white">
               <a class="inning link"></a>
               <div class="away-line row">
                 <a class="away-name col-10 text-start link">Away Team</a>
                 <div class="away-score col-2 text-end h3 font-monospace"></div>
               </div>
               <div class="home-line row">
                 <a class="home-name col-10 text-start link">Home Team</a>
                 <div class="home-score col-2 text-end h3 font-monospace"></div>
               </div>
             </div>
     
             <!-- Center Section -->
             <div class="col-lg m-0 px-3 text-white row">
               <div class="base-icons col-3 text-center"></div>
               <div class="count-container col-9 row">
                 <div class="balls-label col font-monospace text-end">B:</div>
                 <div class="balls col font-monospace text-start">0</div>
                 <div class="strikes-label col font-monospace text-end">S:</div>
                 <div class="strikes col font-monospace text-start">0</div>
                 <div class="outs-label col font-monospace text-end">O:</div>
                 <div class="outs col font-monospace text-start">0</div>
               </div>
             </div>
     
             <!-- Right Section -->
             <div class="col-lg px-4 pb-4 text-white lh-sm log"></div>
           `
        
    }

    update(gameMessage){
        this.leftInning.innerHTML = gameMessage.inning;
        this.awayScore.innerHTML = gameMessage.scoreObject.away;
        this.homeScore.innerHTML = gameMessage.scoreObject.home;

        this.baseIcons.innerHTML = gameMessage.baseIcons;
        this.balls.innerHTML = gameMessage.count.balls;
        this.strikes.innerHTML = gameMessage.count.strikes;
        this.outs.innerHTML = gameMessage.count.outs;
        
        this.right.innerHTML = gameMessage.log;
    }

    render(){
        return this.root;
    }
}