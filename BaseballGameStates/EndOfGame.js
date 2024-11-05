class EndOfGame extends BaseballGameState{


    handle(baseballGame){
        baseballGame.setGameOver();
        return baseballGame.getName();
        
    }

    nextState(baseballGame){
        throw new Error("Cannot move to next state");
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }


}