class InningIsNowAnOuting extends BaseballGameState{

    handle(baseballGame){
        this.nextState(baseballGame);
        return "Inning " + baseballGame.getInning() + " is now an Outing."
    }

    nextState(baseballGame){
        baseballGame.setGameState(new TopOfTheInning());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }
}