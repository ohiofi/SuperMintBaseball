class TopOfTheInning extends BaseballGameState{
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
        baseballGame.setOffenseTeam(baseballGame.getAwayTeam());
        baseballGame.threeOutsCleanup();
        baseballGame.incrementInning();
        return "Top of inning " + baseballGame.getInning() + ", " + baseballGame.getAwayTeam().getName() + " batting.";
    }
}