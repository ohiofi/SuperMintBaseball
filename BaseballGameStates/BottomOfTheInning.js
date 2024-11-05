class BottomOfTheInning extends BaseballGameState{
    handle(baseballGame){
        this.nextState(baseballGame)
        return this.setupBottomInning(baseballGame)
    }

    nextState(baseballGame){
        baseballGame.setGameState(new HomePlayerStepsUpToBat());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }

    setupBottomInning(baseballGame) {
        baseballGame.setOffenseTeam(baseballGame.getHomeTeamName());
        baseballGame.threeOutsCleanup()
        return "Bottom of inning " + baseballGame.getInning() + ", " + baseballGame.getHomeTeamName() + " batting.";
    }
}