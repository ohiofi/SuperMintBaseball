/* this is an "abstract" class that demonstrates the basic methods that all baseball game states must have */
class BaseballGameState {

    constructor() {
        if (this.constructor == BaseballGameState) {
            throw new Error("Class is of abstract type and can't be instantiated");
        };

        if (this.handle == undefined) {
            throw new Error("Must implement the method handle");
        };

        if (this.getNextState == undefined) {
            throw new Error("Must implement the method getNextState");
        };

        if (this.getPreviousState == undefined) {
            throw new Error("Must implement the method getPreviousState");
        };
    }

    getNextState() {
        throw new Error("Must implement the method getNextState");
    }

    getPreviousState() {
        throw new Error("Must implement the method getPreviousState");
    }

    handle(baseballGame) {
        throw new Error("Must implement the method handle");
    }

}