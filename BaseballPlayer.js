class BaseballPlayer {

    static debug() {
        let temp = new BaseballPlayer();
        temp.pitchScoreAverage = 7;
        temp.swingPercent = 7;
        temp.contactPercent = 7;
        temp.hitScoreAverage = 7;
        temp.hitScoreDeviation = 0;
        temp.pitchScoreDeviation = 0;
        temp.exhaustion = 0;
        return temp;
    }

    // Static method to compare two players based on their batting average
    static compareByBattingAverage(player1, player2) {
        if (player1.battingAverage > player2.battingAverage) {
            return `${player1.name} has a higher batting average than ${player2.name}.`;
        } else if (player1.battingAverage < player2.battingAverage) {
            return `${player2.name} has a higher batting average than ${player1.name}.`;
        } else {
            return `${player1.name} and ${player2.name} have the same batting average.`;
        }
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
        this.firstName = Name.create_first_name(); // Player's name
        this.lastName = Name.create_last_name();
        this.jerseyNumber = 0;
        this.fullname = this.firstName + ' "' + Name.create_nickname(this.firstName, this.lastName) + '" ' + this.lastName;
        this.teamName = "null"; // Team name
        this.position = "null"; // Position on the field
        this.age = Math.floor(rng.random() * 3) + 21; // Starting age is 21, 22, or 23
        this.hunger = 1;
        this.hungerRate = rng.random() * 0.1 + rng.random() * 0.1;
        this.attitude = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.healthiness = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.balance = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.pitchScoreAverage = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.pitchScoreDeviation = 1 + rng.random() + rng.random();
        this.swinginess = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.thwackiness = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.hitScoreAverage = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.hitScoreDeviation = 1 + rng.random() + rng.random();
        this.stats = new Stats(); // current season only
        this.lifetimeStats = new Stats();
    }



    // Method to display player information
    displayInfo() {
        return `Name: ${this.fullname}\nTeam: ${this.teamName}\nPosition: ${this.position}\nBatting Average: ${this.battingAverage.toFixed(3)}\nHome Runs: ${this.homeRuns}`;
    }
    getSummary() {
        return `${this.jerseyNumber} ${this.fullname} / ${this.position}\n`;
    }

    /* 
        Tiredness is a negative value that hurts performance.
        Factors:
        - age
        - time
        - mood
        - attitude
    */
    getTiredness(pitchNumber){
        let ageFactor = Math.abs(25 - this.age) * 0.1;
        let timeFactor = pitchNumber * (10 - this.healthiness) * 0.005;
        let moodFactor = Math.abs(Math.sin(pitchNumber * (10 - this.balance) * 0.5) * (10 - this.balance) * 0.5); // cycles from 0...(10 - this.balance) * 0.5
        let attitudeFactor = (10 - this.attitude) * 0.1;
        //return [moodFactor , ageFactor , timeFactor , attitudeFactor];
        return -1 * (moodFactor + ageFactor + timeFactor + attitudeFactor);
    }

    // Pitching methods

    /*
        getPitchScore

    */
    getPitchScore(pitchNumber) {
        let tiredness = this.getTiredness(pitchNumber);
        return BaseballPlayer.normalizeToTen(this.pitchScoreAverage + Math.sin(pitchNumber) * this.pitchScoreDeviation + this.hunger - tiredness);
    }

    // Batting methods

    /*
        isSwingingBat

    */
    isSwingingBat(pitchNumber, pitchScore) {
        let tiredness = this.getTiredness(pitchNumber);
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        // player's prefer to swing at better pitches aka higher pitch scores
        if (pitchScore >= (10 - this.swinginess) + tiredness || this.swinginess + this.hunger > rng.random() * 10 + tiredness) {
            return true;
        }
        return false;
    }

    isContactingBall(pitchNumber, pitchScore) {
        let tiredness = this.getTiredness(pitchNumber);
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        // the lower the pitch score, the easier to hit
        if (pitchScore <= this.thwackiness - tiredness || this.thwackiness + this.hunger > rng.random() * 10 + tiredness) {
            return true;
        }
        return false;
    }

    getHitScore(pitchNumber, pitchScore) {
        let tiredness = pitchNumber * this.exhaustion * 0.01;
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        return BaseballPlayer.normalizeToTen(this.hitScoreAverage * pitchScore * 0.1 + Math.sin(pitchNumber) * this.hitScoreDeviation + this.hunger - tiredness);
    }

    setHungerUp() {
        this.hunger += rng.random() * this.hungerRate + rng.random() * this.hungerRate
    }

    setHungerDown() {
        if (this.hunger > 0.01 && this.hungerRate < 1) {
            this.hunger *= this.hungerRate;
        }
        else if (this.hunger > 0.01 && this.hungerRate >= 1) {
            this.hunger *= 0.5;
        }
    }

    getPitchingAptitude(){
        return this.pitchScoreAverage / this.pitchScoreDeviation;
    }

    getHittingAptitude(){
        return (this.hitScoreAverage + this.thwackiness) / (this.hitScoreDeviation + Math.abs(5 - this.swinginess));
    }

    getEra(){
        if(this.stats.gamesPitched == 0){
            return -1;
        }
        return this.stats.runsAllowed / this.stats.gamesPitched;
    }

    getDefaultPosition(){
        return Name.playerPositions[Name.getCharSum(this.firstName+this.lastName) % Name.playerPositions.length]
    }
}