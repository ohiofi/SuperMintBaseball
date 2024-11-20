class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.view.addNewsTickerItems(this.model.world);
    //this.view.addPageMenuBarItems(this.model.world);
    this.view.homePage.addlistGroupScores(this.model.world)
    this.view.addAllSingleGamePages(this.model.world);
    this.view.addMenuBarItemSingleGamePages(this.model.world);

    const gameMessages = this.model.world.nextGameMessages();
    
    this.view.liveGamesPage.addGameWidgets(gameMessages);
    this.view.addGameMessages(gameMessages);
    
    this.timeIntervalId;
    this.speed = 1000;
    




    // News Ticker

    this.newsTickerInterval = setInterval(() => {
      this.model.world.newsTicker.update(this.model.world.getScores());
      this.model.world.newsTicker.show();
    }, 5000);



    // Get Game Messages


    // Set a new interval
    this.gameMessageInterval = setInterval(() => {
      let gameMessages = this.model.world.nextGameMessages();
      this.updateHomePageListGroupItems(this.model.world.getScores());
      this.view.addGameMessages(gameMessages);
      this.updateGamePageBoxScores(gameMessages)
      this.updateGamePageHeadings(this.model.world.getScores());
      this.updateGameWidgetItems(gameMessages);

    }, this.speed);
    
  }

  updateGamePageBoxScores(gameMessages) {
    for (let i = 0; i < gameMessages.length; i++) {
      this.view.singleGamePages[i].boxScoreTable.innerHTML = gameMessages[i].boxScoreTable
    }
  }

  updateGamePageHeadings(scores) {
    for (let i = 0; i < scores.length; i++) {
      this.view.singleGamePages[i].headlineGameScore.innerHTML = scores[i]
    }
  }


  updateGameWidgetItems(gameMessages) {
    for (let i = 0; i < gameMessages.length; i++) {
      this.view.liveGamesPage.widgets[i].update(gameMessages[i]);
      

    }
  }

  updateHomePageListGroupItems(scores) {
    for (let i = 0; i < scores.length; i++) {
      this.view.homePage.listGroupScores[i].innerHTML = scores[i];
    }
  }

  updateModal(idNumber) {
    console.log("updateModal "+idNumber)
    const object = this.model.world.league.lookupLeagueId(idNumber);
    if (object === null) throw new Error("updateModal could not find " + idNumber);
    // modal > modal-dialog > modal-content > modal-header
    const modalTitle = this.view.modal.children[0].children[0].children[0].children[0];
    // modal > modal-dialog > modal-content > modal-body
    const modalBody = this.view.modal.children[0].children[0].children[1];
    modalTitle.innerHTML = object.getFullName();
    modalBody.innerHTML = object.toString();

  }

  




}