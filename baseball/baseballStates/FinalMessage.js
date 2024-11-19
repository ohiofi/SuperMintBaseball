class FinalMessage extends BaseballGameState{
    constructor(){
        super();
    this.name = "FinalMessage";
    }
    handle(baseballGame){
        baseballGame.finalMessage = true;
        this.nextState(baseballGame)
        baseballGame.getWinningTeam().manager.notify(
            new StatsEvent(StatsEventType.GAME_WINNER,baseballGame.getWinningTeam())
        )
        baseballGame.getLosingTeam().manager.notify(
            new StatsEvent(StatsEventType.GAME_LOSER,baseballGame.getLosingTeam())
        )
        return baseballGame.getWinningTeam().getNameWithLink()+" defeated "+baseballGame.getLosingTeam().getNameWithLink()
        
    }

    nextState(baseballGame){
        baseballGame.setGameState(new EndOfGame());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }


}