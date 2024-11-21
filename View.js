class View {
  static createElement(tag, idName, classNames, content) {
    const element = document.createElement(tag);
    if (idName) {
      element.id = idName;
    }
    if (classNames && classNames.constructor === Array) {
      for (let each of classNames) {
        element.classList.add(each);
      }
    } else if (classNames) {
      element.classList.add(classNames);
    }
    if (content) {
      element.innerHTML = content;
    }
    return element
  }

  constructor() {

    this.app = document.querySelector("#root");

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
    this.modal = new StatsModal();
    this.app.append(this.newsTickerContainer, this.pageMenuBar, this.pageContainer, this.modal.render())
  }

  // adds the individual "posts" that show up in the feed on each Game Page
  addGameMessages(gameNumber, gameMessage) {
      if (gameMessage.done) {
        return;
      }
      const container = this.singleGamePages[gameNumber].messageFeedContainer;
      const postDiv = new GamePost(gameMessage)
      // Append the new post to the container while maintaining scroll
      const previousScrollTop = container.scrollTop;
      if (container.scrollHeight - container.clientHeight <= container.scrollTop) {
        container.appendChild(postDiv.render());
        container.scrollTop = container.scrollHeight;
        this.singleGamePages[gameNumber].messageJumpButton.classList.add("hide");
      } else {
        container.appendChild(postDiv.render());
        container.scrollTop = previousScrollTop;
        this.singleGamePages[gameNumber].messageJumpButton.classList.remove("hide");
      }
  }

  addAllSingleGamePages(game) {
    // this.addPageHome(game);
    const scores = game.getGameDetails();
    for (let i = 0; i < scores.length; i++) {
      this.singleGamePages[i] = new SingleGamePage(i, scores[i].scoreString);
      this.pageContainer.append(this.singleGamePages[i].render());
    }
  }


  addMenuBarItemSingleGamePages(game) {

    //<li class="page-item"><a class="page-link" href="#">1</a></li>

    const scores = game.getGameDetails();
    for (let i = 0; i < scores.length; i++) {
      const menuItem = View.createElement("li", null, "page-item");

      const menuLink = View.createElement("a", null, ["page-link", "bg-dark", "border-0", "link-offset-2", "link-light", "link-underline-opacity-10", "link-underline-opacity-100-hover"]);
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
    const menuLink = View.createElement("a", null, ["page-link", "bg-dark", "border-0"])
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
    const scores = game.getGameDetails();
    // add 2x as many items as there are games. add 4x if only 1 or 2 games.
    let multiplier = 2;
    if (scores.length < 3) multiplier = 4
    for (let i = 0; i < scores.length * multiplier; i++) {
      this.tickerItems[i] = View.createElement("span", null, ["newsTickerItem"]);
      this.tickerItems[i].innerHTML = scores[i % scores.length].scoreString;

      newsTickerRibbon.append(this.tickerItems[i]);
    }
    this.newsTickerContainer.append(newsTickerRibbon);
  }



  addMenuBarItemLive() {
    const menuItem = View.createElement("li", null, "page-item");
    const menuLink = View.createElement("a", null, ["page-link", "bg-dark", "border-0"])
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



  showPage(pageName) {
    const els = document.getElementsByClassName("page");
    Array.from(els).forEach((el) => {
      el.classList.add("hide")
    });
    document.getElementById(pageName).classList.remove("hide");

  }


}