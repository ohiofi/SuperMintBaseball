class BaseballPlayer {

    static debug() {
        let temp = new BaseballPlayer();
        temp.pitchScoreAverage = 7;
        temp.swingPercent = 7;
        temp.contactPercent = 7;
        temp.hitScoreAverage = 7;
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
        this.stats = new Stats();
        this.mood = rng.random() * 0.5 + rng.random() * 0.5
        this.hunger = 1;
        this.hungerRate = rng.random() * 0.1 + rng.random() * 0.1;
        this.exhaustion = rng.random() + rng.random();
        this.pitchScoreAverage = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.pitchScoreDeviation = 1 + rng.random() + rng.random();
        this.swinginess = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.thwackiness = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.hitScoreAverage = BaseballPlayer.normalizeToTen(rng.random() * 6 + rng.random() * 6);
        this.hitScoreDeviation = 1 + rng.random() + rng.random();
        this.currentSeasonStats = new Stats();
        this.lifetimeStats = new Stats();
    }



    // Method to display player information
    displayInfo() {
        return `Name: ${this.fullname}\nTeam: ${this.teamName}\nPosition: ${this.position}\nBatting Average: ${this.battingAverage.toFixed(3)}\nHome Runs: ${this.homeRuns}`;
    }
    getSummary() {
        return `${this.jerseyNumber} ${this.fullname} / ${this.position}\n`;
    }

    // Pitching methods

    getPitchScore(pitchNumber) {
        let tiredness = pitchNumber * this.exhaustion * 0.01;
        return BaseballPlayer.normalizeToTen(this.pitchScoreAverage + Math.sin(pitchNumber) * this.pitchScoreDeviation + this.hunger - tiredness);
    }

    // Batting methods

    isSwingingBat(pitchNumber, pitchScore) {
        let tiredness = pitchNumber * this.exhaustion * 0.01;
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        // player's prefer to swing at better pitches aka higher pitch scores
        if (pitchScore >= (10 - this.swinginess) + tiredness || this.swinginess + this.hunger > rng.random() * 10 + tiredness) {
            return true;
        }
        return false;
    }

    isContactingBall(pitchNumber, pitchScore) {
        let tiredness = pitchNumber * this.exhaustion * 0.01;
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
        if (this.hunger > 0.01) {
            this.hunger *= this.hungerRate
        }
    }

    getPitchingAptitude(){
        return this.pitchScoreAverage / this.pitchScoreDeviation;
    }

    getHittingAptitude(){
        return (this.hitScoreAverage + this.thwackiness) / (this.hitScoreDeviation + Math.abs(5 - this.swinginess));
    }
}