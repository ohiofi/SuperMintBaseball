class View {
  constructor() {
    this.app = this.getElement("#root");
    this.alertContainer = this.createElement("div", "alertContainer", "mt-5");
    this.newsTickerContainer = this.createElement("div", "newsTickerContainer", "text-center");
    this.tickerItems = [];
    this.pageMenuBar = this.createElement("ul", null, "pagination");
    this.addHomeMenuBarItem()
    this.addTvMenuBarItem()
    this.pageContainer = this.createElement("div", "pageContainer");
    this.homePage;
    this.standingsPage;
    this.gamePages = [];
    this.gameListGroup = this.createElement("div", "gameListGroup", "list-group");
    this.gameListGroupItems = [];
    this.gameWidgetContainer = this.createElement("div", "game-widget-container", "container");
    this.gameWidgetItems = [];
    this.app.append(this.alertContainer,this.newsTickerContainer, this.pageMenuBar,this.pageContainer)
  }

  addGameMessages(gameMessages){
    
      for(let i=0;i<gameMessages.length;i++){
        const container = document.getElementById("messageContainer"+i);
        // Create a new div for the message
        const postDiv = this.createElement('div',null,'post');

        const timestamp = new Date().toLocaleTimeString(); 
    
        postDiv.innerHTML = `
            <span class="username">${gameMessages[i].name}</span> <span class="timestamp">${timestamp}</span>
            <p>${gameMessages[i].text}</p>
        `;
      
      
      
    
        // Append the new post to the container
        const previousScrollTop = container.scrollTop;
        
        
        if(container.scrollHeight - container.clientHeight <= container.scrollTop){
          container.appendChild(postDiv);
          container.scrollTop = container.scrollHeight;
          container.firstChild.classList.add("hide");
        }else{
          container.appendChild(postDiv);
          container.scrollTop = previousScrollTop;
          container.firstChild.classList.remove("hide");
        }
      // Check if the user is scrolled to the bottom
      
      // const isScrolledToBottom = document.getElementById("messageContainer"+i).scrollHeight - document.getElementById("messageContainer"+i).clientHeight <= document.getElementById("messageContainer"+i).scrollTop;
        
      // const previousScrollTop = document.getElementById("messageContainer"+i).scrollTop;
      // if (!isScrolledToBottom) {
        
      //   document.getElementById("messageContainer"+i).scrollTop = previousScrollTop;
      // }
      //   // Scroll to the bottom only if the user is already at the bottom
      //   if (isScrolledToBottom) {
      //     console.log("you")
      //     container.firstChild.classList.add("hide");
      //     container.scrollTop = container.scrollHeight;
      // } else {
      //   container.firstChild.classList.remove("hide");
      //     container.scrollTop = previousScrollTop;
      // }
      
      
      // if (document.getElementById("messageContainer"+i).classList.contains("scrolledToBottom")){
      //   //container.scrollTop = container.scrollHeight;
      //   document.getElementById("messageContainer"+i).firstChild.classList.add("hide");
      //   document.getElementById("messageContainer"+i).scrollTop = document.getElementById("messageContainer"+i).scrollHeight

      // }
    }
    
  }

  addGameWidget(gameMessage){
      const widget = this.createElement("div", null, ["game-widget","shadow","bg-black","rounded-2","row","mb-4"]);
      // left
      const gameWidgetLeft = this.createElement("div", "gameWidgetScore", ["col-lg","px-4","pt-4","py-lg-4","text-white"]);
      const gameWidgetScoreInning = this.createElement("div", "gameWidgetScoreInning","pb-1")
      gameWidgetScoreInning.textContent = gameMessage.inning;
      const gameWidgetAwayLine = this.createElement("div", "gameWidgetAwayLine", "row");
      const gameWidgetAwayName = this.createElement("div","gameWidgetAwayName",["col-10","text-start"])
      gameWidgetAwayName.innerHTML = gameMessage.awayTeam;
      const gameWidgetAwayScore = this.createElement("div","gameWidgetAwayScore",["col-2","text-end","h3","font-monospace"])
      gameWidgetAwayScore.textContent = gameMessage.score.away;
      gameWidgetAwayLine.append(gameWidgetAwayName,gameWidgetAwayScore)
      const gameWidgetHomeLine = this.createElement("div", "gameWidgetHomeLine", "row");
      const gameWidgetHomeName = this.createElement("span","gameWidgetHomeName",["col-10","text-start"])
      gameWidgetHomeName.innerHTML = gameMessage.homeTeam;
      const gameWidgetHomeScore = this.createElement("span","gameWidgetHomeScore",["col-2","text-end","h3","font-monospace"])
      gameWidgetHomeScore.textContent = gameMessage.score.home;
      gameWidgetHomeLine.append(gameWidgetHomeName,gameWidgetHomeScore)
      gameWidgetLeft.append(gameWidgetScoreInning,gameWidgetAwayLine,gameWidgetHomeLine)
      // center
      const gameWidgetCenter = this.createElement("div", null, ["col-lg","m-0","px-0","py-lg-4","text-white","row"]);
      const gameWidgetBaseIcons = this.createElement("div", null, ["col-4","col-lg-12","m-0","p-0","ps-lg-3","pt-lg-4","text-white","text-center"]);
      gameWidgetBaseIcons.innerHTML = gameMessage.baseIcons;
      const gameWidgetCountContainer = this.createElement("div", null, ["col-8","col-lg-12","m-0","p-0","text-white","row","row-cols-lg-6"]);
      const count0 = this.createElement("div", null, ["col","font-monospace","text-end"]);
      count0.textContent = "B:";
      const count1 = this.createElement("div", null, ["col","font-monospace","text-start"]);
      count1.textContent = "0";
      const count2 = this.createElement("div", null, ["col","font-monospace","text-end"]);
      count2.textContent = "S:";
      const count3 = this.createElement("div", null, ["col","font-monospace","text-start"]);
      count3.textContent = "0";
      const count4 = this.createElement("div", null, ["col","font-monospace","text-end"]);
      count4.textContent = "O:";
      const count5 = this.createElement("div", null, ["col","font-monospace","text-start"]);
      count5.textContent = "0";
      gameWidgetCountContainer.append(count0,count1,count2,count3,count4,count5)
      gameWidgetCenter.append(gameWidgetBaseIcons,gameWidgetCountContainer)
      // right
      const gameWidgetRight = this.createElement("div", null, ["col-lg","px-4","pb-4","py-lg-4","text-white","lh-lg"]);
      gameWidgetRight.innerHTML = gameMessage.log;
      widget.append(gameWidgetLeft,gameWidgetCenter,gameWidgetRight)
      return widget;
  }
 
  

  addHomeMenuBarItem() {
    const menuItem = this.createElement("li", null, "page-item");
    const menuLink = this.createElement("a", null, ["page-link","bg-dark","border-0"])
    menuLink.textContent = "🏠";
    menuLink.addEventListener('click', event => {
      const els = document.getElementsByClassName("page");
      Array.from(els).forEach((el) => {
        el.classList.add("hide")
      });
      document.getElementById("homePage").classList.remove("hide");
      
    })
    menuItem.append(menuLink);
    this.pageMenuBar.append(menuItem);
  }

  addHomePage(game){
    this.homePage = this.createElement("div","homePage","page");
    const heading = this.createElement("h1", null, null);
    heading.textContent = "Play Ball"
    this.homePage.append(heading);
    
    const scores = game.getScores()
    for (let i = 0; i < scores.length; i++) {
      
      this.gameListGroupItems[i] = this.createElement("a", null, ["p-1","link-offset-2","link-light","link-underline-opacity-10","link-underline-opacity-100-hover"]);
      this.gameListGroupItems[i].innerHTML = "Game " + i + ": " + scores[i];
      this.gameListGroupItems[i].addEventListener('click', event => {
        const els = document.getElementsByClassName("page");
        Array.from(els).forEach((el) => {
          el.classList.add("hide")
        });
        document.getElementById("page" + i).classList.remove("hide")
        const container = document.getElementById("page" + i).children[1]
        container.scrollTop = container.scrollHeight
      });
      this.gameListGroup.append(this.gameListGroupItems[i]);
      this.homePage.append(this.gameListGroup);
    }
    this.pageContainer.append(this.homePage);
  }

  addLiveGamesPage(game){
    this.liveGamesPage = this.createElement("div","liveGamesPage",["page","hide"]);
    const heading = this.createElement("h3", null, null);
    heading.textContent = "Live Games"
    this.liveGamesPage.append(heading);
    const liveGamesContainer = this.createElement("div","liveGamesContainer","container");
    const gameMessages = game.nextGameMessages()
    for (let i = 0; i < gameMessages.length; i++) {
      this.gameWidgetItems[i] = this.addGameWidget(gameMessages[i])
      liveGamesContainer.append(this.gameWidgetItems[i]);
      this.liveGamesPage.append(liveGamesContainer);
    }
    this.pageContainer.append(this.liveGamesPage);
  }

  addPageMenuBarItems(game) {
    
    //<li class="page-item"><a class="page-link" href="#">1</a></li>
    
    const scores = game.getScores();
    for (let i = 0; i < scores.length; i++) {
      const menuItem = this.createElement("li", null, "page-item");
      
      const menuLink = this.createElement("a", null, ["page-link","bg-dark","border-0"]);
      // menuLink.classList.add("bg-dark")
      // menuLink.classList.add("border-0")
      menuLink.textContent = "Game " + i;
      menuLink.addEventListener('click', event => {
        const els = document.getElementsByClassName("page");
        Array.from(els).forEach((el) => {
          el.classList.add("hide")
        });
        document.getElementById("page" + i).classList.remove("hide")
        const container = document.getElementById("page" + i).children[1]
        container.scrollTop = container.scrollHeight
      });
      menuItem.append(menuLink);
      this.pageMenuBar.append(menuItem);
      
    }
  }

  addPages(game){
    this.addHomePage(game);
    const scores = game.getScores();
    for (let i = 0; i < scores.length; i++) {
      this.gamePages[i] = this.createElement("div","page"+i,["page","hide"])
      const heading = this.createElement("h1", null, null);
      heading.textContent = "Game "+i+ ": "+scores[i];
      this.gamePages[i].append(heading)
   // <div id="messageContainer" class="rounded-3">
    //     <div id="messageJumpButton" class="rounded-3 w-25 mx-auto bg-warning text-center" onclick="jumpToNewestMessage()">Jump To
    //       Newest Update</div>
    //   </div>
      const messageContainer = this.createElement("div","messageContainer"+i,["messageContainer","rounded-3"]);
      const messageJumpButton = this.createElement("div",null,["messageJumpButton","rounded-3","w-25","mx-auto","bg-warning","text-center","hide"]);
      //messageContainer.addEventListener("scroll", event => {
        //messageContainer.classList.remove("scrolledToBottom");
        //messageJumpButton.classList.remove("hide");
      //});
      
      messageJumpButton.textContent = "Jump To Newest Update";
      messageJumpButton.addEventListener('click', event => {
        // const els = document.getElementsByClassName("messageJumpButton");
        // Array.from(els).forEach((el) => {
        //   el.classList.add("hide")
        // });
        messageJumpButton.classList.add("hide");
        messageContainer.scrollTo(0,messageContainer.scrollHeight);
        //messageContainer.classList.add("scrolledToBottom");
      });
      messageContainer.append(messageJumpButton);
      this.gamePages[i].append(messageContainer);
      this.pageContainer.append(this.gamePages[i]);
    }
  }

  addTickerItems(game) {
    const scores = game.getScores();
    for(let i=0;i<scores.length;i++){
      this.tickerItems[i] = this.createElement("div", null, ["newsTickerItem","text-end"]);
      this.tickerItems[i].innerHTML = scores[i];
      
      this.newsTickerContainer.append(this.tickerItems[i]);
    }
  }

  addTvMenuBarItem() {
    const menuItem = this.createElement("li", null, "page-item");
    const menuLink = this.createElement("a", null, ["page-link","bg-dark","border-0"])
    menuLink.textContent = "🏟️";
    menuLink.addEventListener('click', event => {
      const els = document.getElementsByClassName("page");
      Array.from(els).forEach((el) => {
        el.classList.add("hide")
      });
      document.getElementById("liveGamesPage").classList.remove("hide");
      
    })
    menuItem.append(menuLink);
    this.pageMenuBar.append(menuItem);
  }

  // bindPageMenuBar(handler) {
  //   this.pageMenuBar.addEventListener('click', event => {
  //     if (event.target.className === 'delete') {
  //       const id = parseInt(event.target.parentElement.id)

  //       handler(id)
  //     }
  //   })
  // }


  createElement(tag, idName, classNames) {
    const element = document.createElement(tag);
    if (idName) {
      element.id = idName;
    }
    if (classNames && classNames.constructor === Array) {
      for(let each of classNames){
        element.classList.add(each);
      }
      
    } else if(classNames){
      element.classList.add(classNames);
    }

    return element
  }

  // Retrieve an element from the DOM
  getElement(selector) {
    const element = document.querySelector(selector)

    return element
  }

  showPage(pageName) {
    const els = document.getElementsByClassName("page");
    Array.from(els).forEach((el) => {
      el.classList.add("hide")
    });
    document.getElementById(pageName).classList.remove("hide");
    const container = document.getElementById(pageName).children[1]
    container.scrollTop = container.scrollHeight
    // Check if the user is scrolled to the bottom
    // document.getElementById(pageName).children[1].scrollTo(0,document.getElementById(pageName).children[1].scrollHeight)
  }

  updateGameListGroupItems(scores) {
    for(let i=0;i<scores.length;i++){
      this.gameListGroupItems[i].innerHTML = scores[i]; 
    }
  }

  updateGameWidgetItems(gameMessages) {
    for(let i=0;i<gameMessages.length;i++){
      //this.gameWidgetItems[i].innerHTML = gameMessages[i].name + "<br>" + gameMessages[i].text; 
      
      const gameWidgetLeft = this.gameWidgetItems[i].children[0]
      gameWidgetLeft.children[0].textContent = gameMessages[i].inning;
      gameWidgetLeft.children[1].children[1].textContent = gameMessages[i].score.away;
      gameWidgetLeft.children[2].children[1].textContent = gameMessages[i].score.home;
      
      const gameWidgetBaseIcons = this.gameWidgetItems[i].children[1].children[0]
      gameWidgetBaseIcons.innerHTML = gameMessages[i].baseIcons;
      
      const gameWidgetCountContainer = this.gameWidgetItems[i].children[1].children[1]
      gameWidgetCountContainer.children[1].textContent = gameMessages[i].count.balls;
      gameWidgetCountContainer.children[3].textContent = gameMessages[i].count.strikes;
      gameWidgetCountContainer.children[5].textContent = gameMessages[i].count.outs;
      
      const gameWidgetRight = this.gameWidgetItems[i].children[2]
      gameWidgetRight.innerHTML = gameMessages[i].log;
      
    }
  }

  updateTickerItems(scores) {
    for(let i=0;i<scores.length;i++){
      this.tickerItems[i].innerHTML = scores[i];
      // this.newsTickerContainer.append(this.tickerItems[i]);
    }
  }
}