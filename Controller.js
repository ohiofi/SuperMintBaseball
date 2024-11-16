class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.view.addTickerItems(this.model.game);
    //this.view.addPageMenuBarItems(this.model.game);
    this.view.addLiveGamesPage(this.model.game);
    this.view.addPages(this.model.game);
    this.timeIntervalId;
    this.speed = 3000;


      // News Ticker

  this.newsTickerInterval = setInterval(() => {
    // app.view.updateGameListGroupItems(app.model.game);
    this.view.updateTickerItems(this.model.game.getScores());
    let parent = document.getElementById('newsTickerContainer');
    let slide = parent.querySelectorAll('.newsTickerItem');
    for (let i = 0; i < slide.length; i++) {
        slide[i].classList.toggle('sliding-now');
      }
    setTimeout(function() {
      parent.appendChild(slide[0]);
    }, 5000);

  }, 5000);



// Get Game Messages


    // Set a new interval
  this.gameMessageInterval = setInterval(() => {
        let gameMessages = this.model.game.nextGameMessages();
        this.view.updateGameListGroupItems(this.model.game.getScores());
        this.view.addGameMessages(gameMessages);
        this.view.updateGameWidgetItems(gameMessages);
      
    }, this.speed);
  }




}