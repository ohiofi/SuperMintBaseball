class NightHomePage{
    constructor(){
        this.root = View.createElement("div","homePage","page");
        this.root.innerHTML = `
            <h3 id="homePageHeadline" class="pb-5  display-6 ">Performance Review</h3>
            <div class="row">
                <div id="dateAndTime"></div>
                <div class="pageSummary col pb-5">🆘 Special Announcement 🆘</div>
                <div class="col">
                    <button type="button" class="nightContinueButton bouncy btn btn-warning float-end">CONTINUE</button>
                </div>
            </div>
            <div id="messageFeedContainer" class="messageFeedContainer bg-333 shadow rounded-2 mb-5">
                <div id="messageJumpButton" class="messageJumpButton rounded-3 text-center mx-auto bg-warning hide w-50">
                    Jump To Newest Update
                </div>
            </div>
            
            
            
        `.trim();
        // Message feed scroll logic
        const messageFeedContainer = this.root.querySelector('#messageFeedContainer');
        const messageJumpButton = this.root.querySelector('#messageJumpButton');

        messageJumpButton.addEventListener('click', () => {
            messageJumpButton.classList.add('hide');
            messageFeedContainer.scrollTo(0, messageFeedContainer.scrollHeight);
        });
    }

    // adds the individual "posts" that show up in the feed on each Game Page
    addSocialPost(message) {
        //console.log(message)
        if (message == null || Object.hasOwn(message, 'done') && message.done) {
            return;
        }
        const container = this.root.querySelector('#messageFeedContainer');
        //console.log(message)
        const postDiv = View.createElement("social-post");
        postDiv.setAttribute("message",JSON.stringify(message))
        //console.log(postDiv)
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
    // bindShopButtonClick(handler) {
    //     const els = document.getElementsByClassName("shopButton");
    //     Array.from(els).forEach((el) => {
    //         el.addEventListener('click', event => {

    //             if (event.target.localName === 'button') {
    //                 const id = event.target.value
    //                 handler(id)
    //             }
    //         })
    //     })
    // }
    
    // setShop(shop){
    //     this.root.querySelector("#homePageCardContainer").innerHTML = "";
    //     this.root.querySelector("#homePageCardContainer").append(shop);
    // }
    
    render(){
        return this.root;
    }
}