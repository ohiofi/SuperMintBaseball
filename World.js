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
        this.league = new League(22);
        this.newsTicker = new NewsTicker();
        this.shop = new Shop();
        for(let i=0; i<this.league.teams.length;i++){
            this.shop.pitcherCards.push(
                new TradingCard(
                    this.league.teams[i].getPitcher(),
                    5,
                    1,
                    new Valuables({"tickets":1}),
                    StatsEventType.STRIKEOUTS_THROWN
                ))
        }
    }



    getGameDetails(){
        return this.league.getGameDetails();
    }

    nextGameMessages(){
        return this.league.nextGameMessages();
    }
}