class SingleGamePage {
    constructor(gameNum, score){
        this.root = View.createElement("div","page"+gameNum,["page","hide"]);

        this.headline = View.createElement("h4", "page"+gameNum+"Headline",["pb-3","d-flex", "flex-wrap"]);
        this.headlineGameNumber = View.createElement("span", null, ["pe-4"], "Game "+gameNum+ ": ");
        this.headlineGameScore = View.createElement("span", null, ["d-flex", "flex-wrap"],score);
        this.headline.append(this.headlineGameNumber,this.headlineGameScore)
        this.root.append(this.headline)

        this.boxScoreTable = View.createElement("div",null,["boxScore","pb-4"],`<table class="table table-dark table-striped table-bordered text-center my-5"><thead><tr><th>Team</th><th>R</th><th>H</th><th>E</th></tr></thead><tbody><tr><td class="text-start">Away</td><td>0</td><td>0</td><td>0</td> </tr><tr><td class="text-start">Home</td><td>0</td><td>0</td><td>0</td></tr></tbody></table>`);
        this.root.append(this.boxScoreTable)

        this.messageFeedContainer = View.createElement("div","messageFeedContainer"+gameNum,["messageFeedContainer","rounded-3","bg-333"]);

        this.messageJumpButton = View.createElement("div",null,["messageJumpButton","rounded-3","w-25","mx-auto","bg-warning","text-center","hide"]);

        this.messageJumpButton.textContent = "Jump To Newest Update";
        this.messageJumpButton.addEventListener('click', event => {
          // const els = document.getElementsByClassName("messageJumpButton");
          // Array.from(els).forEach((el) => {
          //   el.classList.add("hide")
          // });
          this.messageJumpButton.classList.add("hide");
          this.messageFeedContainer.scrollTo(0,this.messageFeedContainer.scrollHeight);
          //messageFeedContainer.classList.add("scrolledToBottom");
        });
        this.messageFeedContainer.append(this.messageJumpButton);
        this.root.append(this.messageFeedContainer);
    }

    render(){
      return this.root;
    }
}