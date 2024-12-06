class HomePlayerStepsUpToBat extends AbstractBaseballGameState{
    constructor(){
        super();
    this.name = "HomePlayerStepsUpToBat"
    }
    handle(baseballGame){
        this.nextState(baseballGame);
        baseballGame.nextBatter();
        baseballGame.batter.manager.notify(
            new StatsEvent(StatsEventType.PLATE_APPEARANCES,baseballGame.offenseTeam.leagueIdNumber,baseballGame.batter.leagueIdNumber)
        )
        return baseballGame.batter.getFullNameWithLink(20) + " steps up to bat for the " + baseballGame.homeTeam.getNameWithLink(20);
                
    }

    nextState(baseballGame){
        baseballGame.setGameState(new HomePlayerAtBat());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }
}