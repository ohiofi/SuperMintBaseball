//import random
//from Team import Team
//from Season import Season
//from Player import Player

class League {

    static leagueIdNumberCount = 0;

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, League.prototype);
        for (let i = 0; i < jsonObject.teams.length; i++) {
            jsonObject.teams[i] = Object.setPrototypeOf(jsonObject.teams[i], BaseballTeam.prototype);
        }
        for (let i = 0; i < jsonObject.freeAgentList.length; i++) {
            jsonObject.freeAgentList[i] = Object.setPrototypeOf(jsonObject.freeAgentList[i], BaseballPlayer.prototype);
        }
        for (let i = 0; i < jsonObject.seasons.length; i++) {
            jsonObject.seasons[i] = Object.setPrototypeOf(jsonObject.seasons[i], Season.prototype);
        }
        return jsonObject;
    }

    constructor(numberOfTeams) {
        this.numberOfTeams = numberOfTeams
        this.teams = []
        this.freeAgentList = []
        // make teams
        for (let i = 0; i < this.numberOfTeams; i++) {
            let tempTeam = new BaseballTeam();
            tempTeam.manager.subscribe(this.handleEvent);
            tempTeam.leagueIdNumber = League.leagueIdNumberCount++;
            this.teams.push(tempTeam);
            // fill teams with players
            for (let i = 0; i < BaseballTeam.playersPerTeam; i++) {
                let tempPlayer = new BaseballPlayer();
                let potentialPlayer2 = new BaseballPlayer();
                if (tempPlayer.getOverallAptitude() < potentialPlayer2.getOverallAptitude()) {
                    tempPlayer = potentialPlayer2;
                }
                tempPlayer.leagueIdNumber = League.leagueIdNumberCount++;
                tempTeam.addPlayer(tempPlayer)
                tempPlayer.manager.subscribe(this.handleEvent);
            }
        }

        this.seasons = [new Season(this.teams)]
        this.colorScheme = {
            light:"#7aafff",// hsl 216, 100%, 72%
            mid:"#D50032",  // hsl 346, 100%, 42%
            dark:"#002D72"  // hsl 216, 100%, 22%
        };
        this.crest = new Crest(this.colorScheme,"ioLB")
    }

    getPlayer(someObject) {
        for (let i = 0; i < this.teams.length; i++) {
            for (let j = 0; j < this.teams[i].players.length; j++) {
                if (this.teams[i].players[j].equals(someObject)) {
                    return this.teams[i].players[j];
                }
            }
        }
        // check the free agents
        for (let i = 0; i < this.freeAgentList.length; i++) {
            if (this.freeAgentList[i].equals(someObject)) {
                return this.freeAgentList[i];
            }
        }
        return null;
    }

    getCommissionerFullName(){
        return `${this.crest.render(40)} Commissioner Vici`;
    }

    getGameDetails(year,day) {
        if(year == null) throw new Error("null year")
        if(day == null) throw new Error("null day")
        return this.seasons[year].getGameDetails(day);
    }

    getTeam(someObject) {
        for (let i = 0; i < this.teams.length; i++) {
            if (this.teams[i].equals(someObject)) {
                return this.teams[i];
            }
        }
        return null;
    }

    getTeamsPlayingToday(year,day) {
        if(year == null) throw new Error("null year")
        if(day == null) throw new Error("null day")
        return this.seasons[year].regularSeasonSchedule.getTeamsPlayingToday(day);
    }

    getSchedule(year){
        if(year == null) throw new Error("null year")
        return this.seasons[year].regularSeasonSchedule
    }

    getStandingsTableBatters(topN) {
        const dataCopy = [];
        for (let i = 0; i < this.teams.length; i++) {
            for (let j = 0; j < this.teams[i].players.length; j++) {
                dataCopy.push(this.teams[i].players[j])
            }
        }
        dataCopy.sort((a, b) => b.stats.getBattingAverage() - a.stats.getBattingAverage());
        // Handle ties
        let rank = 1;
        let previousHits = null;
        let tieRank = 1;
        //let table = '<table class="table table-striped table-dark"><thead><tr><th>#</th><th>Batter Name</th><th>OPS</th></tr></thead><tbody>';
        let table = `
    <table class="table table-striped table-dark shadow rounded-2 overflow-hidden  table-borderless">
        <thead>
    <tr>
        <th class="text-secondary">
            <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="League rank">#</a>
        </th>
        <th class="text-secondary">
            <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Name of the batter">Batter Name</a>
        </th>
        <th class="text-secondary">
            <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Batting Average: hits divided by at-bats">BA</a>
        </th>
        <th class="text-secondary">
            <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Total number of hits achieved">Hits</a>
        </th>
        <th class="text-secondary">
            <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="On-base Plus Slugging: a combination of on-base percentage and slugging percentage">OPS</a>
        </th>
    </tr>
</thead>
        <tbody>
    `;
        let count = 0;
        for (let i = 0; i < dataCopy.length; i++) {
            const player = dataCopy[i];
            // If the player hits are the same as the previous one, they share the rank
            if (player.stats.hits !== previousHits) {
                rank = tieRank;  // New rank for the current player
                previousHits = player.stats.hits;  // Update previous hits
            }
            tieRank++;
            table += `
        <tr class="overflow-hidden">
            <td>${rank}</td>
            <td>${player.getFullNameWithLink()}</td>
            <td>${player.stats.getBattingAverage()}</td>
            <td>${player.stats.hits}</td>
            <td>${player.stats.getOnBasePlusSlugging()}</td>
        </tr>
        `;
            count++;
            if (count >= topN) {
                break;
            }
        }
        // Close the table tags
        table += '</tbody></table>';
        // Return the generated HTML table
        return table;
    }

    getStandingsTablePitchers(topN) {
        const dataCopy = [];
        for (let each of this.teams) {
            dataCopy.push(each.pitcher)
        }
        dataCopy.sort((a, b) => b.stats.getStrikeoutsPerNineInnings() - a.stats.getStrikeoutsPerNineInnings());
        // Handle ties
        let rank = 1;
        let previousStrikeoutsThrown = null;
        let tieRank = 1;
        let table = `
    <table class="table table-striped table-dark shadow rounded-2 overflow-hidden  table-borderless">
        <thead>
            <tr>
                <th class="text-secondary">
                    <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="League Rank">#</a>
                </th>
                <th class="text-secondary">
                    <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Name of the pitcher">Pitcher Name</a>
                </th>
                <th class="text-secondary">
                    <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Strikeouts per nine innings pitched">SO/9</a>
                </th>
                <th class="text-secondary">
                    <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Total number of strikeouts achieved">SO</a>
                </th>
                <th class="text-secondary">
                    <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Earned Run Average: the average number of earned runs allowed per nine innings pitched">ERA</a>
                </th>
            </tr>
        </thead>
        <tbody>
    `;
        let count = 0;
        for (let i = 0; i < dataCopy.length; i++) {
            const player = dataCopy[i];
            // If the player strikeoutsThrown are the same as the previous one, they share the rank
            if (player.stats.strikeoutsThrown !== previousStrikeoutsThrown) {
                rank = tieRank;  // New rank for the current player
                previousStrikeoutsThrown = player.stats.strikeoutsThrown;  // Update previous wins
            }
            tieRank++;
            table += `
        <tr>
            <td>${rank}</td>
            <td>${player.getFullNameWithLink()}</td>
            <td>${player.stats.getStrikeoutsPerNineInnings()}</td>
            <td>${player.stats.strikeoutsThrown}</td>
            <td>${player.stats.getEarnedRunAverage()}</td>
        </tr>
        `;
            count++;
            if (count >= topN) {
                break;
            }
        }
        // Close the table tags
        //table += '</tbody></table>';
        // Return the generated HTML table
        return table;
    }

    getStandingsTableTeams() {
        // Copy the original array to avoid modifying the original 
        const dataCopy = [...this.teams];
    
        // Sort by win fraction, then wins, then negative losses
        dataCopy.sort((a, b) => {
            const winFractionA = a.stats.wins / (a.stats.wins + a.stats.losses || 1);
            const winFractionB = b.stats.wins / (b.stats.wins + b.stats.losses || 1);
            if (winFractionB !== winFractionA) {
                return winFractionB - winFractionA;
            }
            if (b.stats.wins !== a.stats.wins) {
                return b.stats.wins - a.stats.wins;
            }
            return a.stats.losses - b.stats.losses;
        });
    
        // Handle ranks
        let rank = 1;
        let previousWinFraction = null;
        let previousWins = null;
        let previousLosses = null;
        let tieRank = 1;
    
        // Create the table element
        let table = `
            <table class="table table-striped table-dark shadow rounded-2 overflow-hidden table-borderless">
                <thead>
                    <tr>
                        <th class="text-secondary">
                            <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="League Rank">#</a>
                        </th>
                        <th class="text-secondary">
                            <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Name of the team">Team Name</a>
                        </th>
                        <th class="text-secondary">
                            <a href="#" class="text-decoration-none link-secondary" data-toggle="tooltip" title="Win-Loss record of the team">W - L</a>
                        </th>
                    </tr>
                </thead>
                <tbody>
        `;
    
        // Iterate over the sorted data and generate rows
        for (let i = 0; i < dataCopy.length; i++) {
            const team = dataCopy[i];
            const winFraction = (team.stats.wins / (team.stats.wins + team.stats.losses || 1)).toFixed(3);
    
            // Handle tie ranks
            if (
                winFraction !== previousWinFraction || 
                team.stats.wins !== previousWins || 
                team.stats.losses !== previousLosses
            ) {
                rank = tieRank;
                previousWinFraction = winFraction;
                previousWins = team.stats.wins;
                previousLosses = team.stats.losses;
            }
            tieRank++;
    
            // Add a table row for the team with their rank
            table += `
                <tr>
                    <td>${rank}</td>
                    <td>${team.getNameWithLink()}</td>
                    <td>${team.stats.wins} - ${team.stats.losses}</td>
                </tr>
            `;
        }
    
        // Close the table tags
        table += '</tbody></table>';
    
        // Return the generated HTML table
        return table;
    }
    

    getNameableByFullName(someName) {
        // loop thru teams
        for (let i = 0; i < this.teams.length; i++) {
            if (this.teams[i].getFullName() === someName) {
                return this.teams[i];
            }
            // loop thru players
            for (let j = 0; j < this.teams[i].players.length; j++) {
                if (this.teams[i].players[j].getFullName() === someName) {
                    return this.teams[i].players[j];
                }
            }
        }
        return null;
    }

    handleEvent = (data) => {
        switch (data.eventType) {
            case StatsEventType.GAME_WINNER:
                const winningTeam = this.lookup(data.teamId)
                winningTeam.addWin()
                //app.model.world.newsTicker.setBreakingNews(winningTeam.getName() + " win! ");
                break
            case StatsEventType.GAME_LOSER:
                this.lookup(data.teamId).addLoss()
                break
            case StatsEventType.PLATE_APPEARANCES:
                this.lookup(data.teamId).addPlateAppearances()
                this.lookup(data.playerId).addPlateAppearances()
                break
            case StatsEventType.SINGLES:
                this.lookup(data.teamId).addSingles()
                this.lookup(data.playerId).addSingles()
                break
            case StatsEventType.DOUBLES:
                this.lookup(data.teamId).addDoubles()
                this.lookup(data.playerId).addDoubles()
                break
            case StatsEventType.TRIPLES:
                this.lookup(data.teamId).addTriples()
                this.lookup(data.playerId).addTriples()
                break
            case StatsEventType.HOME_RUNS:
                this.lookup(data.teamId).addHomeRuns()
                this.lookup(data.playerId).addHomeRuns()
                break
            case StatsEventType.BASES_ON_BALLS:
                this.lookup(data.teamId).addBasesOnBalls()
                this.lookup(data.playerId).addBasesOnBalls()
                break
            case StatsEventType.SACRIFICE_FLIES:
                this.lookup(data.teamId).addSacrificeFlies()
                this.lookup(data.playerId).addSacrificeFlies()
                break
            case StatsEventType.STRIKEOUTS_AT_BAT:
                this.lookup(data.teamId).addStrikeoutsAtBat()
                this.lookup(data.playerId).addStrikeoutsAtBat()
                break
            case StatsEventType.INNINGS_PITCHED:
                this.lookup(data.teamId).addInningsPitched()
                this.lookup(data.playerId).addInningsPitched()
                break
            case StatsEventType.STRIKEOUTS_THROWN:
                this.lookup(data.teamId).addStrikeoutsThrown()
                this.lookup(data.playerId).addStrikeoutsThrown()
                break
            case StatsEventType.RUNS_ALLOWED:
                this.lookup(data.teamId).addRunsAllowed() //
                this.lookup(data.playerId).addRunsAllowed()
                break
            case StatsEventType.HOME_RUNS_ALLOWED:
                this.lookup(data.teamId).addHomeRunsAllowed()
                this.lookup(data.playerId).addHomeRunsAllowed()
                break
            case StatsEventType.WALKS_ALLOWED:
                this.lookup(data.teamId).addWalksAllowed()
                this.lookup(data.playerId).addWalksAllowed()
                break
            case StatsEventType.RUNS_SCORED:
                this.lookup(data.teamId).addRunsScored()
                this.lookup(data.playerId).addRunsScored()
                break
            case StatsEventType.AT_BATS:
                this.lookup(data.teamId).addAtBats()
                this.lookup(data.playerId).addAtBats()
                break
        }


    }

    isTodayDone(year, day) {
        if(year == null) throw new Error("null year")
        if(day == null) throw new Error("null day")
        return this.seasons[year].isTodayDone(day);
    }

    lookup(idNum) {
        // loop thru teams
        for (let i = 0; i < this.teams.length; i++) {
            if (this.teams[i].leagueIdNumber === idNum) {
                return this.teams[i];
            }
            // loop thru players
            for (let j = 0; j < this.teams[i].players.length; j++) {
                if (this.teams[i].players[j].leagueIdNumber === idNum) {
                    return this.teams[i].players[j];
                }
            }
        }
        // check free agent list
        for (let i = 0; i < this.freeAgentList.length; i++) {
            if (this.freeAgentList[i].leagueIdNumber === idNum) {
                return this.freeAgentList[i];
            }
        }
        return null;
    }

    skipToday(){
        while(!this.isTodayDone()){
            this.nextGameMessages()
        }
    }

    reloadTeams(year,day){
        if(year == null) throw new Error("null year")
        if(day == null) throw new Error("null day")
        // loop thru each game today
        for(let each of this.seasons[year].getTodaysGames(day)){
            // retrieve the up-to-date versions of the teams
            each.homeTeam = this.lookup(each.homeTeam.leagueIdNumber)
            each.awayTeam = this.lookup(each.awayTeam.leagueIdNumber)
        }
        
    }

    // doSeason() {
    //     let weeksInSchedule = this.seasons[year].days.length
    //     let playEveryTeamXTimes = 1
    //     //for i in range(weeksInSchedule * playEveryTeamXTimes){
    //     for (let i = 0; i < weeksInSchedule * playEveryTeamXTimes; i++) {
    //         this.seasons[year].doWeek()
    //     }
    //     console.log("\nWeek " + ("" + this.seasons[year].currentWeek) + " Standings")
    //     //# get overall standings
    //     this.seasons[year].getStandings()
    //     //# get stats
    //     console.log(this.seasons[year].getFBRanking(3))
    //     console.log(this.seasons[year].getQBRanking(3))
    //     console.log(this.seasons[year].getWRRanking(3))
    //     console.log(this.seasons[year].getMVPRanking(3))
    //     //#input()
    //     //# start playoffs
    //     //# this.seasons[0].schedulePlayoffWeekOne()
    //     //# console.log(this.seasons[0].getPlayoffBracket())
    // }

    addNewSeason() {
        //for eachTeam in this.teams:
        for (let eachTeam of this.teams) {
            eachTeam.resetSeasonStats()
            //for eachPlayer in eachTeam.players:
            for (let eachPlayer of eachTeam.players) {
                eachPlayer.updateCareerStats()
                eachPlayer.resetSeasonStats()
            }
        }
        this.seasons.push(new Season(this.teams))
    }

    doPlayoffs(year, messageLevel = 0) {
        if(year == null) throw new Error("null year")
        this.seasons[year].doPlayoffs(messageLevel)
    }

    isSeasonOver(year) {
        if(year == null) throw new Error("null year")
        if (this.seasons[year].arePlayoffsOver()) {
            return True
        }
        return False
    }

    nextGameMessages(year,day) {
        if(year == null) throw new Error("null year")
        if(day == null) throw new Error("null day")
        return this.seasons[year].nextGameMessages(day);
    }
}