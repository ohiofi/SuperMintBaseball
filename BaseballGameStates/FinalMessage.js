class FinalMessage extends BaseballGameState{
    constructor(){
        super();
    this.name = "FinalMessage";
    }
    handle(baseballGame){
        baseballGame.finalMessage = true;
        this.nextState(baseballGame)
        return baseballGame.getWinningTeam().getNameWithLink()+" defeated "+baseballGame.getLosingTeam().getNameWithLink()
        
    }

    nextState(baseballGame){
        baseballGame.setGameState(new EndOfGame());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }


}