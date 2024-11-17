/*
BaseballGame is a finite state machine.
Using the Iterator Design Pattern because a game generates a series of 
  Strings that describe the actions taking place in the game.
Also using the State Behavioral Design Pattern so that control is driven by
  the seperate state classes.
https://en.wikipedia.org/wiki/State_pattern
*/
// const BGameState = {
//     PLAY_BALL: 0,
//     TOP_OF_THE_INNING: 1,
//     AWAY_PLAYER_STEPS_UP_TO_BAT: 2,
//     AWAY_PLAYER_AT_BAT: 3,
//     BOTTOM_OF_THE_INNING: 4,
//     HOME_PLAYER_STEPS_UP_TO_BAT: 5,
//     HOME_PLAYER_AT_BAT: 6,
//     INNING_IS_NOW_AN_OUTING: 7,
//     END_OF_GAME: 8
// }

class BaseballGame {
    #gameIdNumber;
    #homeTeam;
    #awayTeam;
    #pitchNumber;
    #defenseTeam;
    #offenseTeam;
    #batter;
    #pitcher;
    #count;
    #score;
    #inning;
    #hasStarted;
    #done;
    #gameState;
    #onBase;

    static idCounter = 0;

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, BaseballGame.prototype);
        jsonObject.homeTeam = BaseballTeam.restructure(jsonObject.homeTeam);
        jsonObject.awayTeam = BaseballTeam.restructure(jsonObject.awayTeam);
        jsonObject.defenseTeam = BaseballTeam.restructure(jsonObject.defenseTeam);
        jsonObject.offenseTeam = BaseballTeam.restructure(jsonObject.offenseTeam);
        if (jsonObject.batter != null) jsonObject.batter = BaseballPlayer.restructure(jsonObject.batter);
        jsonObject.pitcher = BaseballPlayer.restructure(jsonObject.pitcher);
        jsonObject.gameState = BaseballGameState.restructure(jsonObject.gameState);
        if (jsonObject.onBase[0] != null) jsonObject.onBase[0] = BaseballPlayer.restructure(jsonObject.onBase[0]);
        if (jsonObject.onBase[1] != null) jsonObject.onBase[1] = BaseballPlayer.restructure(jsonObject.onBase[1]);
        if (jsonObject.onBase[2] != null) jsonObject.onBase[2] = BaseballPlayer.restructure(jsonObject.onBase[2]);
        return jsonObject;
    }

    static useAOrAn(nextWord) {
        if ("aeiou".indexOf(nextWord.toLowerCase().charAt(0)) != -1) {
            return "an";
        } else {
            return "a";
        }
    }

    static pitchDescriptions = [
        "mint condition++", "excellent++", "outstanding++", "exceptional++", "superior++", "impressive++",
        "good+", "competent+", "strong+", "reliable+", "admirable+",
        "average", "satisfactory", "adequate", "mediocre", "passable",
        "meh-", "deficient-", "insufficient-", "inadequate-", "weak-",
        "flailing--", "unacceptable--", "unsatisfactory--", "lacking--", "inferior--", "wild--"
    ]

    constructor(awayTeamObject, homeTeamObject) {
        this.name = awayTeamObject.getNameWithLink() + " @ " + homeTeamObject.getNameWithLink();
        this.hasStarted = false;
        this.done = false;
        this.finalMessage = false;
        this.gameIdNumber = BaseballGame.idCounter++;
        this.homeTeam = homeTeamObject;
        this.awayTeam = awayTeamObject;
        this.pitchNumber = 0;
        this.defenseTeam = this.homeTeam;
        this.offenseTeam = this.awayTeam;
        this.batter = null;
        this.pitcher = this.homeTeam.getPitcher();
        this.count = {
            balls: 0,
            strikes: 0,
            outs: 0
        }
        this.score = {
            away: 0,
            home: 0
        }
        this.inning = 0;
        this.isTopOfInning = true;
        this.gameState = new PlayBall();
        this.onBase = [null, null, null];
        this.boxScore = {
            away:{
                name: this.awayTeam.getNameWithLink(),
                innings: [0],
                runs: 0, // Runs
                hits: 0, // Hits
                errors: 0  // Errors
            },
            home:{
                name: this.homeTeam.getNameWithLink(),
                innings: [],
                runs: 0, // Runs
                hits: 0, // Hits
                errors: 0  // Errors
            }
        }
    }

    advanceBaseRunners(numberToAdvance) {
        let result = "";
        if (numberToAdvance == null) {
            numberToAdvance = 0;
        }
        if (this.onBase[2] != null && numberToAdvance >= 1) { // THIRD BASE RUNNER SCORES
            result += "<br>" + this.onBase[2].getNameWithLink() + " SCORES!";
            this.pitcher.setHungerUp()
            this.incrementScore();
            this.onBase[2] = null;
            const myEvent = new CustomEvent('HomeRun', {
                detail: {
                    message: 'Hello from the custom event!'
                }
            });
            // Dispatch the event on an element (e.g., the document)
            document.dispatchEvent(myEvent);
        }
        if (this.onBase[1] != null && numberToAdvance >= 2) { // SECOND BASE RUNNER SCORES
            result += "<br>" + this.onBase[1].getNameWithLink() + " SCORES!";
            this.incrementScore();
            this.onBase[1] = null;
        } else if (this.onBase[1] != null && numberToAdvance == 1) { // SECOND BASE RUNNER advances
            this.onBase[1 + numberToAdvance] = this.onBase[1];
            this.onBase[1] = null;
        }
        if (this.onBase[0] != null && numberToAdvance >= 3) { // FIRST BASE RUNNER SCORES
            result += "<br>" + this.onBase[0].getNameWithLink() + " SCORES!";
            this.incrementScore();
            this.onBase[0] = null;
        } else if (this.onBase[0] != null && numberToAdvance >= 1) { // FIRST BASE RUNNER advances
            this.onBase[0 + numberToAdvance] = this.onBase[0];
            this.onBase[0] = null;
        }
        return result;
    }

    atBat(pitchScore) {
        let result = "";

        if (this.batter.isSwingingBat(this.pitchNumber, pitchScore)) {
            // batter swings
            if (this.batter.isContactingBall(this.pitchNumber, pitchScore)) {
                // makes contact
                let hitScore = this.batter.getHitScore(this.pitchNumber, pitchScore);
                // foul, out, hit a single, double, triple, home run
                result += this.flyBall(hitScore);
            } else {
                // swinging but doesn't make contact
                this.count.strikes++;
                result += "<br>" + this.batter.getNameWithLink() + " gets a STRIKE swinging, " + this.count.balls + "-" + this.count.strikes

                if (this.count.strikes >= 3) {
                    this.count.outs++;
                    result += " " + this.batter.getNameWithLink() + " STRIKES OUT swinging. " + this.getOutsString()
                    this.threeStrikesCleanup()
                    this.gameState.previousState(this);
                }
            }
        } else {
            // batter doesn't swing
            if (pitchScore > 5) {
                this.count.strikes++;
                result += "<br>" + this.batter.getNameWithLink() + " gets a STRIKE looking, " + this.count.balls + "-" + this.count.strikes

                if (this.count.strikes >= 3) {
                    this.count.outs++
                    result += " " + this.batter.getNameWithLink() + " STRIKES OUT looking. " + this.getOutsString()
                    this.threeStrikesCleanup()
                    this.gameState.previousState(this);
                }
            } else {
                this.count.balls++;
                result += "<br>" + this.batter.getNameWithLink() + " is looking. BALL looking, " + this.count.balls + "-" + this.count.strikes
                this.pitcher.setHungerUp()
                if (this.count.balls >= 4) {
                    this.gameState.previousState(this);
                    result += ". Take your base."
                    result += this.walkAndAdvanceBaseRunners()
                    this.fourBallsCleanup()
                }
            }
        }
        return result;
    }

    equals(otherObject) {
        return this.gameIdNumber === otherObject.gameIdNumber &&
            this.homeTeam.equals(otherObject.homeTeam) &&
            this.awayTeam.equals(otherObject.awayTeam) &&
            this.jerseyNumber === otherObject.jerseyNumber
    }

    flyBall(hitScore) {
        let result = "";
        // 50% of weak hits are foul
        if (hitScore <= 2.5 && rng.random() > 0.5) {
            result += "<br>" + this.batter.getNameWithLink() + " hits a foul ball"
            if (this.count.strikes < 2) {
                this.count.strikes++;
            }
        } else {

            let defender = this.defenseTeam.getRandomPlayer();
            let defenseScore = defender.getDefenseScore(this.pitchNumber);
            if (defenseScore >= hitScore) {
                result += "<br>" + this.batter.getNameWithLink() + " hits a fly ball. "
                this.count.outs++;
                result += defender.getNameWithLink() + " makes the catch. " + this.getOutsString()
                defender.setHungerDown()
                this.batter.setHungerUp()

                if (this.count.outs < 3) {
                    result += this.advanceBaseRunners(1)
                }
            } else if (hitScore / defenseScore <= 1.999) {
                result += "<br>" + this.batter.getNameWithLink() + " hits a SINGLE"
                result += this.advanceBaseRunners(1)
                this.onBase[0] = this.batter;
                this.pitcher.setHungerUp()
                defender.setHungerUp()
                this.batter.setHungerDown()
            } else if (hitScore / defenseScore <= 2.999) {
                result += "<br>" + this.batter.getNameWithLink() + " hits a DOUBLE"
                result += this.advanceBaseRunners(2)
                this.onBase[1] = this.batter;
                this.pitcher.setHungerUp()
                defender.setHungerUp()
                this.batter.setHungerDown()
            } else if (hitScore / defenseScore <= 3.999) {
                result += "<br>" + this.batter.getNameWithLink() + " hits a TRIPLE"
                result += this.advanceBaseRunners(3)
                this.onBase[2] = this.batter;
                this.pitcher.setHungerUp()
                defender.setHungerUp()
                this.batter.setHungerDown()
            } else {
                result += "<br>" + this.batter.getNameWithLink() + " hits a HOME RUN!"

                this.incrementScore();
                result += this.advanceBaseRunners(4)
                this.pitcher.setHungerUp()
                defender.setHungerUp()
                this.batter.setHungerDown()
            }
            this.gameState.previousState(this);
            this.count.balls = 0;
            this.count.strikes = 0;
        }

        return result;
    }

    fourBallsCleanup() {
        if (this.count.balls >= 4) {
            this.batter.setHungerDown()
            this.pitcher.setHungerUp()
            this.count.strikes = 0;
            this.count.balls = 0;
        }
    }

    getAwayTeamName() {
        return this.awayTeam.getName();
    }

    getBalls() {
        return this.count.balls;
    }

    getBaseIcons() {
        // let result = "<br>"
        let result = ""
        if (this.onBase[2] != null) {
            result += "<sub class='baseIcon leftBaseIcon'>⬥</sub>"
        } else {
            result += "<sub class='baseIcon leftBaseIcon'>⬦</sub>"
        }
        if (this.onBase[1] != null) {
            result += "<sup class='baseIcon centerbaseIcon'>⬥</sup>"
        } else {
            result += "<sup class='baseIcon centerbaseIcon'>⬦</sup>"
        }
        if (this.onBase[0] != null) {
            result += "<sub class='baseIcon rightBaseIcon'>⬥</sub>"
        } else {
            result += "<sub class='baseIcon rightBaseIcon'>⬦</sub>"
        }

        return result;
    }

    getBatterFullName() {
        return this.batter.getFullName();
    }

    getBatterName() {
        return this.batter.getName();
    }

    getBoxScoreTable() {
        const maxInnings = Math.max(
            this.boxScore.away.innings.length,
            this.boxScore.home.innings.length
        );
    
        const inningsHeaders = Array.from({ length: maxInnings }, (_, i) => `<th>${i + 1}</th>`).join("");
    
        const formatInnings = (innings, max) => 
            Array.from({ length: max }, (_, i) => `<td>${innings[i] ?? ""}</td>`).join("");
    
        return `
            <table class="table table-dark table-striped table-bordered text-center">
                <thead>
                    <tr>
                        <th>Team</th>
                        ${inningsHeaders}
                        <th>R</th>
                        <th>H</th>
                        <th>E</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-start">${this.boxScore.away.name}</td>
                        ${formatInnings(this.boxScore.away.innings, maxInnings)}
                        <td>${this.boxScore.away.runs}</td>
                        <td>${this.boxScore.away.hits}</td>
                        <td>${this.boxScore.away.errors}</td>
                    </tr>
                    <tr>
                        <td class="text-start">${this.boxScore.home.name}</td>
                        ${formatInnings(this.boxScore.home.innings, maxInnings)}
                        <td>${this.boxScore.home.runs}</td>
                        <td>${this.boxScore.home.hits}</td>
                        <td>${this.boxScore.home.errors}</td>
                    </tr>
                </tbody>
            </table>
        `.trim();
    }
    

    getCountString() {
        return "B: " + this.count.balls +
            "<br>S: " + this.count.strikes +
            "<br>O: " + this.count.outs
    }

    getHomeTeamName() {
        return this.homeTeam.getName();
    }

    getInning() {
        return this.inning;
    }
    getInningString() {
        let result = ""
        if (this.inning == 0){
            result = "🔜"
        }else if (this.inning != 0 && this.done == false) {
            result = this.inning + "▲ ";
            if (this.offenseTeam.equals(this.homeTeam)) {
                result = this.inning + "▼ "
            }
        }else if (this.inning != 0 && this.finalMessage) {
            result = "FINAL " + this.inning + "▲ ";
            if (this.offenseTeam.equals(this.homeTeam)) {
                result = "FINAL " + this.inning + "▼ "
            }
        }
        return result;
    }

    getLosingTeam() {

        if(this.score.home < this.score.away){
            return this.homeTeam;
        }
        if(this.score.home > this.score.away){
            return this.awayTeam;
        }
        return null;
    }

    getOuts() {
        return this.count.outs;
    }

    getOutsString() {
        if (this.count.outs == 1) {
            return this.count.outs + " OUT!"
        } else if (this.count.outs > 1) {
            return this.count.outs + " OUTS!"
        }
    }

    getPitchDescription(pitchScore) {
        return BaseballGame.pitchDescriptions[Math.floor((BaseballGame.pitchDescriptions.length - 1) - pitchScore * (BaseballGame.pitchDescriptions.length - 1) / 10)];
    }

    // getScore(){
    //     return {
    //         away:this.score.away, 
    //         home:this.score.home
    //     }
    // }
    getScore() {
        let result = "";
        // if (!this.hasStarted && hasBreaks) {
        //     return this.awayTeam.getName() + "<br>@<br>" + this.homeTeam.getName();
        // }
        if (!this.hasStarted) {
            return this.awayTeam.getNameWithLink() + " @ " + this.homeTeam.getNameWithLink();
        }
        result += this.getInningString()
        // if (hasBreaks) {
        //     return result + "<br>" + this.awayTeam.getName() + ": " + this.score.away + "<br>" + this.homeTeam.getName() + ": " + this.score.home;
        // }
        return result + this.awayTeam.getNameWithLink() + ": " + this.score.away + " " + this.homeTeam.getNameWithLink() + ": " + this.score.home;
    }

    getStrikes() {
        return this.count.strikes;
    }

    getWinningTeam() {
        
        if(this.score.home > this.score.away){
            return this.homeTeam;
        }
        if(this.score.home < this.score.away){
            return this.awayTeam;
        }
        return null;
    }

    hasNext() {
        return !this.done;
    }

    incrementInning() {
        this.inning++;
    }

    incrementScore() {
        if (this.offenseTeam.equals(this.awayTeam)) {
            this.score.away++;
        } else {
            this.score.home++;
        }
    }

    isGameOver() {
        return this.done;
    }

    next() {
        
        // const log = 

        return new BaseballGameMessage(this,this.gameState.handle(this))
    }

    nextBatter() {
        this.batter = this.offenseTeam.getNextBatter();
    }



    nextPitch() {
        this.pitchNumber++;
        let result = "";
        this.pitcher = this.defenseTeam.getPitcher();
        let pitchScore = this.pitcher.getPitchScore(this.pitchNumber);
        result += this.pitcher.getNameWithLink() + " throws ";
        result += BaseballGame.useAOrAn(this.getPitchDescription(pitchScore));
        result += " " + this.getPitchDescription(pitchScore) + " pitch"
        return result + this.atBat(pitchScore);
    }

    resetTheCount() {
        this.count = {
            balls: 0,
            strikes: 0,
            outs: 0
        }
    }

    setGameState(newState) {
        if (newState instanceof BaseballGameState && !this.done) {
            this.gameState = newState;
        } else {
            throw new Error("oof bad game state")
        }
    }

    setGameOver() {
        this.done = true;
    }

    setGameStarted() {
        this.hasStarted = true;
    }

    setInningTop(isTop){
        this.isTopOfInning = isTop === true;
    }

    setOffenseTeam(teamNameString) {
        // if ((typeof teamNameString === 'string' || teamNameString instanceof String) && [this.awayTeam.getName(), this.homeTeam.getName()].includes(teamNameString)) {

        //     if (teamNameString === this.homeTeam.getName()) {
        //         this.offenseTeam = this.homeTeam;
        //         this.defenseTeam = this.awayTeam;
        //     } else if (teamNameString === this.awayTeam.getName()) {
        //         this.offenseTeam = this.awayTeam;
        //         this.defenseTeam = this.homeTeam;
        //     }
        // }
        if (this.isTopOfInning) {
            this.offenseTeam = this.homeTeam;
            this.defenseTeam = this.awayTeam;
        } else {
            this.offenseTeam = this.awayTeam;
            this.defenseTeam = this.homeTeam;
        }
    }

    // setupNextInning(offense, defense) {
    //     this.offenseTeam = offense;
    //     this.defenseTeam = defense;

    //     this.threeOutsCleanup()
    //     if (offense == this.awayTeam) {
    //         this.inning++;
    //         return "Top of inning " + this.inning + ", " + this.offenseTeam.getName() + " batting.";
    //     } else {
    //         return "Bottom of inning " + this.inning + ", " + this.offenseTeam.getName() + " batting.";
    //     }
    // }

    threeOutsCleanup() {
        if (this.count.outs >= 3) {
            this.resetTheCount();
            this.onBase = [null, null, null];
        }
    }

    threeStrikesCleanup() {
        if (this.count.strikes >= 3) {
            this.batter.setHungerUp()
            this.pitcher.setHungerDown()
            this.count.strikes = 0;
            this.count.balls = 0;
            // if (this.count.outs < 3) {
            //     this.nextBatter();
            // }
        }
    }

    walkAndAdvanceBaseRunners() {
        let result = "";
        // find the first empty base or all base runners advance by 1
        if (this.onBase[0] == null) {
            this.onBase[0] = this.batter;
        } else if (this.onBase[1] == null) {
            this.onBase[1] = this.onBase[0];
            this.onBase[0] = this.batter;
        } else if (this.onBase[2] == null) {
            this.onBase[2] = this.onBase[1];
            this.onBase[1] = this.onBase[0];
            this.onBase[0] = this.batter;
        } else {
            result = this.advanceBaseRunners(1);
            this.onBase[0] = this.batter;
        }
        return result;
    }








}