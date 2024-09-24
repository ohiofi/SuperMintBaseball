class BaseballPlayer {

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
        if(data <= 10){
            return data;
        }
        return 10 - (data - 10);
    }

    // Constructor to initialize player attributes
    constructor(name) {
        this.firstName = Name.create_first_name(); // Player's name
        this.lastName = Name.create_last_name();
        this.fullname = this.firstName + " " + Name.create_nickname(this.firstName, this.lastName) + " " + this.lastName;
        this.team = "null"; // Team name
        this.position = "null"; // Position on the field
        this.stats = new Stats();
        this.pitchScoreAverage = BaseballPlayer.normalizeToTen(Math.random()*6 + Math.random()*6);
        this.pitchScoreDeviation = 1 + Math.random() + Math.random();
        this.swingPercent = BaseballPlayer.normalizeToTen(Math.random()*6 + Math.random()*6) * 10;
        this.contactPercent = BaseballPlayer.normalizeToTen(Math.random()*6 + Math.random()*6) * 10;
        this.hitScoreAverage = BaseballPlayer.normalizeToTen(Math.random()*6 + Math.random()*6);
        this.hitScoreDeviation = 1 + Math.random() + Math.random();
        this.currentSeasonStats = new Stats();
        this.lifetimeStats = new Stats();
    }

    

    // Method to display player information
    displayInfo() {
        return `Name: ${this.name}\nTeam: ${this.team}\nPosition: ${this.position}\nBatting Average: ${this.battingAverage.toFixed(3)}\nHome Runs: ${this.homeRuns}`;
    }

    // Pitching methods

    getPitchScore(pitchNumber){
        let tiredness = pitchNumber * 0.01;
        return BaseballPlayer.normalizeToTen(this.pitchScoreAverage + Math.sin(pitchNumber) * this.pitchScoreDeviation - tiredness);
    }

    // Batting methods

    isSwingingBat(pitchNumber, pitchScore){
        let tiredness = pitchNumber * 0.01;
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        // player's prefer to swing at better pitches aka higher pitch scores
        if(pitchScore >= (100 - this.swingPercent)/10 + tiredness || this.swingPercent > Math.random()*100 + tiredness){
            return true;
        }
        return false;
    }

    isContactingBall(pitchNumber, pitchScore){
        let tiredness = pitchNumber * 0.01;
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        // the lower the pitch score, the easier to hit
        if(pitchScore <= this.contactPercent/10 - tiredness ||  this.contactPercent > Math.random()*100 + tiredness){
            return true;
        }
        return false;
    }

    getHitScore(pitchNumber, pitchScore){
        let tiredness = pitchNumber * 0.01;
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        return BaseballPlayer.normalizeToTen(this.hitScoreAverage * pitchScore * 0.1 + Math.sin(pitchNumber) * this.hitScoreDeviation - tiredness);
    }


}