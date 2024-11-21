class TopOfTheInning extends BaseballGameState{

    constructor(){
        super();
        this.name = "TopOfTheInning";
    }
    


    handle(baseballGame){
        this.nextState(baseballGame);
        return this.setupTopInning(baseballGame)
    }

    nextState(baseballGame){
        baseballGame.setGameState(new AwayPlayerStepsUpToBat());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }

    setupTopInning(baseballGame) {
        baseballGame.setInningTop(true);
        baseballGame.setOffenseTeam();
        baseballGame.threeOutsCleanup();
        baseballGame.incrementInning();
        baseballGame.pitcher.manager.notify(
            new StatsEvent(StatsEventType.INNINGS_PITCHED,baseballGame.defenseTeam,baseballGame.pitcher)
        )
        // check if new inning needs added to box score
        if(baseballGame.getInning() > baseballGame.boxScore.away.innings.length){
            baseballGame.boxScore.away.innings.push(0);
        }
        // return "Top of inning " + baseballGame.getInning() + ', <a href="#" class="link link-light link-underline-opacity-25 link-underline-opacity-100-hover" onclick="app.view.modal.update('+baseballGame.awayTeam.leagueIdNumber+');" data-bs-target="#statsModal" data-bs-toggle="modal" >'+
        // baseballGame.getAwayTeamName() + "</a> batting.";
        return "Top of inning " + baseballGame.getInning() + ', ' +
        baseballGame.offenseTeam.getNameWithLink() + " batting.";
    }
}