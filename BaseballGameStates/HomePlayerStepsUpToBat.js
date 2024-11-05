class HomePlayerStepsUpToBat extends BaseballGameState{

    handle(baseballGame){
        this.nextState(baseballGame);
        baseballGame.nextBatter();
        return baseballGame.getBatter().getFullName() + " steps up to bat for the " + baseballGame.getHomeTeam().getName() + baseballGame.getBaseStatus();
                
    }

    nextState(baseballGame){
        baseballGame.setGameState(new HomePlayerAtBat());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }
}