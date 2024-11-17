class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.view.addTickerItems(this.model.game);
    //this.view.addPageMenuBarItems(this.model.game);
    this.view.addPageHome(this.model.game)
    const gameMessages = this.view.addPageLiveGames(this.model.game);
    this.view.addAllGamePages(this.model.game);
    this.view.addGameMessages(gameMessages)
    this.view.addMenuBarItemGamePages(this.model.game)
    this.timeIntervalId;
    this.speed = 3000;
    




    // News Ticker

    this.newsTickerInterval = setInterval(() => {
      // app.view.updateHomePageListGroupItems(app.model.game);
      this.model.game.newsTicker.update(this.model.game.getScores());
      this.model.game.newsTicker.show();
    }, 5000);



    // Get Game Messages


    // Set a new interval
    this.gameMessageInterval = setInterval(() => {
      let gameMessages = this.model.game.nextGameMessages();
      this.updateHomePageListGroupItems(this.model.game.getScores());
      this.view.addGameMessages(gameMessages);
      this.updateGamePageBoxScores(gameMessages)
      this.updateGamePageHeadings(this.model.game.getScores());
      this.updateGameWidgetItems(gameMessages);

    }, this.speed);
    
  }

  updateGamePageBoxScores(gameMessages) {
    for (let i = 0; i < gameMessages.length; i++) {
      this.view.gamePages[i].children[1].innerHTML = gameMessages[i].boxScoreTable
    }
  }

  updateGamePageHeadings(scores) {
    for (let i = 0; i < scores.length; i++) {
      this.view.gamePages[i].children[0].children[1].innerHTML = scores[i]
    }
  }


  updateGameWidgetItems(gameMessages) {
    for (let i = 0; i < gameMessages.length; i++) {
      //this.gameWidgetItems[i].innerHTML = gameMessages[i].name + "<br>" + gameMessages[i].text; 

      const gameWidgetLeft = this.view.gameWidgetItems[i].children[0]
      gameWidgetLeft.children[0].textContent = gameMessages[i].inning;
      gameWidgetLeft.children[1].children[1].textContent = gameMessages[i].scoreObject.away;
      gameWidgetLeft.children[2].children[1].textContent = gameMessages[i].scoreObject.home;

      const gameWidgetBaseIcons = this.view.gameWidgetItems[i].children[1].children[0]
      gameWidgetBaseIcons.innerHTML = gameMessages[i].baseIcons;

      const gameWidgetCountContainer = this.view.gameWidgetItems[i].children[1].children[1]
      gameWidgetCountContainer.children[1].textContent = gameMessages[i].count.balls;
      gameWidgetCountContainer.children[3].textContent = gameMessages[i].count.strikes;
      gameWidgetCountContainer.children[5].textContent = gameMessages[i].count.outs;

      const gameWidgetRight = this.view.gameWidgetItems[i].children[2]
      gameWidgetRight.innerHTML = gameMessages[i].log;

    }
  }

  updateHomePageListGroupItems(scores) {
    for (let i = 0; i < scores.length; i++) {
      this.view.homePageListGroupItems[i].children[1].innerHTML = scores[i];
    }
  }

  updateModal(idNumber) {
    console.log("updateModal "+idNumber)
    const object = this.model.game.league.lookupLeagueId(idNumber);
    if (object === null) throw new Error("updateModal could not find " + idNumber);
    // modal > modal-dialog > modal-content > modal-header
    const modalTitle = this.view.modal.children[0].children[0].children[0].children[0];
    // modal > modal-dialog > modal-content > modal-body
    const modalBody = this.view.modal.children[0].children[0].children[1];
    modalTitle.innerHTML = object.getFullName();
    modalBody.innerHTML = object.toString();

  }

  




}