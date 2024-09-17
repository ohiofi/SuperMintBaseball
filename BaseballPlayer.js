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

    // Constructor to initialize player attributes
    constructor(name, team, position) {
        this.name = name; // Player's name
        this.team = team; // Team name
        this.position = position; // Position on the field
        this.stats = new Stats();
    }

    // Method to display player information
    displayInfo() {
        return `Name: ${this.name}\nTeam: ${this.team}\nPosition: ${this.position}\nBatting Average: ${this.battingAverage.toFixed(3)}\nHome Runs: ${this.homeRuns}`;
    }


}