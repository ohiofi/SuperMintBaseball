class SingleGamePage {
    constructor(gameNum, gameMessage){
        this.headlineInning = null;
        this.awayScore;
        this.homeScore;
        this.root = View.createElement("div","game"+gameNum+"Page", "page hide" );
        this.root.innerHTML = `
            <h3 class="pb-4 d-flex flex-wrap row">
                <span class="col-6 row small col-lg-2">
                    <span class="col-6 headlineGameNumber small fw-light"></span>
                    <span class="col-6 headlineInning small fw-light  d-flex flex-wrap"></span>
                </span>
                
                <span class="col-12 col-lg-5 row headlineAwayInfo display-6  d-flex flex-wrap">
                    <span class="col-10 headlineAwayName d-flex flex-wrap"></span>
                    <span class="col-2 headlineAwayScore font-monospace d-flex flex-wrap"></span>
                </span>
                <span class="col-12 col-lg-5 row headlineHomeInfo display-6  d-flex flex-wrap">
                    <span class="col-10 headlineHomeName d-flex flex-wrap"></span>
                    <span class="col-2 headlineHomeScore font-monospace d-flex flex-wrap"></span>
                </span>
            </h3>
            <div class="row">
                <div class="pageSummary col pb-4">Today's games are currently being played</div>
                <div class="col">
                    <button type="button" class="afternoonContinueButton bouncy btn btn-warning hide">CONTINUE</button>
                </div>
            </div>
            <div class="boxScore">
                <table class="table table-dark table-striped table-bordered text-center pb-4 shadow overflow-hidden my-4">
                    <thead>
                        <tr>
                            <th class="text-secondary">Team</th>
                            <th class="text-secondary">R</th>
                            <th class="text-secondary">H</th>
                            <th class="text-secondary">E</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-start">Away</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td class="text-start">Home</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="messageFeedContainer" class="messageFeedContainer bg-333 shadow rounded-2">
                <div id="messageJumpButton" class="messageJumpButton rounded-3 text-center mx-auto bg-warning hide w-50">
                    Jump To Newest Update
                </div>
            </div>
        `.trim();
        // Set headline values
        const headlineGameNumber = this.root.querySelector('.headlineGameNumber');
        this.headlineInning = this.root.querySelector('.headlineInning');
        headlineGameNumber.textContent = `Game ${gameNum}: `;
        this.headlineInning.textContent = gameMessage.inning;
        const awayName = this.root.querySelector('.headlineAwayName');
        awayName.innerHTML = gameMessage.awayNameWithLink;
        this.awayScore = this.root.querySelector('.headlineAwayScore');
        this.awayScore.textContent = gameMessage.score.away;
        const homeName = this.root.querySelector('.headlineHomeName');
        homeName.innerHTML = gameMessage.homeNameWithLink;
        this.homeScore = this.root.querySelector('.headlineHomeScore');
        this.homeScore.textContent = gameMessage.score.home;

        // Message feed scroll logic
        const messageFeedContainer = this.root.querySelector('#messageFeedContainer');
        const messageJumpButton = this.root.querySelector('#messageJumpButton');

        messageJumpButton.addEventListener('click', () => {
            messageJumpButton.classList.add('hide');
            messageFeedContainer.scrollTo(0, messageFeedContainer.scrollHeight);
        });
    }

    // adds the individual "posts" that show up in the feed on each Game Page
    addGameMessage(gameMessage) {
        if (gameMessage.done) {
            return;
        }
        const container = this.root.querySelector('#messageFeedContainer');
        //const postDiv = new GamePost(gameMessage)
        const postDiv = View.createElement("game-post");
        postDiv.setAttribute("game-message",JSON.stringify(gameMessage))
        // `<game-post game-message="${gameMessage}"></game-post>`
        // Append the new post to the container while maintaining scroll
        const previousScrollTop = container.scrollTop;
        if (container.scrollHeight - container.clientHeight <= container.scrollTop) {
            //container.appendChild(postDiv.render());
            container.appendChild(postDiv);
            container.scrollTop = container.scrollHeight;
            this.root.querySelector('#messageJumpButton').classList.add("hide");
        } else {
            container.appendChild(postDiv);
            container.scrollTop = previousScrollTop;
            this.root.querySelector('#messageJumpButton').classList.remove("hide");
        }
    }



    update(gameMessage){
        // update headlines on single game pages
        this.headlineInning.textContent = gameMessage.inning;
        this.awayScore.textContent = gameMessage.score.away;
        this.homeScore.textContent = gameMessage.score.home;
        // update box scores
        this.root.querySelector('.boxScore').innerHTML = gameMessage.boxScoreTable;
        // add game message to single game pages
        this.addGameMessage(gameMessage);
    }

    render(){
      return this.root;
    }
}