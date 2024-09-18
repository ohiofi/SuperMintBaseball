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

    static normalizeToTen(data) {
        data = Math.abs(data) % 20;
        if(data <= 10){
            return data;
        }
        return data - (data - 10);
    }

    // Constructor to initialize player attributes
    constructor(name, team, position) {
        this.firstName = name; // Player's name
        this.lastName = name;
        this.fullname = this.firstName + this.lastName;
        this.team = team; // Team name
        this.position = position; // Position on the field
        this.stats = new Stats();
    }

    

    // Method to display player information
    displayInfo() {
        return `Name: ${this.name}\nTeam: ${this.team}\nPosition: ${this.position}\nBatting Average: ${this.battingAverage.toFixed(3)}\nHome Runs: ${this.homeRuns}`;
    }

    isSwingingBat(pitchNumber, pitchScore){
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        let pickiness = BaseballPlayer.normalizeToTen(this.firstName.charCodeAt(pitchNumber % this.firstName.length) + pitchNumber);
        if(pitchScore >= pickiness * 0.75){
            return true;
        }
        return false;
    }

    isHittingBall(pitchNumber, pitchScore){
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        let swingAccuracy = BaseballPlayer.normalizeToTen(this.lastName.charCodeAt(pitchNumber % this.lastName.length) + pitchNumber);
        if(swingAccuracy >= pitchScore){
            return true;
        }
        return false;
    }


}