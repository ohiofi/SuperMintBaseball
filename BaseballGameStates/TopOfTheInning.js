class TopOfTheInning extends BaseballGameState{

    constructor(){
        super();
        this.name = "TopOfTheInning";
    }
    


    handle(baseballGame){
        this.nextState(baseballGame);
        return this.setupTopInning(baseballGame)
    }

    nextState(baseballGame){
        baseballGame.setGameState(new AwayPlayerStepsUpToBat());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }

    setupTopInning(baseballGame) {
        baseballGame.setOffenseTeam(baseballGame.getAwayTeamName());
        baseballGame.threeOutsCleanup();
        baseballGame.incrementInning();
        return "Top of inning " + baseballGame.getInning() + ", " + baseballGame.getAwayTeamName() + " batting.";
    }
}