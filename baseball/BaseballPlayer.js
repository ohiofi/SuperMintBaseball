class BaseballPlayer {

    static idCounter = 0;

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, BaseballPlayer.prototype);
        jsonObject.stats = Stats.restructure(jsonObject.stats);
        jsonObject.lifetimeStats = Stats.restructure(jsonObject.lifetimeStats);
        jsonObject.manager = StatsEventManager.restructure(jsonObject.manager);
        return jsonObject;
    }

    // Keeps values in the range (0...10) inclusive
    static normalizeToTen(data) {
        data = Math.abs(data) % 20;
        if (data <= 10) {
            return data;
        }
        return 10 - (data - 10);
    }

    // Constructor to initialize player attributes
    constructor() {
        this.leagueIdNumber = 0;
        this.playerIdNumber = BaseballPlayer.idCounter++;
        this.firstName = Name.create_first_name(); // Player's name
        this.lastName = Name.create_last_name();
        this.nickName = Name.create_nickName(this.firstName, this.lastName);
        this.jerseyNumber = 0;
        this.teamPlaceAbbreviation = null;
        this.teamPlaceName = null;
        this.teamMascot = null;
        this.teamLeagueIdNumber = 0;
        this.crest = null;
        this.colorScheme = null;
        this.position = "null"; // Position on the field
        this.tattoos = Name.webSafeEmojiCodes[Name.getCharSum(this.firstName) % Name.webSafeEmojiCodes.length] +
            Name.webSafeEmojiCodes[Name.getCharSum(this.lastName) % Name.webSafeEmojiCodes.length];
        this.profilePic = Name.profileEmojis[Name.getCharSum(this.firstName) % Name.profileEmojis.length]
        this.age = Math.floor(rng.random() * 11) + 20; // age range is [20...30] inclusive
        this.hunger = 1;
        this.hungerRate = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        // tiredness
        this.healthiness = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.balance = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        // pitching
        this.pitchStrength = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.pitchAccuracy = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        // batting
        this.swinginess = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.thwackiness = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.hittingPower = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);

        // defense
        this.reliability = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.teamwork = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.stats = new Stats(); // current season only
        this.lifetimeStats = new Stats();
        this.manager = new StatsEventManager();
    }

    addAtBats() {
        this.stats.atBats++;
        this.lifetimeStats.atBats++;
    }
    addBasesOnBalls() {
        this.stats.basesOnBalls++;
        this.lifetimeStats.basesOnBalls++;
    }
    addDoubles() {
        this.stats.doubles++;
        this.lifetimeStats.doubles++;
        this.addHits();
        this.addTotalBases(2)
    }
    addHits() {
        this.stats.hits++;
        this.lifetimeStats.hits++;
    }
    addHomeRuns() {
        this.stats.homeRuns++;
        this.lifetimeStats.homeRuns++;
        this.addHits();
        this.addTotalBases(4)
    }
    addHomeRunsAllowed(){
        this.stats.homeRunsAllowed++;
        this.lifetimeStats.homeRunsAllowed++;
    }
    addInningsPitched() {
        this.stats.inningsPitched++;
        this.lifetimeStats.inningsPitched++;
    }
    addLoss() {
        this.stats.losses++;
        this.stats.gamesPlayed++;
        this.lifetimeStats.losses++;
        this.lifetimeStats.gamesPlayed++;
    }
    addRunsAllowed(){
        this.stats.runsAllowed++;
        this.lifetimeStats.runsAllowed++;
    }
    addRunsScored() {
        this.stats.runsScored++;
        this.lifetimeStats.runsScored++;
      }
    addSacrificeFlies() {
        this.stats.sacrificeFlies++;
        this.lifetimeStats.sacrificeFlies++;
    }
    addSingles() {
        this.stats.singles++;
        this.lifetimeStats.singles++;
        this.addHits();
        this.addTotalBases(1)
    }
    addStrikeoutsAtBat() {
        this.stats.strikeoutsAtBat++;
        this.lifetimeStats.strikeoutsAtBat++;
    }
    addStrikeoutsThrown() {
        this.stats.strikeoutsThrown++;
        this.lifetimeStats.strikeoutsThrown++;
    }
    addTotalBases(num) {
        this.stats.totalBases += num;
        this.lifetimeStats.totalBases += num;
    }
    addTriples() {
        this.stats.triples++;
        this.lifetimeStats.triples++;
        this.addHits();
        this.addTotalBases(3)
    }
    addWalksAllowed() {
        this.stats.walksAllowed++;
        this.lifetimeStats.walksAllowed++;
    }
    addWin() {
        this.stats.wins++;
        this.stats.gamesPlayed++;
        this.lifetimeStats.wins++;
        this.lifetimeStats.gamesPlayed++;
    }



    equals(otherObject) {
        return this.playerIdNumber === otherObject.playerIdNumber &&
            this.firstName === otherObject.firstName &&
            this.lastName === otherObject.lastName &&
            this.jerseyNumber === otherObject.jerseyNumber
    }

    getName() {
        return this.teamPlaceAbbreviation + " " + this.lastName;
    }

    getNameWithLink() {
        return this.crest.render() + `&nbsp;<a href="#" 
        class="link link-light link-underline-opacity-25 link-underline-opacity-100-hover" 
        onclick="app.view.modal.update(${this.leagueIdNumber});" data-bs-target="#statsModal" data-bs-toggle="modal" >` +
        this.teamPlaceAbbreviation + " " + this.lastName + '</a>';
    }

    getFullName() {
        return this.crest.render(40) + " " + this.teamPlaceAbbreviation + " " + this.firstName + " " + this.lastName;
    }

    getSummary() {
        return `${this.fullname}, ${this.position}`;
    }

    /* 
        Tiredness is a value that hurts performance. Generally grows over the course of a game.
        Factors:
        - age
        - mood (which is basically 10 - balance)
        - healthiness
        - pitchNumber
    */
    getTiredness(pitchNumber) {
        let ageFactor = Math.abs(25 - this.age) * 0.5;
        let moodFactor = Math.abs(Math.sin(pitchNumber * (10 - this.balance) * 0.5) * (10 - this.balance) * 0.5); // cycles from 0...(10 - this.balance) * 0.5
        //return [moodFactor , ageFactor , timeFactor];
        //return -1 * (moodFactor + ageFactor + timeFactor + attitudeFactor);
        return BaseballPlayer.normalizeToTen((ageFactor + moodFactor) / this.healthiness * pitchNumber / 500 * 50);
    }

    // Pitching methods

    /*
        getPitchScore
        Factors:
        - pitchStrength
        - wobbliness (which is 10 - pitchAccuracy)
        - hunger
        - tiredness
    */
    getPitchScore(pitchNumber) {
        let tiredness = this.getTiredness(pitchNumber);
        let wobblinessFactor = Math.abs(Math.sin(pitchNumber * (10 - this.pitchAccuracy) * 0.5) * (10 - this.pitchAccuracy) * 0.5); // cycles from 0...(10 - this.pitchAccuracy) * 0.5
        return BaseballPlayer.normalizeToTen(this.pitchStrength - wobblinessFactor + this.hunger - tiredness * 2);
    }

    // Batting methods

    /*
        isSwingingBat
        Factors:
        - pitchScore
        - swinginess
        - hunger
        - tiredness
    */
    isSwingingBat(pitchNumber, pitchScore) {
        let tiredness = this.getTiredness(pitchNumber);
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        // players prefer to swing at better pitches aka higher pitch scores
        if (pitchScore + this.hunger >= (10 - this.swinginess) - tiredness && this.swinginess + this.hunger - tiredness > rng.random() * 5 + rng.random() * 5) {
            return true;
        }
        return false;
    }

    /*
        isContactingBall
        Factors:
        - pitchScore
        - thwackiness
        - hunger
        - tiredness
    */
    isContactingBall(pitchNumber, pitchScore) {
        let tiredness = this.getTiredness(pitchNumber);
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        // the lower the pitch score, the easier to hit
        if (pitchScore <= this.thwackiness + this.hunger - tiredness && this.thwackiness + this.hunger - tiredness > rng.random() * 6 + rng.random() * 6) {
            return true;
        }
        return false;
    }

    /*
        getHitScore
        Factors:
        - pitchScore
        - hittingPower
        - hunger
        - tiredness
    */
    getHitScore(pitchNumber, pitchScore) {
        let tiredness = this.getTiredness(pitchNumber);
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        // the easiest pitch to hit is 5 (out of 10)
        return BaseballPlayer.normalizeToTen(this.hittingPower + this.hunger - tiredness - Math.abs(pitchScore - 5));
    }
    /*
        getDefenseScore
        Factors:
        - reliability
        - teamwork
        - hunger
        - tiredness
    */
    getDefenseScore(pitchNumber) {
        let tiredness = this.getTiredness(pitchNumber);
        return BaseballPlayer.normalizeToTen((this.reliability + this.teamwork) / 2 + this.hunger - tiredness);
    }

    setHungerUp() {
        this.hunger += rng.random() * this.hungerRate * 0.1 + rng.random() * this.hungerRate * 0.1
    }

    setHungerDown() {
        if (this.hunger > 0.01) {
            this.hunger *= 0.5;
        }
        else {
            this.hunger = 0.01;
        }
    }


    getStatsTable() {
        return `
            <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
                    <tr>
                        <th colspan="2" class="text-center">Player Details</th>
                    </tr>
                    <tr><td>Team</td><td>
                    ${this.crest.render(40)} <a href="#" onclick="app.view.modal.update(${this.teamLeagueIdNumber})" class="link text-light link-offset-2 link-light link-underline-opacity-25 link-underline-opacity-100-hover">
                         ${this.teamPlaceAbbreviation} ${this.teamPlaceName} ${this.teamMascot}
                    </a>
                    </td></tr>
                    <tr><td>Player ID</td><td>${this.playerIdNumber}</td></tr>
                    <tr><td>Full Name</td><td>${this.firstName} "${this.nickName}" ${this.lastName}</td></tr>
                    <tr><td>Jersey Number</td><td>${this.jerseyNumber}</td></tr>
                    <tr><td>Position</td><td>${this.position}</td></tr>
                    <tr><td>Tattoos</td><td>${this.tattoos}</td></tr>
                    <tr><td>Age</td><td>${this.age}</td></tr>
            </table>

            <details>
                <summary>Stats</summary>
                ${this.stats.getStatsTable()}
            </details>
            
            <details>
            <summary>Attributes</summary>
            <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
                <tr><td>Hunger</td><td>${this.hunger.toFixed(1)}</td></tr>
                <tr><td>Hunger Rate</td><td>${this.hungerRate.toFixed(1)}</td></tr>
                <tr><td>Healthiness</td><td>${this.healthiness.toFixed(1)}</td></tr>
                <tr><td>Balance</td><td>${this.balance.toFixed(1)}</td></tr>
                <tr>
                    <th colspan="2" class="text-center">Pitching Attributes</th>
                </tr>
                <tr><td>Pitch Strength</td><td>${this.pitchStrength.toFixed(1)}</td></tr>
                <tr><td>Pitch Accuracy</td><td>${this.pitchAccuracy.toFixed(1)}</td></tr>
                <tr><td>Pitching Aptitude</td><td>${this.getPitchingAptitude().toFixed(1)}</td></tr>
                <tr>
                    <th colspan="2" class="text-center">Batting Attributes</th>
                </tr>
                <tr><td>Swinginess</td><td>${this.swinginess.toFixed(1)}</td></tr>
                <tr><td>Thwackiness</td><td>${this.thwackiness.toFixed(1)}</td></tr>
                <tr><td>Hitting Power</td><td>${this.hittingPower.toFixed(1)}</td></tr>
                <tr><td>Batting Aptitude</td><td>${this.getBattingAptitude().toFixed(1)}</td></tr>
                <tr>
                    <th colspan="2" class="text-center">Defense Attributes</th>
                </tr>
                <tr><td>Reliability</td><td>${this.reliability.toFixed(1)}</td></tr>
                <tr><td>Teamwork</td><td>${this.teamwork.toFixed(1)}</td></tr>
                <tr><td>Defense Aptitude</td><td>${this.getDefenseAptitude().toFixed(1)}</td></tr>
                
            </table>
            </details>
            
            <details>
                <summary>Lifetime</summary>
                ${this.lifetimeStats.getStatsTable()}
            </details>
                `.trim();
    }


    getDefenseAptitude() {
        return (this.reliability + this.teamwork) / 2;
    }

    getPitchingAptitude() {
        return (this.pitchAccuracy + this.pitchStrength + this.hungerRate) / 3;
    }

    getBattingAptitude() {
        return (this.swinginess + this.thwackiness + this.hittingPower) / 3;
    }

    getOverallAptitude() {
        return (this.getDefenseAptitude() + this.getPitchingAptitude() + this.getBattingAptitude()) / 3;
    }

    getEra() {
        if (this.stats.gamesPitched == 0) {
            return -1;
        }
        return this.stats.runsAllowed / this.stats.gamesPitched;
    }

    getDefaultPosition() {
        return Name.playerPositions[Name.getCharSum(this.firstName + this.lastName) % Name.playerPositions.length]
    }
}