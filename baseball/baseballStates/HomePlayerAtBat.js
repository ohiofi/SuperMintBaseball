class HomePlayerAtBat extends BaseballGameState {
    constructor(){
        super();
    this.name = "HomePlayerAtBat"
    }

    handle(baseballGame) {
        let result = baseballGame.nextPitch();
        if (baseballGame.getOuts() >= 3) {
            this.nextState(baseballGame);
        } else if (baseballGame.getStrikes() >= 3) {
            this.previousState(baseballGame)
            this.threeStrikesCleanup();
        } else if (baseballGame.getBalls() >= 4) {
            this.previousState(baseballGame)
            this.fourBallsCleanup();
        }
        // check if game is over
        if (baseballGame.getOuts() >= 3 && baseballGame.getInning() >= 9 && baseballGame.score.home != baseballGame.score.away) {
            baseballGame.setGameState(new FinalMessage());
        }
        return result
    }

    nextState(baseballGame) {
        baseballGame.setGameState(new InningIsNowAnOuting());
    }

    previousState(baseballGame) {
        baseballGame.setGameState(new HomePlayerStepsUpToBat());
    }
}