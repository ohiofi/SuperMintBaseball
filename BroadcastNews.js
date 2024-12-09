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
            "Discourse",
            "Disseminator",
            "Distributer",
            "Mumbler",
            "Murmur",
            "Tattler",
            "Tattletale",
        ]);
        this.network = PlotDevice.choice(["News", "Network", "Media","Messanger"]);
        this.colorScheme = {
            light:"#e98e65",
            mid:"#455019",
            dark:"#c24b3c"
        };
        this.crest = new Crest(this.colorScheme,this.getNewsAbbreviation())
    }

    getFullName(){
        return `${this.crest.render()} ${this.place} ${this.secondWord} ${this.network}`;
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
