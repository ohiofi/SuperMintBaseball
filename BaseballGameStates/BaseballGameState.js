/* this is an "abstract" class that lists the basic methods that all baseball game states must have */
class BaseballGameState {

    static restructure(jsonObject){
        switch(jsonObject.name){
            case "AwayPlayerAtBat":
                Object.setPrototypeOf(jsonObject, AwayPlayerAtBat.prototype);
                break
            case "AwayPlayerStepsUpToBat":
                Object.setPrototypeOf(jsonObject, AwayPlayerStepsUpToBat.prototype);
                break
            case "BottomOfTheInning":
                Object.setPrototypeOf(jsonObject, BottomOfTheInning.prototype);
                break
            case "EndOfGame":
                Object.setPrototypeOf(jsonObject, EndOfGame.prototype);
                break
            case "HomePlayerAtBat":
                Object.setPrototypeOf(jsonObject, HomePlayerAtBat.prototype);
                break
            case "HomePlayerStepsUpToBat":
                Object.setPrototypeOf(jsonObject, HomePlayerStepsUpToBat.prototype);
                break
            case "InningIsNowAnOuting":
                Object.setPrototypeOf(jsonObject, InningIsNowAnOuting.prototype);
                break
            case "PlayBall":
                Object.setPrototypeOf(jsonObject, PlayBall.prototype);
                break
            case "TopOfTheInning":
                Object.setPrototypeOf(jsonObject, TopOfTheInning.prototype);
                break
        }
        return jsonObject;
    }

    

    constructor() {
        this.name = "BaseballGameState";
        // if (this.constructor === BaseballGameState) {
        //     throw new Error("Class is of abstract type and can NOT be instantiated");
        // };

        if(this.handle === undefined) {
            throw new Error("Must implement the method handle");
        };

        if(this.nextState === undefined) {
            throw new Error("Must implement the method nextState");
        };

        if(this.previousState === undefined) {
            throw new Error("Must implement the method previousState");
        };

        
    }

    handle(baseballGame) {
        throw new Error("Must implement the method handle");
    }

    nextState(baseballGame) {
        throw new Error("Must implement the method nextState");
    }

    previousState(baseballGame) {
        throw new Error("Must implement the method previousState");
    }

    

}