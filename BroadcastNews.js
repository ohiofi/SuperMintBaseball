class BroadcastNews {
    constructor() {
        this.firstName = Name.create_first_name(); // Player's name
        this.lastName = Name.create_last_name();
        this.place = PlotDevice.choice([
            "Badlands",
            "Bakersfield",
            "Banff",
            "Baton Rouge",
            "Bay Area",
            "Beantown",
            "Beaumont",
            "Bellevue",
            "Berkeley",
            "Big Bend",
            "Billings",
            "Biloxi",
            "Biscayne",
            "Black Canyon",
            "Boise",
            "Boulder",
            "Bridgeport",
            "Brockton",
            "Bronx",
            "Brownsville",
            "Bryce Canyon",
            "Buckeye",
            "Buffalo",
            "Butte",
            "Burbank",
        ]);
        this.secondWord = PlotDevice.choice([
            "Babble", "Babbler",
            "Ballpark",
            "Banter",
            "Barker",
            "Baseball",
            "Bell",
            "Bombast",
            "Boomer",
            "Broadcast","Broadcaster",
            "Bulletin",
            "Bugle",
            "Bugler",
            "Busybody",
            "Buzz",
            "Canon",
            "Canonical",
            "Mumbler",
            "Murmur",
            "Tattler",
            "Tattletale",
        ]);
        this.network = PlotDevice.choice(["News", "Network", "Media","Messanger"]);
        this.colorScheme = {
            light:"#efae8f", // 19, 75%, 75%
            mid:"#c24b3c", // 7, 53%, 50%
            dark:"#455019", //72, 52%, 21%
            
        };
        this.crest = new Crest(this.colorScheme,this.getNewsAbbreviation())
    }

    getFullName(){
        return `${this.crest.render(40)} <span style="background:'${this.colorScheme.light}';color:'${this.colorScheme.dark}';border-radius:'2px';"/>${this.place} ${this.secondWord} ${this.network}</span`;
    }

    getNewsAbbreviation(){
        return `${this.place[0]}${this.secondWord[0]}${this.network[0]}`;
    }

    getNewsName(){
        return `${this.place} ${this.secondWord} ${this.network}`;
    }

    getReporterName(){
        return `${this.firstName} ${this.lastName}`;
    }


    
}
