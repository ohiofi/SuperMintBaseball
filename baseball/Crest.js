class Crest {
    static crestCounter = 0
    constructor(colorScheme, teamPlaceAbbreviation) {
        this.colorScheme = colorScheme;
        this.teamPlaceAbbreviation = teamPlaceAbbreviation;
        // this.gradientId = `gradient-${rng.random().toString(36).substring(2, 9)}`; // Unique ID for the gradient
        this.fontColor = rng.random() < 0.5 ? "black" : "white"; // Randomly set text color
        this.shape = this.generateShape();
        this.fontStyle = null;
        switch(Math.floor(rng.random()*3)){
            case 0:
                this.fontStyle = "serif";
                break
            case 1:
                this.fontStyle = "sans-serif";
                break
            case 2:
                this.fontStyle = "monospace";
        }
        this.shadowColor = this.fontColor === "black" ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)";
        this.gradientDirection = null;
        switch(Math.floor(rng.random()*4)){
            case 0:
                this.gradientDirection = { x1: "0%", y1: "0%", x2: "0%", y2: "100%" }; // Vertical
                break;
            case 1:
                this.gradientDirection = { x1: "0%", y1: "0%", x2: "100%", y2: "0%" }; // Horizontal
                break;
            case 2:
                this.gradientDirection = { x1: "0%", y1: "0%", x2: "100%", y2: "100%" }; // Diagonal NW to SE
                break;
            case 3:
                this.gradientDirection = { x1: "0%", y1: "100%", x2: "100%", y2: "0%" } // Diagonal SW to NE
        }
        this.size = 40
        this.gradient = this.generateStripes()
        this.root = `<defs>
            ${this.gradient}
        </defs>
        <polygon 
            points="${this.shape}" 
            fill="url(#${Crest.crestCounter++})" 
            stroke="black"
            stroke-width="3"
        />
        <style>

        </style>
        <text x="50%" y="74%" font-family="${this.fontStyle}" font-weight="bold" text-anchor="middle" fill="${this.colorScheme.light}" 
            font-size="65px" 
            style="-webkit-text-stroke: 1px ${this.shadowColor}; text-shadow: 1px 1px 0px ${this.shadowColor}, -1px -1px 0px ${this.shadowColor}, -1px 1px 0px ${this.shadowColor}, 1px -1px 0px ${this.shadowColor};"
>
            ${this.teamPlaceAbbreviation[0]}
        </text>`
        
        
        
    }

    generateStripes() {
        const randStripes = Math.floor(rng.random() * 5);
        switch(randStripes){
            case 0: // 2 stripes
                return `<linearGradient id="${Crest.crestCounter}" x1="${this.gradientDirection.x1}" y1="${this.gradientDirection.y1}" x2="${this.gradientDirection.x2}" y2="${this.gradientDirection.y2}" gradientUnits="userSpaceOnUse">
                <stop offset="50%" stop-color="${this.colorScheme.mid}" />
                <stop offset="50%" stop-color="${this.colorScheme.dark}" />
                </linearGradient>`
            case 1: // 3 stripes
                    return `<linearGradient id="${Crest.crestCounter}" x1="${this.gradientDirection.x1}" y1="${this.gradientDirection.y1}" x2="${this.gradientDirection.x2}" y2="${this.gradientDirection.y2}" gradientUnits="userSpaceOnUse">
                    <stop offset="42%" stop-color="${this.colorScheme.mid}" />
                    <stop offset="42%" stop-color="${this.colorScheme.dark}" />
                    <stop offset="58%" stop-color="${this.colorScheme.dark}" />
                    <stop offset="58%" stop-color="${this.colorScheme.light}" />
                    </linearGradient>`
            case 2: // 5 stripes
                    return `<linearGradient id="${Crest.crestCounter}" x1="${this.gradientDirection.x1}" y1="${this.gradientDirection.y1}" x2="${this.gradientDirection.x2}" y2="${this.gradientDirection.y2}" gradientUnits="userSpaceOnUse">
                    <stop offset="26%" stop-color="${this.colorScheme.dark}" />
                    <stop offset="26%" stop-color="${this.colorScheme.mid}" />
                    <stop offset="42%" stop-color="${this.colorScheme.mid}" />
                    <stop offset="42%" stop-color="${this.colorScheme.light}" />
                    <stop offset="58%" stop-color="${this.colorScheme.light}" />
                    <stop offset="58%" stop-color="${this.colorScheme.mid}" />
                    <stop offset="74%" stop-color="${this.colorScheme.mid}" />
                    <stop offset="74%" stop-color="${this.colorScheme.dark}" />
                    </linearGradient>`
            case 3:
                return `<radialGradient id="${Crest.crestCounter}" x1="${this.gradientDirection.x1}" y1="${this.gradientDirection.y1}" x2="${this.gradientDirection.x2}" y2="${this.gradientDirection.y2}" gradientUnits="userSpaceOnUse">
                <stop offset="55%" stop-color="${this.colorScheme.dark}" />
                <stop offset="55%" stop-color="${this.colorScheme.light}" />
                <stop offset="66%" stop-color="${this.colorScheme.light}" />
                <stop offset="66%" stop-color="${this.colorScheme.mid}" />
                </radialGradient>`
            case 4:
                return `<radialGradient id="${Crest.crestCounter}" x1="${this.gradientDirection.x1}" y1="${this.gradientDirection.y1}" x2="${this.gradientDirection.x2}" y2="${this.gradientDirection.y2}" gradientUnits="userSpaceOnUse">
                <stop offset="66%" stop-color="${this.colorScheme.dark}" />
                <stop offset="66%" stop-color="${this.colorScheme.mid}" />
                </radialGradient>`
        }
        
    }

    generateShape() {
        const randShape = Math.floor(rng.random() * 27);
        switch (randShape) {
            case 0:
                // Hexagon
                return "50,5 87,25 87,75 50,95 13,75 13,25";
            case 1:
                // Pentagon
                return "50,5 95,35 77,90 50,80 23,90 5,35"
            case 2:
                // Inverted Pentagon
                return "25,5 50,20 75,5 95,50 50,95 5,50";
            case 3:
                // Bottom Heavy Triangle
                return "50,5 95,85 50,75 5,85";
            case 4:
                // Top Heavy Triangle
                return "5,15 50,25 95,15 50,95";
            case 5:
                // Pennant (Ohio flag shape)
                return "2,15 98,35 85,50, 98,65 2,85";
            case 6:
                // Bottom Heavy Trapezoid
                return "20,5 80,5 95,95 50,80 5,95";
            case 7:
                // Top Heavy Trapezoid
                return "5,5 95,5 80,95 50,80 20,95";
            case 8:
                // Diamond
                return "50,5 95,50 50,95 5,50";
            case 9:
                // Square
                return "5,5 95,5 95,95 5,95";
            case 10:
                // Circle (approximated with a polygon)
                //return "50,5 68,10 83,27 90,50 83,73 68,90 50,95 32,90 17,73 10,50 17,27 32,10";
                return "95.0,50.0 93.5,61.6 89.0,72.5 81.8,81.8 72.5,89.0 61.6,93.5 50.0,95.0 38.4,93.5 27.5,89.0 18.2,81.8 11.0,72.5 6.5,61.6 5.0,50.0 6.5,38.4 11.0,27.5 18.2,18.2 27.5,11.0 38.4,6.5 50.0,5.0 61.6,6.5 72.5,11.0 81.8,18.2 89.0,27.5 93.5,38.4"
            case 11:
                // Star
                //return "50,5 60,40 95,40 65,60 75,95 50,75 25,95 35,60 5,40 40,40";
                //return "50,-17.5 65,35 117.5,35 72.5,65 87.5,117.5 50,87.5 12.5,117.5 27.5,65 -17.5,35 35,35"
                return "50.0,81.0 37.0,89.9 21.8,88.8 16.0,74.7 20.5,59.6 8.0,50.0 4.3,35.2 16.0,25.3 31.8,24.9 37.0,10.1 50.0,2.0 63.0,10.1 68.2,24.9 84.0,25.3 95.7,35.2 92.0,50.0 79.5,59.6 84.0,74.7 78.2,88.8 63.0,89.9"
            case 12:
                // Cross
                return "30,5 70,5 70,30 95,30 95,70 70,70 70,95 30,95 30,70 5,70 5,30 30,30";
            case 13:
                // Tall Octagon
                return "30,5 70,5 90,30 90,70 70,95 30,95 10,70 10,30";
            case 14:
                // Vertical Ellipse (approximated with a polygon)
                return "50,5 40,8 30,20 13,50 30,80 40,92 50,95 60,92 70,80 87,50 70,20 60,8";
            case 15:
                // Horizontal Ellipse (approximated with a polygon)
                return "5,50 8,40 20,30 50,13 80,30 92,40 95,50 92,60 80,70 50,87 20,70 8,60";
            case 16:
                // Inverted Pentagon
                return "20,5 50,15 80,5 75,85 50,95 20,85";
            case 17:
                // home plate
                return "10,15 90,15 90,58 50,97 10,58"
            case 18:
                // babbet
                return "8,20 20,20 20,8 80,8 80,20 92,20 92,80 80,80 80,92 20,92 20,80 8,80"
            case 19:
                // right chevron
                return "75,15 95,50 75,85 15,85 35,50 15,15"
            case 20:
                // right tilted diamond
                return "25,25 97,3 75,75 3,97"
            case 21:
                // left tilted diamond
                return "75,25 3,3 25,75 97,97"
            case 22:
                // bowtie
                return "50,33 97,3 97,97 50,66 3,97 3,3"
            case 23:
                // badge
                return "50,3 66,15 82,3 98,15 82,75 50,97 18,75 2,15 18,3 34,15 "
            case 24:
                // shield
                return "95.0,50.0 93.5,61.6 89.0,72.5 81.8,81.8 72.5,89.0 61.6,93.5 50.0,95.0 38.4,93.5 27.5,89.0 18.2,81.8 11.0,72.5 6.5,61.6 5.0,50.0 5,3 95,3 95,50"
            case 25:
                // 3 point tulip
                return "95.0,50.0 93.5,61.6 89.0,72.5 81.8,81.8 72.5,89.0 61.6,93.5 50.0,95.0 38.4,93.5 27.5,89.0 18.2,81.8 11.0,72.5 6.5,61.6 5.0,50.0 5,3 27.5,13 50,3 72.5,13 95,3 95,50"
            case 26:
                // 4 point tulip
                return "95.0,50.0 93.5,61.6 89.0,72.5 81.8,81.8 72.5,89.0 61.6,93.5 50.0,95.0 38.4,93.5 27.5,89.0 18.2,81.8 11.0,72.5 6.5,61.6 5.0,50.0 5,3 20,13 35,3 50,13 65,3 80,13 95,3 95,50"
            case 27:
                // 
        }
    }

    render(size = 30) {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            ${this.root}
        </svg>
    `;
    }
}
