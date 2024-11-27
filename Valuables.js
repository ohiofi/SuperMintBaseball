class Valuables{

    

    constructor(objectLiteral){
        this.tickets = objectLiteral.tickets || 0; // 🎟️
        this.stocks = objectLiteral.stocks || 0; // 💹
        this.caps = objectLiteral.caps || 0; // 🧢
    }

    add(otherValuables){
        for (let key in otherValuables) {
            if (otherValuables.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                this[key] += otherValuables[key];
            }
        }
    }

    getEmoji(){
        let result = "";
        if(this.tickets > 0) result += "🎟️"
        if(this.stocks > 0) result += "💹"
        if(this.caps > 0) result += "🧢"
        return result
    }
}