const WorldStates = {
    SETUP: 0,
    MORNING: 1,
    AFTERNOON: 2,
    EVENING:3,
    NIGHT: 4
}

class World{
    constructor(){
        this.users = [];
        this.league = new League(parseInt(rng.random()*8 + rng.random()*8 + 12));
        this.newsTicker = new NewsTicker();
    }

    getGameDetails(){
        return this.league.getGameDetails();
    }

    nextGameMessages(){
        return this.league.nextGameMessages();
    }
}