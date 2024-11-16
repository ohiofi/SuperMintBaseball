const GameStates = {
    SETUP: 0,
    MORNING: 1,
    AFTERNOON: 2,
    EVENING:3,
    NIGHT: 4
}

class Game{
    constructor(){
        this.users = [];
        this.league = new League(12);
    }

    getScores(){
        return this.league.getScores();
    }

    nextGameMessages(){
        return this.league.nextGameMessages();
    }
}