class AwayPlayerStepsUpToBat extends BaseballGameState{
    constructor(){
        super();
    this.name = "AwayPlayerStepsUpToBat"
    }
    handle(baseballGame){
        this.nextState(baseballGame);
        baseballGame.nextBatter();
        return baseballGame.getBatterFullName() + " steps up to bat for the " + baseballGame.getAwayTeamName();
    }

    nextState(baseballGame){
        baseballGame.setGameState(new AwayPlayerAtBat());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }
}