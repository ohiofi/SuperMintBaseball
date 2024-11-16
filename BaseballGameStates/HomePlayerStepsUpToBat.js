class HomePlayerStepsUpToBat extends BaseballGameState{
    constructor(){
        super();
    this.name = "HomePlayerStepsUpToBat"
    }
    handle(baseballGame){
        this.nextState(baseballGame);
        baseballGame.nextBatter();
        return baseballGame.getBatterFullName() + " steps up to bat for the " + baseballGame.getHomeTeamName();
                
    }

    nextState(baseballGame){
        baseballGame.setGameState(new HomePlayerAtBat());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }
}