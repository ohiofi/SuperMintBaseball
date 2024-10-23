class BaseballGame {

    static pitchDescriptions = ["~w~i~l~d~","bad","meh","nice","Cool","Hot","GREAT","MINT CONDITION"];
    
    constructor() {
        console.log("yo")
        this.homeTeam = new BaseballTeam();
        this.awayTeam = new BaseballTeam();
        this.pitchNumber = 0;
        this.defenseTeam = this.homeTeam;
        this.offenseTeam = this.awayTeam;
        this.batter = null;
        this.pitcher = null;
        console.log(this.awayTeam.getName() + " @ " + this.homeTeam.getName())
        console.log(Name.generateAd())
        this.nextBatter();
        this.count = {
            balls:0,
            strikes:0,
            outs:0
        }

    }

    

    nextBatter() {
        this.batter = this.offenseTeam.getNextBatter();
        console.log(this.batter.getName() + " is up to bat")
    }

    nextPitch() {
        this.pitchNumber++;
        this.atBat();
    }

    resetTheCount(){
        this.count = {
            balls:0,
            strikes:0,
            outs:0
        }
    }


    atBat() {
        this.pitcher = this.defenseTeam.getPitcher();
        let pitchScore = this.pitcher.getPitchScore(this.pitchNumber);
        let pitchDescription = BaseballGame.pitchDescriptions[Math.floor(pitchScore*BaseballGame.pitchDescriptions.length/10)];
        
        
        console.log(this.pitcher.getName() + " throws a " + pitchDescription + " pitch");
        console.log("[pitchScore = " + pitchScore + "]")
        if (this.batter.isSwingingBat(this.pitchNumber, pitchScore)) {
            // batter swings
            console.log(this.batter.getName() + " swings")
            if (this.batter.isContactingBall(this.pitchNumber, pitchScore)) {
                // makes contact
                let hitScore = this.batter.getHitScore(this.pitchNumber, pitchScore);
                console.log("[hitScore = " + hitScore + "]")
                // foul, out, hit a single, double, triple, home run
                // 50% of weak hits are foul
                if (hitScore <= 2.5 && rng.random() > 0.5) {
                    console.log(this.batter.getName() + " hits a foul ball");
                    if(this.count.strikes < 2){
                        this.count.strikes++;
                    }
                } else {
                    console.log(this.batter.getName() + " hits a fly ball")
                    let defender = this.defenseTeam.getRandomPlayer();
                    console.log("[defender = " + defender.getName() + "]")
                    let defenseScore = defender.getDefenseScore(this.pitchNumber);
                    console.log("[defenseScore = " + defenseScore + "]")
                    if (defenseScore >= hitScore) {
                        console.log(defender.getName() + " makes the catch. OUT!")
                        defender.setHungerDown()
                        this.batter.setHungerUp()
                        this.count.outs++;
                        this.count.balls = 0;
                        this.count.strikes = 0;
                        if(this.count.outs < 3){
                            this.nextBatter();
                        }
                        
                    } else if (hitScore / defenseScore <= 1) {
                        console.log(this.batter.getName() + " hits a SINGLE")
                    } else if (hitScore / defenseScore <= 2) {
                        console.log(this.batter.getName() + " hits a DOUBLE")
                    } else if (hitScore / defenseScore <= 3) {
                        console.log(this.batter.getName() + " hits a TRIPLE")
                    } else {
                        console.log(this.batter.getName() + " hits a HOME RUN!")
                    }
                }

            } else {
                // swinging but doesn't make contact
                console.log("STRIKE Swinging");
                this.count.strikes++;
            }
        } else {
            console.log(this.batter.getName() + " is looking")
            // batter doesn't swing
            if (pitchScore > 5) {
                console.log("STRIKE Looking");
                this.count.strikes++;
            } else {
                console.log("BALL Looking")
                this.count.balls++;
                if(this.count.balls >= 4){
                    this.batter.setHungerDown()
                    this.pitcher.setHungerUp()
                    this.count.balls = 0;
                    this.count.strikes = 0;
                    console.log(this.batter.getName() + " walks")
                    this.nextBatter();
                }
            }
        }
        console.log("Balls: " + this.count.balls +
         " / Strikes: " + this.count.strikes +
         " / Outs: " + this.count.outs + "");
        if(this.count.strikes >= 3){
            console.log(this.batter.getName() + " STRIKES OUT");
            this.batter.setHungerUp()
            this.pitcher.setHungerDown()
            this.count.outs++;
            this.count.strikes = 0;
            this.count.balls = 0;
            if(this.count.outs < 3){
                this.nextBatter();
            }
        }
        if(this.count.outs >= 3){
            let temp = this.defenseTeam
            this.defenseTeam = this.offenseTeam
            this.offenseTeam = temp
            this.resetTheCount();
            
            console.log("THREE OUTS");
            console.log(this.offenseTeam.getName() + " turn to bat")
            this.nextBatter();
        }
    }


}