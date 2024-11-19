class View {
  static createElement(tag, idName, classNames, content) {
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
    if (content) {
      element.innerHTML = content;
    }
    return element
  }

  constructor() {
    this.app = this.getElement("#root");
    
    this.newsTickerContainer = View.createElement("div", "newsTickerContainer", ["mt-4"]);
    this.tickerItems = [];
    this.pageMenuBar = View.createElement("ul", null, "pagination");
    this.addMenuBarItemHome()
    this.addMenuBarItemLive()
    
    this.pageContainer = View.createElement("div", "pageContainer");
    
    this.homePage = new HomePage();
    this.pageContainer.append(this.homePage.render());
    
    this.liveGamesPage = new LiveGamesPage();
    this.pageContainer.append(this.liveGamesPage.render());

    this.standingsPage;

    this.singleGamePages = [];
    
    this.gameWidgetContainer = View.createElement("div", "game-widget-container", "container");
    this.gameWidgetItems = [];
    this.app.append(this.newsTickerContainer, this.pageMenuBar,this.pageContainer)
    this.modal = document.getElementById('myModal')
  }

  // adds the individual "posts" that show up in the feed on each Game Page
  addGameMessages(gameMessages){
      for(let i=0;i<gameMessages.length;i++){
        if(gameMessages[i].done){
          continue;
        }
        
        const container = this.singleGamePages[i].messageFeedContainer;
        // Create a new div for the message
        const postDiv = View.createElement('div',null,['post',"bg-111"]);

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

  addAllSingleGamePages(game){
    // this.addPageHome(game);
    const scores = game.getScores();
    for (let i = 0; i < scores.length; i++) {
      this.singleGamePages[i] = new SingleGamePage(i,scores[i]);
      this.pageContainer.append(this.singleGamePages[i].render());
    }
  }

  
 
  

  

  addMenuBarItemSingleGamePages(game) {
    
    //<li class="page-item"><a class="page-link" href="#">1</a></li>
    
    const scores = game.getScores();
    for (let i = 0; i < scores.length; i++) {
      const menuItem = View.createElement("li", null, "page-item");
      
      const menuLink = View.createElement("a", null, ["page-link","bg-dark","border-0","link-offset-2","link-light","link-underline-opacity-10","link-underline-opacity-100-hover"]);
      // menuLink.classList.add("bg-dark")
      // menuLink.classList.add("border-0")
      menuLink.textContent = i;
      menuLink.addEventListener('click', event => {
        const els = document.getElementsByClassName("page");
        Array.from(els).forEach((el) => {
          el.classList.add("hide")
        });
        document.getElementById("page" + i).classList.remove("hide")
        const container = document.getElementById("page" + i).children[2]
        container.scrollTop = container.scrollHeight
      });
      menuItem.append(menuLink);
      this.pageMenuBar.append(menuItem);
      
    }
  }

  addMenuBarItemHome() {
    const menuItem = View.createElement("li", null, "page-item");
    const menuLink = View.createElement("a", null, ["page-link","bg-dark","border-0"])
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


  addNewsTickerItems(game) {
    const newsTickerRibbon = View.createElement("p", "newsTickerRibbon", null);
    const scores = game.getScores();
    // add TWICE as many items as there are games
    for(let i=0;i<scores.length * 2;i++){
      this.tickerItems[i] = View.createElement("span", null, ["newsTickerItem"]);
      this.tickerItems[i].innerHTML = scores[i % scores.length];
      
      newsTickerRibbon.append(this.tickerItems[i]);
    }
    this.newsTickerContainer.append(newsTickerRibbon);
  }

  addPageGamePage(score,gameNum){
    
  }

 

  addPageLiveGames(game){

  }

  

  


  addMenuBarItemLive() {
    const menuItem = View.createElement("li", null, "page-item");
    const menuLink = View.createElement("a", null, ["page-link","bg-dark","border-0"])
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