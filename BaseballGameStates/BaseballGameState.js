/* this is an "abstract" class that lists the basic methods that all baseball game states must have */
class BaseballGameState {

    constructor() {
        if (this.constructor === BaseballGameState) {
            throw new Error("Class is of abstract type and can NOT be instantiated");
        };

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

    // handle(baseballGame) {
    //     throw new Error("Must implement the method handle");
    // }

    // nextState(baseballGame) {
    //     throw new Error("Must implement the method nextState");
    // }

    // previousState(baseballGame) {
    //     throw new Error("Must implement the method previousState");
    // }

    

}