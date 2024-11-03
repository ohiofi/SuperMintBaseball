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

    static pitchDescriptions = ["~w~i~l~d~", "bad", "meh", "nice", "Cool", "Hot", "GREAT", "MINT CONDITION"];

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
        this.isGameOver = false;
        this.gameState = BaseballGameState.PLAY_BALL;
        this.onBase = [null, null, null];
    }

    next() {
        let result = "";
        if (this.isGameOver) {
            return null;
        }

        switch (this.gameState) {
            case BaseballGameState.PLAY_BALL:
                this.gameState++;
                this.hasGameStarted = true;
                result = "PLAY BALL!";
                break;
            case BaseballGameState.TOP_OF_THE_INNING:
                this.offenseTeam = this.awayTeam;
                this.defenseTeam = this.homeTeam;
                this.inning++;
                this.threeOutsCleanup()
                this.gameState++;
                result = "Top of inning " + this.inning + ", " + this.offenseTeam.getName() + " batting.";
                break;
            case BaseballGameState.AWAY_PLAYER_STEPS_UP_TO_BAT:
                this.gameState++;
                this.nextBatter();
                result = this.batter.getFullName() + " steps up to bat for the " + this.offenseTeam.getName();
                break;
            case BaseballGameState.AWAY_PLAYER_AT_BAT:
                result = this.nextPitch();
                if (this.count.outs >= 3) {
                    this.gameState = BaseballGameState.BOTTOM_OF_THE_INNING;
                    // this.threeOutsCleanup();
                } else if (this.count.strikes >= 3) {
                    this.gameState = BaseballGameState.AWAY_PLAYER_STEPS_UP_TO_BAT;
                    this.threeStrikesCleanup();
                } else if (this.count.balls >= 4) {
                    this.gameState = BaseballGameState.AWAY_PLAYER_STEPS_UP_TO_BAT;
                    this.fourBallsCleanup();
                }
                break;
            case BaseballGameState.BOTTOM_OF_THE_INNING:
                this.offenseTeam = this.homeTeam;
                this.defenseTeam = this.awayTeam;
                this.pitcher = this.awayTeam.getPitcher();
                this.threeOutsCleanup()
                this.gameState++;
                result = "Bottom of inning " + this.inning + ", " + this.offenseTeam.getName() + " batting.";
                break;
            case BaseballGameState.HOME_PLAYER_STEPS_UP_TO_BAT:
                this.gameState++;
                this.nextBatter();
                result = this.batter.getFullName() + " steps up to bat for the " + this.offenseTeam.getName();
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
                this.isGameOver = true;
                result = this.getName();
        }
        //console.log(this)
        return result;
        //return result + "<br>gameState is "+this.gameState
    }



    getName() {
        if (!this.hasGameStarted) {
            return this.awayTeam.getName() + " @ " + this.homeTeam.getName();
        }
        let result = this.inning + "▲ ";
        if(this.offenseTeam == this.homeTeam){
            result = this.inning + "▼ "
        }
        
        return result + this.awayTeam.getName() + ": " + this.awayScore + " " + this.homeTeam.getName() + ": " + this.homeScore;
    }

    nextBatter() {
        this.batter = this.offenseTeam.getNextBatter();
    }

    nextPitch() {
        this.pitchNumber++;
        return this.atBat();
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


    atBat() {
        let result = "";
        this.pitcher = this.defenseTeam.getPitcher();
        let pitchScore = this.pitcher.getPitchScore(this.pitchNumber);
        let pitchDescription = BaseballGame.pitchDescriptions[Math.floor(pitchScore * BaseballGame.pitchDescriptions.length / 10)];


        //console.log(this.pitcher.getName() + " throws a " + pitchDescription + " pitch");
        result += this.pitcher.getName() + " throws a " + pitchDescription + " pitch"
        //console.log("[pitchScore = " + pitchScore + "]")
        if (this.batter.isSwingingBat(this.pitchNumber, pitchScore)) {
            // batter swings
            //console.log(this.batter.getName() + " swings")
            result += "<br>" + this.batter.getName() + " swings";
            if (this.batter.isContactingBall(this.pitchNumber, pitchScore)) {
                // makes contact
                let hitScore = this.batter.getHitScore(this.pitchNumber, pitchScore);
                //console.log("[hitScore = " + hitScore + "]")
                // foul, out, hit a single, double, triple, home run
                // 50% of weak hits are foul
                if (hitScore <= 2.5 && rng.random() > 0.5) {
                    //console.log(this.batter.getName() + " hits a foul ball");
                    result += " and hits a foul ball"
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
                        result += " and hits a fly ball"
                        //console.log(defender.getName() + " makes the catch. OUT!")
                        this.count.outs++;
                        result += "<br>" + defender.getName() + " makes the catch. " + this.getOuts()
                        defender.setHungerDown()
                        this.batter.setHungerUp()
                        
                        if (this.count.outs < 3) {
                            result += this.advanceBaseRunners(1)
                        }
                        this.gameState--;
                        return result;
                    } else if (hitScore / defenseScore <= 1.5) {
                        //console.log(this.batter.getName() + " hits a SINGLE")
                        result += " and hits a SINGLE"
                        result += this.advanceBaseRunners(1)
                        this.onBase[0] = this.batter;
                        this.pitcher.setHungerUp()
                        defender.setHungerUp()
                        this.batter.setHungerDown()
                    } else if (hitScore / defenseScore <= 2.5) {
                        result += " and hits a DOUBLE"
                        result += this.advanceBaseRunners(2)
                        this.onBase[1] = this.batter;
                        this.pitcher.setHungerUp()
                        defender.setHungerUp()
                        this.batter.setHungerDown()
                    } else if (hitScore / defenseScore <= 3.5) {
                        result += " and hits a TRIPLE"
                        result += this.advanceBaseRunners(3)
                        this.onBase[2] = this.batter;
                        this.pitcher.setHungerUp()
                        defender.setHungerUp()
                        this.batter.setHungerDown()
                    } else {
                        result += " and hits a HOME RUN!"
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
                result += "<br>" + "STRIKE Swinging, " + this.count.balls + "-" + this.count.strikes

                if (this.count.strikes >= 3) {
                    this.count.outs++;
                    result += "<br>" + this.batter.getName() + " STRIKES OUT Swinging. " + this.getOuts()
                    return result;
                }
            }
        } else {
            //console.log(this.batter.getName() + " is looking")
            result += "<br>" + this.batter.getName() + " is looking"
            // batter doesn't swing
            if (pitchScore > 5) {
                //console.log("STRIKE Looking");
                this.count.strikes++;
                result += "<br>" + "STRIKE Looking, " + this.count.balls + "-" + this.count.strikes

                if (this.count.strikes >= 3) {
                    this.count.outs++
                    result += "<br>" + this.batter.getName() + " STRIKES OUT Looking. " + this.getOuts()
                    return result;
                }
            } else {
                //console.log("BALL Looking")
                this.count.balls++;
                result += "<br>" + "BALL Looking, " + this.count.balls + "-" + this.count.strikes
                if (this.count.balls >= 4) {
                    result += ". Take your base."
                    result += this.walkAndAdvanceBaseRunners()
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