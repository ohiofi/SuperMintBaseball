class BaseballGameMessage{
    constructor(game,log){
        this.name = game.name;
        this.inning = game.getInningString();
        this.homeTeam = game.homeTeam.getName();
        this.homeId = game.homeTeam.leagueIdNumber;
        this.awayTeam = game.awayTeam.getName();
        this.awayId = game.awayTeam.leagueIdNumber;
        this.scoreObject = structuredClone(game.score);
        this.scoreString = game.getScore();
        this.baseIcons = game.getBaseIcons();
        this.count = structuredClone(game.count);
        this.log = log;
        this.boxScoreTable = game.getBoxScoreTable()
        this.done = game.done;
    }

    add(otherObject){
        if (typeof otherObject === 'string') {
            this.log += otherObject;
        }
        else if (BaseballGameMessage.prototype.isPrototypeOf(otherObject)) {
            this.log += otherObject.log;
        }
    }
}