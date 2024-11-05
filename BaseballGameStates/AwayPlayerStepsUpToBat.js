class AwayPlayerStepsUpToBat extends BaseballGameState{

    handle(baseballGame){
        this.nextState(baseballGame);
        baseballGame.nextBatter();
        return baseballGame.getBatterName() + " steps up to bat for the " + baseballGame.getAwayTeamName() + baseballGame.getBaseStatus();
    }

    nextState(baseballGame){
        baseballGame.setGameState(new AwayPlayerAtBat());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }
}