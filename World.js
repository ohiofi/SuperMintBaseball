const WorldStates = {
    SETUP: 0,
    MORNING: 1,
    AFTERNOON: 2,
    EVENING:3,
    NIGHT: 4
}



class World{
    constructor(){
        this.year = 0;
        this.day = 0;
        this.league = new League(24);
        this.newsTicker = new NewsTicker();
        // news tickers subscribes to teams so it can display winning teams
        for(let each of this.league.teams){
            this.newsTicker.teamNames[each.leagueIdNumber] = each.getName();
            each.manager.subscribe(this.newsTicker.handleEvent);
        }
        this.shop = new Shop();
        this.shop.addCards(this.league.getTeamsPlayingToday(this.year,this.day))
        
        this.plot = new PlotDevice();
        this.newsNetwork = new BroadcastNews();
    }

    



    getGameDetails(){
        return this.league.getGameDetails(this.year,this.day);
    }

    getSchedule() {
        return this.league.getSchedule();
    }

    getStandingsTableBatters(limit) {
        return this.league.getStandingsTableBatters(limit);
    }

    getStandingsTablePitchers(limit) {
        return this.league.getStandingsTablePitchers(limit);
    }

    getStandingsTableTeams() {
        return this.league.getStandingsTableTeams();
    }

    getTime(){
        return "Year "+this.model.world.league.currentSeason+" Day "+this.model.world.league.seasons[this.model.world.league.currentSeason].currentDay;
    }

    isTodayDone() {
        return this.league.isTodayDone();
    }

    nextGameMessages(){
        return this.league.nextGameMessages();
    }

    

    reloadTeams() {
        this.league.reloadTeams();
    }
}