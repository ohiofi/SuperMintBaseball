const BaseballGameState = {
    PLAY_BALL: 0,
    TOP_OF_THE_INNING: 1,
    AWAY_PLAYER_STEPS_UP_TO_BAT: 2,
    AWAY_PLAYER_AT_BAT: 3,
    BOTTOM_OF_THE_INNING: 4,
    HOME_PLAYER_STEPS_UP_TO_BAT: 5,
    HOME_PLAYER_AT_BAT: 6,
    INNING_IS_NOW_AN_OUTING: 7,
    END_OF_GAME: 8
}

class BaseballGame {

    static useAOrAn(nextWord){
        if("aeiou".indexOf(nextWord.toLowerCase().charAt(0)) != -1){
            return "an";
        }else{
            return "a";
        }
    }

    static pitchDescriptions = [
        "mint condition++","excellent++", "outstanding++", "exceptional++", "superior++", "impressive++",
        "good+", "competent+", "strong+", "reliable+", "admirable+",
        "average", "satisfactory", "adequate", "mediocre", "passable",
        "meh-", "deficient-", "insufficient-", "inadequate-", "weak-",
        "flailing--", "unacceptable--", "unsatisfactory--", "lacking--", "inferior--", "wild--"
    ]

    constructor() {
        this.homeTeam = new BaseballTeam();
        this.awayTeam = new BaseballTeam();
        this.pitchNumber = 0;
        this.defenseTeam = this.homeTeam;
        this.offenseTeam = this.awayTeam;
        this.batter = null;
        this.pitcher = null;
        this.count = {
            balls: 0,
            strikes: 0,
            outs: 0
        }
        this.homeScore = 0;
        this.awayScore = 0;
        this.inning = 0;
        this.hasGameStarted = false;
        this.done = false;
        this.gameState = BaseballGameState.PLAY_BALL;
        this.onBase = [null, null, null];
    }

    next() {
        let result = "";
        if (this.done) {
            return null;
        }

        switch (this.gameState) {
            case BaseballGameState.PLAY_BALL:
                this.gameState++;
                this.hasGameStarted = true;
                result = "PLAY BALL!";
                break;
            case BaseballGameState.TOP_OF_THE_INNING:
                this.gameState++;
                result = this.setupNextInning(this.awayTeam,this.homeTeam)
                break;
            case BaseballGameState.AWAY_PLAYER_STEPS_UP_TO_BAT:
                this.gameState++;
                this.nextBatter();
                result = this.batter.getFullName() + " steps up to bat for the " + this.offenseTeam.getName() + this.getBaseStatus();
                break;
            case BaseballGameState.AWAY_PLAYER_AT_BAT:
                result = this.nextPitch();
                if (this.count.outs >= 3) {
                    this.gameState = BaseballGameState.BOTTOM_OF_THE_INNING;
                } else if (this.count.strikes >= 3) {
                    this.gameState = BaseballGameState.AWAY_PLAYER_STEPS_UP_TO_BAT;
                    this.threeStrikesCleanup();
                } else if (this.count.balls >= 4) {
                    this.gameState = BaseballGameState.AWAY_PLAYER_STEPS_UP_TO_BAT;
                    this.fourBallsCleanup();
                }
                // check if game is over early
                if (this.count.outs >= 3 && this.inning >= 9 && this.homeScore > this.awayScore) {
                    this.gameState = BaseballGameState.END_OF_GAME;
                    break;
                }
                break;
            case BaseballGameState.BOTTOM_OF_THE_INNING:
                this.gameState++;
                result = this.setupNextInning(this.homeTeam,this.awayTeam)
                break;
            case BaseballGameState.HOME_PLAYER_STEPS_UP_TO_BAT:
                this.gameState++;
                this.nextBatter();
                result = this.batter.getFullName() + " steps up to bat for the " + this.offenseTeam.getName() + this.getBaseStatus();
                break;
            case BaseballGameState.HOME_PLAYER_AT_BAT:
                result = this.nextPitch();
                if (this.count.strikes >= 3) {
                    this.gameState = BaseballGameState.HOME_PLAYER_STEPS_UP_TO_BAT;
                    this.threeStrikesCleanup();
                } else if (this.count.balls >= 4) {
                    this.gameState = BaseballGameState.HOME_PLAYER_STEPS_UP_TO_BAT;
                    this.fourBallsCleanup();
                }
                // check if game is over
                if (this.count.outs >= 3 && this.inning >= 9 && this.awayScore != this.homeScore) {
                    this.gameState = BaseballGameState.END_OF_GAME;
                } else if (this.count.outs >= 3) {
                    this.gameState = BaseballGameState.INNING_IS_NOW_AN_OUTING;
                } 
                
                break;
            case BaseballGameState.INNING_IS_NOW_AN_OUTING:
                this.gameState = BaseballGameState.TOP_OF_THE_INNING;
                result = "Inning "+this.inning+" is now an Outing."
                break
            case BaseballGameState.END_OF_GAME:
                this.done = true;
                result = this.getName();
        }
        //console.log(this)
        return result;
        //return result + "<br>gameState is "+this.gameState
    }

    setupNextInning(offense,defense){
        this.offenseTeam = offense;
        this.defenseTeam = defense;
        
        this.threeOutsCleanup()
        if(offense == this.awayTeam){
            this.inning++;
            return "Top of inning " + this.inning + ", " + this.offenseTeam.getName() + " batting.";
        }else{
            return "Bottom of inning " + this.inning + ", " + this.offenseTeam.getName() + " batting.";
        }
    }

    getName() {
        let result = "";
        if (!this.hasGameStarted) {
            return this.awayTeam.getName() + " @ " + this.homeTeam.getName();
        }
        if(this.inning != 0 && this.done == false){
            result = this.inning + "▲ ";
            if(this.offenseTeam == this.homeTeam){
                result = this.inning + "▼ "
            }
        } else if(this.done){
            result = "FINAL SCORE: "
        }
        return result + this.awayTeam.getName() + ": " + this.awayScore + " " + this.homeTeam.getName() + ": " + this.homeScore;
    }

    nextBatter() {
        this.batter = this.offenseTeam.getNextBatter();
    }

    getPitchDescription(pitchScore){
        return BaseballGame.pitchDescriptions[Math.floor((BaseballGame.pitchDescriptions.length - 1) - pitchScore * (BaseballGame.pitchDescriptions.length - 1) / 10)];
    }

    nextPitch() {
        this.pitchNumber++;
        let result = "";
        this.pitcher = this.defenseTeam.getPitcher();
        let pitchScore = this.pitcher.getPitchScore(this.pitchNumber);
        

        result += this.pitcher.getName() + " throws "+BaseballGame.useAOrAn(this.getPitchDescription(pitchScore))+" " + this.getPitchDescription(pitchScore) + " pitch"
        return this.atBat(pitchScore, result);
    }

    resetTheCount() {
        this.count = {
            balls: 0,
            strikes: 0,
            outs: 0
        }
    }

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

    fourBallsCleanup() {
        if (this.count.balls >= 4) {
            this.batter.setHungerDown()
            this.pitcher.setHungerUp()
            this.count.strikes = 0;
            this.count.balls = 0;
        }
    }

    incrementScore() {
        if (this.offenseTeam == this.awayTeam) {
            this.awayScore++;
        } else {
            this.homeScore++;
        }
    }

    advanceBaseRunners(numberToAdvance) {
        let result = "";
        if (numberToAdvance == null) {
            numberToAdvance = 0;
        }
        if (this.onBase[2] != null && numberToAdvance >= 1) { // THIRD BASE RUNNER SCORES
            console.log("THIRD BASE RUNNER SCORES")
            result += "<br>" + this.onBase[2].getName() + " SCORES!";
            this.incrementScore();
            this.onBase[2] = null;
        }
        if (this.onBase[1] != null && numberToAdvance >= 2) { // SECOND BASE RUNNER SCORES
            result += "<br>" + this.onBase[1].getName() + " SCORES!";
            console.log("2nd BASE RUNNER SCORES")
            this.incrementScore();
            this.onBase[1] = null;
        } else if (this.onBase[1] != null && numberToAdvance == 1) { // SECOND BASE RUNNER advances
            this.onBase[1 + numberToAdvance] = this.onBase[1];
            this.onBase[1] = null;
        }
        if (this.onBase[0] != null && numberToAdvance >= 3) { // FIRST BASE RUNNER SCORES
            result += "<br>" + this.onBase[0].getName() + " SCORES!";
            console.log("1st BASE RUNNER SCORES")
            this.incrementScore();
            this.onBase[0] = null;
        } else if (this.onBase[0] != null && numberToAdvance >= 1) { // FIRST BASE RUNNER advances
            this.onBase[0 + numberToAdvance] = this.onBase[0];
            this.onBase[0] = null;
        }
        return result;
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

    getBaseStatus() {
        let result = "<br>"
        if (this.onBase[2] != null) {
            result += "<sub class='baseIndicator leftBaseIndicator'>⬥</sub>"
        } else {
            result += "<sub class='baseIndicator leftBaseIndicator'>⬦</sub>"
        }
        if (this.onBase[1] != null) {
            result += "<sup class='baseIndicator centerBaseIndicator'>⬥</sup>"
        } else {
            result += "<sup class='baseIndicator centerBaseIndicator'>⬦</sup>"
        }
        if (this.onBase[0] != null) {
            result += "<sub class='baseIndicator rightBaseIndicator'>⬥</sub>"
        } else {
            result += "<sub class='baseIndicator rightBaseIndicator'>⬦</sub>"
        }
        result += "" + "B: " + this.count.balls +
            " / S: " + this.count.strikes +
            " / O: " + this.count.outs
        return result;
    }

    getOuts(){
        if(this.count.outs == 1){
            return this.count.outs+" OUT!"
        }else if(this.count.outs > 1){
            return this.count.outs+" OUTS!"
        }
        
    }


    atBat(pitchScore, result) {
        //console.log("[pitchScore = " + pitchScore + "]")
        if (this.batter.isSwingingBat(this.pitchNumber, pitchScore)) {
            // batter swings
            //console.log(this.batter.getName() + " swings")
            // result += "<br>" + this.batter.getName() + " swings";
            if (this.batter.isContactingBall(this.pitchNumber, pitchScore)) {
                // makes contact
                let hitScore = this.batter.getHitScore(this.pitchNumber, pitchScore);
                //console.log("[hitScore = " + hitScore + "]")
                // foul, out, hit a single, double, triple, home run
                // 50% of weak hits are foul
                if (hitScore <= 2.5 && rng.random() > 0.5) {
                    //console.log(this.batter.getName() + " hits a foul ball");
                    result += "<br>" + this.batter.getName() + " hits a foul ball"
                    if (this.count.strikes < 2) {
                        this.count.strikes++;
                    }
                } else {
                    //console.log(this.batter.getName() + " hits a fly ball")
                    
                    let defender = this.defenseTeam.getRandomPlayer();
                    //console.log("[defender = " + defender.getName() + "]")
                    let defenseScore = defender.getDefenseScore(this.pitchNumber);
                    //console.log("[defenseScore = " + defenseScore + "]")
                    if (defenseScore >= hitScore) {
                        result += "<br>" + this.batter.getName() + " hits a fly ball. "
                        //console.log(defender.getName() + " makes the catch. OUT!")
                        this.count.outs++;
                        result += defender.getName() + " makes the catch. " + this.getOuts()
                        defender.setHungerDown()
                        this.batter.setHungerUp()
                        
                        if (this.count.outs < 3) {
                            result += this.advanceBaseRunners(1)
                        }
                        //this.gameState--;
                        //return result;
                    } else if (hitScore / defenseScore <= 1.999) {
                        //console.log(this.batter.getName() + " hits a SINGLE")
                        result += "<br>" + this.batter.getName() + " hits a SINGLE"
                        result += this.advanceBaseRunners(1)
                        this.onBase[0] = this.batter;
                        this.pitcher.setHungerUp()
                        defender.setHungerUp()
                        this.batter.setHungerDown()
                    } else if (hitScore / defenseScore <= 2.999) {
                        result += "<br>" + this.batter.getName() + " hits a DOUBLE"
                        result += this.advanceBaseRunners(2)
                        this.onBase[1] = this.batter;
                        this.pitcher.setHungerUp()
                        defender.setHungerUp()
                        this.batter.setHungerDown()
                    } else if (hitScore / defenseScore <= 3.999) {
                        result += "<br>" + this.batter.getName() + " hits a TRIPLE"
                        result += this.advanceBaseRunners(3)
                        this.onBase[2] = this.batter;
                        this.pitcher.setHungerUp()
                        defender.setHungerUp()
                        this.batter.setHungerDown()
                    } else {
                        result += "<br>" + this.batter.getName() + " hits a HOME RUN!"
                        this.incrementScore();
                        result += this.advanceBaseRunners(4)
                        this.pitcher.setHungerUp()
                        defender.setHungerUp()
                        this.batter.setHungerDown()
                    }
                    this.gameState--;
                    this.count.balls = 0;
                    this.count.strikes = 0;
                }
            } else {
                // swinging but doesn't make contact
                //console.log("STRIKE Swinging");
                this.count.strikes++;
                result += "<br>" + this.batter.getName() + " gets a STRIKE swinging, " + this.count.balls + "-" + this.count.strikes

                if (this.count.strikes >= 3) {
                    this.count.outs++;
                    result += "<br>" + this.batter.getName() + " STRIKES OUT swinging. " + this.getOuts()
                    this.threeStrikesCleanup()
                    //return result;
                }
            }
        } else {
            //console.log(this.batter.getName() + " is looking")
            // result += "<br>" + this.batter.getName() + " is looking"
            // batter doesn't swing
            if (pitchScore > 5) {
                //console.log("STRIKE Looking");
                this.count.strikes++;
                result += "<br>" + this.batter.getName() + " gets a STRIKE looking, " + this.count.balls + "-" + this.count.strikes

                if (this.count.strikes >= 3) {
                    this.count.outs++
                    result += "<br>" + this.batter.getName() + " STRIKES OUT looking. " + this.getOuts()
                    this.threeStrikesCleanup()
                    //return result;
                }
            } else {
                //console.log("BALL Looking")
                this.count.balls++;
                result += "<br>" + this.batter.getName() + " is looking. BALL looking, " + this.count.balls + "-" + this.count.strikes
                this.pitcher.setHungerUp()
                if (this.count.balls >= 4) {
                    this.gameState--;
                    result += ". Take your base."
                    result += this.walkAndAdvanceBaseRunners()
                    this.fourBallsCleanup()
                }
            }
        }


        //console.log("Balls: " + this.count.balls +
        // " / Strikes: " + this.count.strikes +
        // " / Outs: " + this.count.outs + "");
        result += this.getBaseStatus();



        return result;
    }


}