class BaseballGameMessage{
    constructor(name,text){
        this.name = name;
        this.text = text;
    }

    add(otherObject){
        if (typeof otherObject === 'string') {
            this.text += otherObject;
        }
        else if (BaseballGameMessage.prototype.isPrototypeOf(otherObject)) {
            this.text += otherObject.text;
        }
    }
}