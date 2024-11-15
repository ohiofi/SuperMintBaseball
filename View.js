class View {
  constructor() {
    this.app = this.getElement("#root");
    this.alertContainer = this.createElement("div", "alertContainer", "mt-5");
    this.newsTickerContainer = this.createElement("div", "newsTickerContainer", "text-center");
    this.tickerItems = [];
    this.pageMenuBar = this.createElement("ul", null, "pagination");
    this.pageContainer = this.createElement("div", "pageContainer");
    this.gamePages = [];
    this.gameListGroup = this.createElement("div", "gameListGroup", "list-group");
    this.gameListGroupItems = [];
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


 
  

  addHomeMenuBarItem() {
    const menuItem = this.createElement("li", null, "page-item");
    const menuLink = this.createElement("a", null, ["page-link","bg-dark","border-0"])
    menuLink.textContent = "Home";
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
    const page = this.createElement("div","homePage","page");
    const heading = this.createElement("h1", null, null);
    heading.textContent = "Welcome"
    page.append(heading);
    
    const scores = game.getScores()
    for (let i = 0; i < scores.length; i++) {
      
      this.gameListGroupItems[i] = this.createElement("a", null, ["p-3","link-offset-2","link-light","link-underline-opacity-10","link-underline-opacity-100-hover"]);
      this.gameListGroupItems[i].textContent = "Game " + i + ": " + scores[i];
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
      page.append(this.gameListGroup);
    }
    this.pageContainer.append(page);
  }

  addPageMenuBarItems(game) {
    
    //<li class="page-item"><a class="page-link" href="#">1</a></li>
    this.addHomeMenuBarItem()
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
      this.tickerItems[i].textContent = scores[i];
      
      this.newsTickerContainer.append(this.tickerItems[i]);
    }
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

  updateGameListGroupItems(gameMessages) {
    // const scores = game.getScores();
    // for(let i=0;i<scores.length;i++){
    //   this.gameListGroupItems[i].textContent = "Game " + i + ": " + scores[i];
    // }
    for(let i=0;i<gameMessages.length;i++){
      this.gameListGroupItems[i].innerHTML = gameMessages[i].name + "<br>" + gameMessages[i].text; 
    }
  }

  updateTickerItems(game) {
    const scores = game.getScores();
    for(let i=0;i<scores.length;i++){
      this.tickerItems[i].textContent = scores[i];
      // this.newsTickerContainer.append(this.tickerItems[i]);
    }
  }
}