class AwayPlayerStepsUpToBat extends BaseballGameState{
    constructor(){
        super();
    this.name = "AwayPlayerStepsUpToBat"
    }
    handle(baseballGame){
        this.nextState(baseballGame);
        baseballGame.nextBatter();
        baseballGame.batter.manager.notify(
            new StatsEvent(StatsEventType.AT_BATS,baseballGame.offenseTeam,baseballGame.batter)
        )
        return '<a href="#" class="link link-light link-underline-opacity-25 link-underline-opacity-100-hover" onclick="app.view.modal.update('+baseballGame.batter.leagueIdNumber+');" data-bs-target="#statsModal" data-bs-toggle="modal" >'+
        baseballGame.getBatterFullName() + "</a> steps up to bat for the " + baseballGame.awayTeam.getNameWithLink();
    }

    nextState(baseballGame){
        baseballGame.setGameState(new AwayPlayerAtBat());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }
}