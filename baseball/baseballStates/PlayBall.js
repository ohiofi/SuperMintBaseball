class PlayBall extends AbstractBaseballGameState{
    constructor(){
        super();
    this.name = "PlayBall";
    }

    handle(baseballGame){
        // retrieve the up-to-date versions of the teams
        baseballGame.homeTeam = app.model.world.league.lookup(baseballGame.homeTeam.leagueIdNumber)
        baseballGame.awayTeam = app.model.world.league.lookup(baseballGame.awayTeam.leagueIdNumber)
        baseballGame.defenseTeam = baseballGame.homeTeam;
        baseballGame.offenseTeam = baseballGame.awayTeam;
        baseballGame.pitcher = baseballGame.defenseTeam.getPitcher();
        this.nextState(baseballGame);
        baseballGame.setGameStarted();
        return "PLAY BALL!";
    }

    nextState(baseballGame){
        baseballGame.setGameState(new TopOfTheInning());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }
}