class AwayPlayerStepsUpToBat extends AbstractBaseballGameState{
    constructor(){
        super();
    this.name = "AwayPlayerStepsUpToBat"
    }
    handle(baseballGame){
        this.nextState(baseballGame);
        baseballGame.nextBatter();
        baseballGame.batter.manager.notify(
            new StatsEvent(StatsEventType.PLATE_APPEARANCES,baseballGame.offenseTeam.leagueIdNumber,baseballGame.batter.leagueIdNumber)
        )
        return baseballGame.batter.getFullNameWithLink(20) + " steps up to bat for the " + baseballGame.awayTeam.getNameWithLink(20);
    }

    nextState(baseballGame){
        baseballGame.setGameState(new AwayPlayerAtBat());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }
}