class HomePlayerStepsUpToBat extends BaseballGameState{

    handle(baseballGame){
        this.nextState(baseballGame);
        baseballGame.nextBatter();
        return baseballGame.getBatterName() + " steps up to bat for the " + baseballGame.getHomeTeamName() + baseballGame.getBaseStatus();
                
    }

    nextState(baseballGame){
        baseballGame.setGameState(new HomePlayerAtBat());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }
}