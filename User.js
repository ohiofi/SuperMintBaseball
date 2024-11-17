class User{
    constructor(name){
        this.name = name;
        this.lives = 3;
        this.supplies = {
            "💰":50
        }
    }

    handleEvent(data){
        console.log("User sees this data: "+data);
    }
}