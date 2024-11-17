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
        baseballGame.setOffenseTeam(baseballGame.getHomeTeamName());
        baseballGame.threeOutsCleanup()
        baseballGame.setInningTop(false);
        // check if new inning needs added to box score
        if(baseballGame.getInning() > baseballGame.boxScore.home.innings.length){
            baseballGame.boxScore.home.innings.push(0);
        }
        return "Bottom of inning " + baseballGame.getInning() + ', ' +
        baseballGame.homeTeam.getNameWithLink() + " batting.";
    }
}