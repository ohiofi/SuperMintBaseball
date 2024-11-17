class HomePlayerStepsUpToBat extends BaseballGameState{
    constructor(){
        super();
    this.name = "HomePlayerStepsUpToBat"
    }
    handle(baseballGame){
        this.nextState(baseballGame);
        baseballGame.nextBatter();
        return '<a href="#" class="link link-light link-underline-opacity-25 link-underline-opacity-100-hover" onclick="app.updateModal('+baseballGame.batter.leagueIdNumber+');" data-bs-target="#myModal" data-bs-toggle="modal" >'+
        baseballGame.getBatterFullName() + "</a> steps up to bat for the " + baseballGame.getHomeTeamName();
                
    }

    nextState(baseballGame){
        baseballGame.setGameState(new HomePlayerAtBat());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }
}