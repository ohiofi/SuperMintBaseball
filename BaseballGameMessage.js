class BaseballGameMessage{
    constructor(game,log){
        this.name = game.name;
        this.inning = game.getInningString();
        this.homeTeam = game.homeTeam.getName();
        this.awayTeam = game.awayTeam.getName();
        this.score = game.score;
        this.baseIcons = game.getBaseIcons();
        this.count = game.count;
        this.log = log;
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