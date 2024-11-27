/**
 * Represents player statistics in a game, including batting and pitching metrics.
 */
class Stats {

    /**
     * Restructures a plain JSON object into an instance of the `Stats` class.
     * @param {Object} jsonObject - The plain JSON object to convert.
     * @returns {Stats} The converted object with `Stats` prototype.
     */
    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, Stats.prototype);
        return jsonObject;
    }

    /**
   * Initializes a new instance of the `Stats` class with default values.
   */
    constructor() {

        // Win-loss record

        /** @type {number} Number of games played. */
        this.gamesPlayed = 0;

        /** @type {number} Number of games won. */
        this.wins = 0;

        /** @type {number} Number of games lost. */
        this.losses = 0;

        // Batting stats

        /** @type {number} Number of at-bats. */
        this.atBats = 0;

        /** @type {number} Number of hits. */
        this.hits = 0;

        /** @type {number} Number of singles hit. */
        this.singles = 0;

        /** @type {number} Number of doubles hit. */
        this.doubles = 0;

        /** @type {number} Number of triples hit. */
        this.triples = 0;

        /** @type {number} Number of home runs hit. */
        this.homeRuns = 0;

        /** @type {number} Number of runs scored. */
        this.runsScored = 0;

        /** @type {number} Number of sacrifice flies. */
        this.sacrificeFlies = 0;

        /** @type {number} Total number of bases earned. */
        this.totalBases = 0;

        /** @type {number} Number of bases on balls (walks) received. */
        this.basesOnBalls = 0;

        /** @type {number} Number of strikeouts as a batter. */
        this.strikeoutsAtBat = 0;

        /** @type {number} Number of stolen bases. */
        this.stolenBases = 0;

        /** @type {number} Number of times hit by a pitch. */
        this.hitByPitch = 0;

        // Pitching stats

        /** @type {number} Number of innings pitched. */
        this.inningsPitched = 0;

        /** @type {number} Number of strikeouts thrown by the pitcher. */
        this.strikeoutsThrown = 0;

        /** @type {number} Number of runs allowed by the pitcher. */
        this.runsAllowed = 0;

        /** @type {number} Number of home runs allowed by the pitcher. */
        this.homeRunsAllowed = 0;

        /** @type {number} Number of walks allowed by the pitcher. */
        this.walksAllowed = 0;
  
    }


    /**
   * Displays all statistics in a formatted string.
   * @returns {string} Formatted string of statistics.
   */
    displayStats() {
        return `Home Runs: ${this.homeRuns}\nAt Bats: ${this.atBats}\nHits: ${this.hits}\nStrikeouts: ${this.strikeouts}\nStolen Bases: ${this.stolenBases}\nBatting Average: ${this.getBattingAverage()}\nOn-Base Percentage: ${this.getOnBasePercentage()}`;
    }


    /**
   * Calculates the batting average.
   * @returns {string} Batting average as a fixed-point number or `-1` if at-bats are zero.
   */
    getBattingAverage() {
        return this.atBats > 0 ? (this.hits / this.atBats).toFixed(3) : -1;
    }

    /**
   * Calculates the on-base percentage (OBP).
   * @returns {string} OBP as a fixed-point number or `-1` if at-bats are zero.
   */
    getOnBasePercentage() {
        return this.atBats > 0 ? ((this.hits + 0.3 * this.stolenBases) / this.atBats).toFixed(3) : -1;
    }

    /**
   * Calculates the on-base plus slugging percentage (OPS).
   * @returns {string} OPS as a fixed-point number or `-1` if at-bats are zero.
   */
    getOnBasePlusSlugging() {
        return this.atBats > 0 ? ((this.atBats * (this.atBats + this.basesOnBalls + this.hitByPitch) + this.totalBases * (this.atBats + this.basesOnBalls + this.sacrificeFlies + this.hitByPitch)) / (this.atBats * (this.atBats + this.basesOnBalls + this.sacrificeFlies + this.hitByPitch))).toFixed(3) : -1;
    }

    /**
   * Calculates the earned run average (ERA) for the pitcher.
   * @returns {string} ERA as a fixed-point number or `999` if no innings pitched.
   */
    getEarnedRunAverage() {
        return this.inningsPitched > 0 ? ((this.runsAllowed / this.inningsPitched) * 9).toFixed(3) : 999;
    }


    /**
   * Converts a camelCase string key to Title Case format.
   * @param {string} key - The camelCase key to convert.
   * @returns {string} The formatted Title Case string.
   */
    stringFormatKey(key) {
        // Convert camelCase to Title Case
        return key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
    }

    /**
   * Generates an HTML table displaying the player's statistics.
   * @returns {string} HTML string representing the statistics table.
   */
    getStatsTable() {
        const rows = Object.entries(this)
            .map(
                ([key, value]) => `
      <tr>
        <td>${this.stringFormatKey(key)}</td>
        <td>${value}</td>
      </tr>`
            )
            .join("");

        return `
    <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
    }

}