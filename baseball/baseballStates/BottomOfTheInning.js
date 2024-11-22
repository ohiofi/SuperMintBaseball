class BottomOfTheInning extends BaseballGameState{
    constructor(){
        super();
    this.name = "BottomOfTheInning";
    }
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
        baseballGame.setInningTop(false);
        baseballGame.setOffenseTeam();
        baseballGame.threeOutsCleanup()
        // away team is pitching
        baseballGame.awayTeam.pitcher.manager.notify(
            new StatsEvent(StatsEventType.INNINGS_PITCHED,baseballGame.awayTeam.leagueIdNumber,baseballGame.awayTeam.pitcher.leagueIdNumber)
        )
        // check if new inning needs added to box score
        if(baseballGame.getInning() > baseballGame.boxScore.home.innings.length){
            baseballGame.boxScore.home.innings.push(0);
        }
        return "Bottom of inning " + baseballGame.getInning() + ', ' +
        baseballGame.offenseTeam.getNameWithLink() + " batting.";
    }
}