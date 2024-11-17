class View {
  constructor() {
    this.app = this.getElement("#root");
    this.alertContainer = this.createElement("div", "alertContainer", "mt-5");
    this.newsTickerContainer = this.createElement("div", "newsTickerContainer", "text-center");
    this.tickerItems = [];
    this.pageMenuBar = this.createElement("ul", null, "pagination");
    this.addMenuBarItemHome()
    this.addMenuBarItemLive()
    
    this.pageContainer = this.createElement("div", "pageContainer");
    this.homePage;
    this.standingsPage;
    this.gamePages = [];
    this.homePageListGroup = this.createElement("div", "homePageListGroup", "list-group");
    this.homePageListGroupItems = [];
    this.gameWidgetContainer = this.createElement("div", "game-widget-container", "container");
    this.gameWidgetItems = [];
    this.app.append(this.alertContainer,this.newsTickerContainer, this.pageMenuBar,this.pageContainer)
    this.modal = document.getElementById('myModal')
  }

  addGameMessages(gameMessages){
      for(let i=0;i<gameMessages.length;i++){
        if(gameMessages[i].done){
          continue;
        }
        // const container = document.getElementById("messageContainer"+i);
        const container = this.gamePages[i].children[2];
        // Create a new div for the message
        const postDiv = this.createElement('div',null,['post',"bg-111"]);

        const timestamp = new Date().toLocaleTimeString(); 
    
        postDiv.innerHTML = `
            <span class="username">${gameMessages[i].scoreString}</span> <span class="timestamp">${timestamp}</span>
            <p>${gameMessages[i].log}</p>
            <p class="font-monospace">${gameMessages[i].baseIcons} B: ${gameMessages[i].count.balls} S: ${gameMessages[i].count.strikes} O: ${gameMessages[i].count.outs}</p>
        `;

        // Append the new post to the container while maintaining scroll
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
    }
    
  }

  addAllGamePages(game){
    // this.addPageHome(game);
    const scores = game.getScores();
    for (let i = 0; i < scores.length; i++) {
      this.gamePages[i] = this.addPageGamePage(scores[i],i)
    }
  }

  addGameWidget(gameMessage,pageNumber){
      const widget = this.createElement("div", null, ["game-widget","shadow","bg-111","rounded-2","row","mb-4"]);
      // left
      const gameWidgetLeft = this.createElement("div", "gameWidgetScore", ["col-lg","px-4","pt-4","py-lg-4","text-white"]);
      const gameWidgetScoreInning = this.createElement("a", "gameWidgetScoreInning",["pb-1","link","link-offset-2","link-light","link-underline-opacity-25","link-underline-opacity-100-hover"])
      gameWidgetScoreInning.textContent = gameMessage.inning;
      gameWidgetScoreInning.addEventListener('click', event => {
        const els = document.getElementsByClassName("page");
        Array.from(els).forEach((el) => {
          el.classList.add("hide")
        });
        document.getElementById("page" + pageNumber).classList.remove("hide")
        const container = document.getElementById("page" + pageNumber).children[1]
        container.scrollTop = container.scrollHeight
      });
      const gameWidgetAwayLine = this.createElement("div", "gameWidgetAwayLine", "row");
      const gameWidgetAwayName = this.createElement("a","gameWidgetAwayName",["col-10","text-start","link","link-offset-2","link-light","link-underline-opacity-25","link-underline-opacity-100-hover"])
      gameWidgetAwayName.innerHTML = gameMessage.awayTeam;
      // data-bs-toggle="modal" data-bs-target="#myModal"
      gameWidgetAwayName.setAttribute('data-bs-toggle', "modal");
      gameWidgetAwayName.setAttribute('data-bs-target',"#myModal");
      gameWidgetAwayName.addEventListener('click', event => {
        app.updateModal(gameMessage.awayId);
      });
      const gameWidgetAwayScore = this.createElement("div","gameWidgetAwayScore",["col-2","text-end","h3","font-monospace"])
      gameWidgetAwayScore.textContent = gameMessage.scoreObject.away;
      gameWidgetAwayLine.append(gameWidgetAwayName,gameWidgetAwayScore)
      const gameWidgetHomeLine = this.createElement("div", "gameWidgetHomeLine", "row");
      const gameWidgetHomeName = this.createElement("a","gameWidgetHomeName",["col-10","text-start","link","link-offset-2","link-light","link-underline-opacity-25","link-underline-opacity-100-hover"])
      gameWidgetHomeName.innerHTML = gameMessage.homeTeam;
      gameWidgetHomeName.setAttribute('data-bs-toggle', "modal");
      gameWidgetHomeName.setAttribute('data-bs-target',"#myModal");
      gameWidgetHomeName.addEventListener('click', event => {
        app.updateModal(gameMessage.homeId);
      });
      const gameWidgetHomeScore = this.createElement("span","gameWidgetHomeScore",["col-2","text-end","h3","font-monospace"])
      gameWidgetHomeScore.textContent = gameMessage.scoreObject.home;
      gameWidgetHomeLine.append(gameWidgetHomeName,gameWidgetHomeScore)
      gameWidgetLeft.append(gameWidgetScoreInning,gameWidgetAwayLine,gameWidgetHomeLine)
      // center
      const gameWidgetCenter = this.createElement("div", null, ["col-lg","m-0","px-3","py-lg-4","text-white","row"]);
      const gameWidgetBaseIcons = this.createElement("div", null, ["col-3","col-lg-12","m-0","p-0","pt-2","pb-3","ps-lg-3","pt-lg-4","text-white","text-center"]);
      gameWidgetBaseIcons.innerHTML = gameMessage.baseIcons;
      const gameWidgetCountContainer = this.createElement("div", null, ["col-9","col-lg-12","m-0","p-0","pt-2","pb-3","text-white","row","row-cols-lg-6"]);
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
 
  

  

  addMenuBarItemGamePages(game) {
    
    //<li class="page-item"><a class="page-link" href="#">1</a></li>
    
    const scores = game.getScores();
    for (let i = 0; i < scores.length; i++) {
      const menuItem = this.createElement("li", null, "page-item");
      
      const menuLink = this.createElement("a", null, ["page-link","bg-dark","border-0","link-offset-2","link-light","link-underline-opacity-10","link-underline-opacity-100-hover"]);
      // menuLink.classList.add("bg-dark")
      // menuLink.classList.add("border-0")
      menuLink.textContent = i;
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

  addMenuBarItemHome() {
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

  addPageGamePage(score,gameNum){
    const gamePage = this.createElement("div","page"+gameNum,["page","hide"])
      const heading = this.createElement("h3", null, "");
      const headingGameNumber = this.createElement("span", null, "");
      headingGameNumber.textContent = "Game "+gameNum+ ": "
      const headingGameScore = this.createElement("span", null, "");
      headingGameScore.innerHTML = score;
      heading.append(headingGameNumber,headingGameScore)
      gamePage.append(heading)
      const boxScore = this.createElement("div",null,["boxScore","bg-111"])
      boxScore.innerHTML = `<table class="table table-dark table-striped table-bordered text-center"><thead><tr><th>Team</th><th>R</th><th>H</th><th>E</th></tr></thead><tbody><tr><td class="text-start">Away</td><td>0</td><td>0</td><td>0</td> </tr><tr><td class="text-start">Home</td><td>0</td><td>0</td><td>0</td></tr></tbody></table>`
      gamePage.append(boxScore)
   // <div id="messageContainer" class="rounded-3">
    //     <div id="messageJumpButton" class="rounded-3 w-25 mx-auto bg-warning text-center" onclick="jumpToNewestMessage()">Jump To
    //       Newest Update</div>
    //   </div>
      const messageContainer = this.createElement("div","messageContainer"+gameNum,["messageContainer","rounded-3","bg-333"]);
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
      gamePage.append(messageContainer);
      this.pageContainer.append(gamePage);
      return gamePage;
  }

  addPageHome(game){
    this.homePage = this.createElement("div","homePage","page");
    const heading = this.createElement("h3", null, null);
    heading.textContent = "Play Ball"
    this.homePage.append(heading);
    const liveGamesLink = this.createElement("a", null, ["p-1","link-offset-2","link-light","link-underline-opacity-10","link-underline-opacity-100-hover"]);
    liveGamesLink.textContent = "View Live Games ▶️";
    liveGamesLink.addEventListener('click', event => {
      const els = document.getElementsByClassName("page");
      Array.from(els).forEach((el) => {
        el.classList.add("hide")
      });
      document.getElementById("liveGamesPage").classList.remove("hide")
    });
    this.homePageListGroup.append(liveGamesLink);
    const scores = game.getScores()

    for (let i = 0; i < scores.length; i++) {
      
      this.homePageListGroupItems[i] = this.createElement("span", null, ["p-1"]);
      
      const gameScore = this.createElement("span", null, null)
      gameScore.innerHTML = "Game " + i + ": " + scores[i];
      const playButton = this.createElement("a", null, ["p-1","link-offset-2","link-light","link-underline-opacity-10","link-underline-opacity-100-hover"])
      playButton.innerHTML = "▶️"
      //this.homePageListGroupItems[i].onclick = this.showPage("game"+i)
      playButton.addEventListener('click', event => {
        const els = document.getElementsByClassName("page");
        Array.from(els).forEach((el) => {
          el.classList.add("hide")
        });
        document.getElementById("page" + i).classList.remove("hide")
        const container = document.getElementById("page" + i).children[1]
        container.scrollTop = container.scrollHeight
      });
      this.homePageListGroupItems[i].append(gameScore,playButton)
      this.homePageListGroup.append(this.homePageListGroupItems[i]);
      this.homePage.append(this.homePageListGroup);
    }
    this.pageContainer.append(this.homePage);
  }

  addPageLiveGames(game){
    this.liveGamesPage = this.createElement("div","liveGamesPage",["page","hide"]);
    const heading = this.createElement("h3", null, null);
    heading.textContent = "Live Games"
    this.liveGamesPage.append(heading);
    const liveGamesContainer = this.createElement("div","liveGamesContainer","container");
    const gameMessages = game.nextGameMessages()
    for (let i = 0; i < gameMessages.length; i++) {
      this.gameWidgetItems[i] = this.addGameWidget(gameMessages[i],i)
      liveGamesContainer.append(this.gameWidgetItems[i]);
      this.liveGamesPage.append(liveGamesContainer);
    }
    this.pageContainer.append(this.liveGamesPage);
  }

  

  

  addTickerItems(game) {
    const scores = game.getScores();
    for(let i=0;i<scores.length;i++){
      this.tickerItems[i] = this.createElement("div", null, ["newsTickerItem","text-end"]);
      this.tickerItems[i].innerHTML = scores[i];
      
      this.newsTickerContainer.append(this.tickerItems[i]);
    }
  }

  addMenuBarItemLive() {
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

  
}