class AwayPlayerAtBat extends BaseballGameState {
    constructor() {
        super();
        this.name = "AwayPlayerAtBat";
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
        // check if game is over early
        if (baseballGame.getOuts() >= 3 && baseballGame.getInning() >= 9 && baseballGame.getScore().home > baseballGame.getScore().away) {
            baseballGame.setGameState(new EndOfGame());
        }
        return result
    }

    nextState(baseballGame) {
        baseballGame.setGameState(new BottomOfTheInning());
    }

    previousState(baseballGame) {
        baseballGame.setGameState(new AwayPlayerStepsUpToBat());
    }
}