// A Valuables object represents a set of counters. 
// Each User has 1 set of Valuables
// A TradingCard has 1 set of Valuables that it provides as a reward

class Valuables{


    constructor(objectLiteral){
        this.redMagic = objectLiteral.redMagic || 0; // 🔥🎟️
        this.greenMagic = objectLiteral.greenMagic || 0; // 🌵🪴🌿☘️💹
        this.blueMagic = objectLiteral.blueMagic || 0; // 💧💦🌊🧢
        this.money = objectLiteral.money || 0; // 🌕🌝💰
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
        if(this.redMagic > 0) result += "🔥"
        if(this.greenMagic > 0) result += "🌵"
        if(this.blueMagic > 0) result += "💧"
        return result
    }

    setMagicToZero(){
        this.redMagic = 0;
        this.greenMagic = 0;
        this.blueMagic = 0;
    }
}