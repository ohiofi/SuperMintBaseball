class SingleGamePage {
    constructor(gameNum, score){
        this.root = View.createElement("div","game"+gameNum+"Page", "page hide" );
        this.root.innerHTML = `
            <h3 class="pb-4 d-flex flex-wrap">
                <span id="" class="headlineGameNumber pe-4"></span>
                <span id="" class="headlineGameScore d-flex flex-wrap"></span>
            </h3>
            <div class="row">
                <div class="pageSummary col pb-4">Today's games are currently being played</div>
                <div class="col">
                    <button type="button" class="continueButton bouncy btn btn-warning hide">CONTINUE</button>
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
        const headlineGameScore = this.root.querySelector('.headlineGameScore');

        headlineGameNumber.textContent = `Game ${gameNum}: `;
        headlineGameScore.innerHTML = score;

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
        const postDiv = new GamePost(gameMessage)
        // Append the new post to the container while maintaining scroll
        const previousScrollTop = container.scrollTop;
        if (container.scrollHeight - container.clientHeight <= container.scrollTop) {
            container.appendChild(postDiv.render());
            container.scrollTop = container.scrollHeight;
            this.root.querySelector('#messageJumpButton').classList.add("hide");
        } else {
            container.appendChild(postDiv.render());
            container.scrollTop = previousScrollTop;
            this.root.querySelector('#messageJumpButton').classList.remove("hide");
        }
    }



    update(gameMessage){
        // update headlines on single game pages
        this.root.querySelector('.headlineGameScore').innerHTML = gameMessage.scoreString;
        // update box scores
        this.root.querySelector('.boxScore').innerHTML = gameMessage.boxScoreTable;
        // add game message to single game pages
        this.addGameMessage(gameMessage);
    }

    render(){
      return this.root;
    }
}