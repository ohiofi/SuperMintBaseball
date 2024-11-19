class PlayBall extends BaseballGameState{
    constructor(){
        super();
    this.name = "PlayBall";
    }

    handle(baseballGame){
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