class HomePage {
    constructor(){
        this.page = View.createElement("div","homePage","page");

        this.headline = View.createElement("h3", "homePageHeadline","pb-4","Play Ball");
        this.page.append(this.headline);

        this.listGroupPlayIcon = "◆";
        this.listGroup = View.createElement("div", "listGroup", ["list-group"]);
        this.listGroupSpans = [];
        this.listGroupScores = [];

        this.liveGamesSpan  = View.createElement("span", "liveGamesSpan", ["p-1"]);
        this.liveGamesPlayButton = View.createElement(
            "a", 
            "liveGamesPlayButton", 
            ["p-2","link-offset-2","link-light","link-underline-opacity-10","link-underline-opacity-100-hover"],
            "◆"
        );
        this.liveGamesPlayButton.addEventListener('click', event => {
          const els = document.getElementsByClassName("page");
          Array.from(els).forEach((el) => {
            el.classList.add("hide")
          });
          document.getElementById("liveGamesPage").classList.remove("hide")
        });
        this.liveGamesLink = View.createElement(
            "a", 
            "liveGamesLink", 
            ["p-2","link-offset-2","link-light","link-underline-opacity-10","link-underline-opacity-100-hover"],
            "Live Games"
        );
        this.liveGamesLink.addEventListener('click', event => {
            const els = document.getElementsByClassName("page");
            Array.from(els).forEach((el) => {
                el.classList.add("hide")
            });
            document.getElementById("liveGamesPage").classList.remove("hide")
        });
        this.liveGamesSpan.append(this.liveGamesPlayButton,this.liveGamesLink)
        this.listGroup.append(this.liveGamesSpan);
        this.page.append(this.listGroup)

    }

    addlistGroupScores(game){
        const scores = game.getScores()
        for (let i = 0; i < scores.length; i++) {
          
            this.listGroupSpans[i] = View.createElement("span", "listGroupSpan"+i, ["p-1"]);

            this.listGroupScores[i] = View.createElement("span", "listGroupScore"+i, ["p-2"],"Game " + i + ": " + scores[i]);
            const playButton = View.createElement(
                "a", 
                "playButton"+i, 
                ["p-2","link-offset-2","link-light","link-underline-opacity-10","link-underline-opacity-100-hover"],
                this.listGroupPlayIcon
            )
            playButton.addEventListener('click', event => {
                const els = document.getElementsByClassName("page");
                Array.from(els).forEach((el) => {
                    el.classList.add("hide")
                });
                document.getElementById("page" + i).classList.remove("hide")
                const container = document.getElementById("page" + i).children[1]
                container.scrollTop = container.scrollHeight
            });
            this.listGroupSpans[i].append(playButton, this.listGroupScores[i])
            this.listGroup.append(this.listGroupSpans[i]);
            this.page.append(this.listGroup);
        }
    }
}