class Crest {
    static crestCounter = 0
    constructor(colorScheme, teamPlaceAbbreviation) {
        //this.id = Crest.crestCounter++;
        this.colorScheme = colorScheme;
        this.teamPlaceAbbreviation = teamPlaceAbbreviation;
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
        this.shadowColor = null
        this.fontColor = null
        if (rng.random() < 0.5){
            this.fontColor = this.colorScheme.dark;
            this.shadowColor = "rgba(255,255,255,0.9)";
        } else {
            this.fontColor = this.colorScheme.light;
            this.shadowColor = "rgba(0,0,0,0.9)";
        }
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
        this.gradient = Math.floor(rng.random() * 9);
    
        
        
        
    }

    getStripes() {
        switch(this.gradient){
            case 0: // 2 stripes
                return `<linearGradient id="gradient${Crest.crestCounter}" x1="${this.gradientDirection.x1}" y1="${this.gradientDirection.y1}" x2="${this.gradientDirection.x2}" y2="${this.gradientDirection.y2}" gradientUnits="userSpaceOnUse">
                <stop offset="50%" stop-color="${this.colorScheme.mid}" />
                <stop offset="50%" stop-color="${this.colorScheme.dark}" />
                </linearGradient>`
            case 1: // 3 stripes
                    return `<linearGradient id="gradient${Crest.crestCounter}" x1="${this.gradientDirection.x1}" y1="${this.gradientDirection.y1}" x2="${this.gradientDirection.x2}" y2="${this.gradientDirection.y2}" gradientUnits="userSpaceOnUse">
                    <stop offset="42%" stop-color="${this.colorScheme.mid}" />
                    <stop offset="42%" stop-color="${this.colorScheme.dark}" />
                    <stop offset="58%" stop-color="${this.colorScheme.dark}" />
                    <stop offset="58%" stop-color="${this.colorScheme.light}" />
                    </linearGradient>`
            case 2: // 5 stripes
                    return `<linearGradient id="gradient${Crest.crestCounter}" x1="${this.gradientDirection.x1}" y1="${this.gradientDirection.y1}" x2="${this.gradientDirection.x2}" y2="${this.gradientDirection.y2}" gradientUnits="userSpaceOnUse">
                    <stop offset="26%" stop-color="${this.colorScheme.dark}" />
                    <stop offset="26%" stop-color="${this.colorScheme.mid}" />
                    <stop offset="42%" stop-color="${this.colorScheme.mid}" />
                    <stop offset="42%" stop-color="${this.colorScheme.light}" />
                    <stop offset="58%" stop-color="${this.colorScheme.light}" />
                    <stop offset="58%" stop-color="${this.colorScheme.mid}" />
                    <stop offset="74%" stop-color="${this.colorScheme.mid}" />
                    <stop offset="74%" stop-color="${this.colorScheme.dark}" />
                    </linearGradient>`
            case 3: // radiant 3 stripes center
                return `<radialGradient id="gradient${Crest.crestCounter}" x1="${this.gradientDirection.x1}" y1="${this.gradientDirection.y1}" x2="${this.gradientDirection.x2}" y2="${this.gradientDirection.y2}" gradientUnits="userSpaceOnUse">
                <stop offset="55%" stop-color="${this.colorScheme.dark}" />
                <stop offset="55%" stop-color="${this.colorScheme.light}" />
                <stop offset="66%" stop-color="${this.colorScheme.light}" />
                <stop offset="66%" stop-color="${this.colorScheme.mid}" />
                </radialGradient>`
            case 4: // radiant 2 stripes center
                return `<radialGradient id="gradient${Crest.crestCounter}" x1="${this.gradientDirection.x1}" y1="${this.gradientDirection.y1}" x2="${this.gradientDirection.x2}" y2="${this.gradientDirection.y2}" gradientUnits="userSpaceOnUse">
                <stop offset="66%" stop-color="${this.colorScheme.dark}" />
                <stop offset="66%" stop-color="${this.colorScheme.mid}" />
                </radialGradient>`
            case 5: // radiant 2 stripes bottom
                return `<radialGradient id="gradient${Crest.crestCounter}" cx="50%" cy="100%" r="100%" gradientUnits="userSpaceOnUse">
                <stop offset="50%" stop-color="${this.colorScheme.dark}" />
                <stop offset="50%" stop-color="${this.colorScheme.mid}" />
                </radialGradient>`
            case 6: // radiant 3 stripes bottom
                return `<radialGradient id="gradient${Crest.crestCounter}" cx="50%" cy="100%" r="100%" gradientUnits="userSpaceOnUse">
                <stop offset="45%" stop-color="${this.colorScheme.dark}" />
                <stop offset="45%" stop-color="${this.colorScheme.mid}" />
                <stop offset="75%" stop-color="${this.colorScheme.mid}" />
                <stop offset="75%" stop-color="${this.colorScheme.light}" />
                </radialGradient>`
            case 7: // radiant 2 stripes top
                return `<radialGradient id="gradient${Crest.crestCounter}" cx="50%" cy="0%" r="100%" gradientUnits="userSpaceOnUse">
                <stop offset="50%" stop-color="${this.colorScheme.dark}" />
                <stop offset="50%" stop-color="${this.colorScheme.mid}" />
                </radialGradient>`
            case 8: // radiant 3 stripes top
                return `<radialGradient id="gradient${Crest.crestCounter}" cx="50%" cy="0%" r="100%" gradientUnits="userSpaceOnUse">
                <stop offset="45%" stop-color="${this.colorScheme.dark}" />
                <stop offset="45%" stop-color="${this.colorScheme.mid}" />
                <stop offset="75%" stop-color="${this.colorScheme.mid}" />
                <stop offset="75%" stop-color="${this.colorScheme.light}" />
                </radialGradient>`
        }
        
    }

    generateShape() {
        const randShape = Math.floor(rng.random() * 37);
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
                // Meeple
                return "50.0,81.0 37.0,89.9 21.8,88.8 16.0,74.7 20.5,59.6 8.0,50.0 4.3,35.2 16.0,25.3 31.8,24.9 37.0,10.1 50.0,2.0 63.0,10.1 68.2,24.9 84.0,25.3 95.7,35.2 92.0,50.0 79.5,59.6 84.0,74.7 78.2,88.8 63.0,89.9"
            case 12:
                // Cross
                return "30,5 70,5 70,30 95,30 95,70 70,70 70,95 30,95 30,70 5,70 5,30 30,30";
            case 13:
                // Tall Octagon
                return "30,5 70,5 90,30 90,70 70,95 30,95 10,70 10,30";
            case 14:
                // Pinched Vertical Ellipse (approximated with a polygon)
                return "50,5 40,8 30,20 3,50 30,80 40,92 50,95 60,92 70,80 97,50 70,20 60,8";
            case 15:
                // Pinched Horizontal Ellipse (approximated with a polygon)
                return "5,50 8,40 20,30 50,3 80,30 92,40 95,50 92,60 80,70 50,97 20,70 8,60";
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
                // left titled star 
                return "80.0,50.0 86.4,76.5 59.3,78.5 36.1,92.8 25.7,67.6 5.0,50.0 25.7,32.4 36.1,7.2 59.3,21.5 86.4,23.5 "
            case 28:
                // right tilted star
                return "74.3,67.6 63.9,92.8 40.7,78.5 13.6,76.5 20.0,50.0 13.6,23.5 40.7,21.5 63.9,7.2 74.3,32.4 95.0,50.0 "
            case 29:
                // mls crest
                return "50,98 56.6,93.4 62.6,88.2 68.2,82.4 73.1,76.1 77.4,69.4 81.1,62.3 84.0,54.8 84.0,10.8 16.0,10.8 16.0,54.8 18.9,62.3 22.6,69.4 26.9,76.1 31.8,82.4 37.4,88.2 43.4,93.4 50.0,98.0 "
            case 30:
                // dallas style crest
                return "50,98 62.3,87.7 73.0,75.8 81.9,62.6 88.9,48.2 93.9,33.0 96.6,17.2 89.2,14.2 81.6,11.7 73.9,9.8 66.0,8.4 58.0,7.6 50.0,7.3 42.0,7.6 34.0,8.4 26.1,9.8 18.4,11.7 10.8,14.2 3.4,17.2 6.1,33.0 11.1,48.2 18.1,62.6 27.0,75.8 37.7,87.7 50.0,98.0 "
            case 31:
                // united style crest
                return "50,98 54.0,92.3 59.0,87.3 64.7,83.3 72.9,79.5 79.8,73.5 84.8,65.9 87.4,57.2 87.6,48.1 85.4,39.9 84.5,31.6 84.7,23.2 86.2,14.9 88.9,7.0 50.0,7.0 11.1,7.0 13.8,14.9 15.3,23.2 15.5,31.6 14.6,39.9 12.4,48.1 12.6,57.2 15.2,65.9 20.2,73.5 27.1,79.5 35.3,83.3 41.0,87.3 46.0,92.3 50.0,98.0 "
            case 32:
                // galaxy style crest
                return "50,98 60.7,89.0 70.1,78.6 77.9,67.0 84.1,54.4 88.4,41.1 90.8,27.3 83.3,24.3 76.1,20.7 69.1,16.7 62.4,12.2 56.0,7.2 50.0,1.8 50.0,1.8 44.0,7.2 37.6,12.2 30.9,16.7 23.9,20.7 16.7,24.3 9.2,27.3 11.6,41.1 15.9,54.4 22.1,67.0 29.9,78.6 39.3,89.0 50.0,98.0 "
            case 33:
                // raiders-esque
                return "50,98 61.9,88.0 72.3,76.6 81.1,63.8 88.1,49.9 93.1,35.3 96.1,20.1 97.1,4.6 91.9,8.1 86.2,10.7 80.1,12.2 73.9,12.7 67.7,12.1 61.7,10.4 56.0,7.7 51.0,4.0 50.0,4.0 49.0,4.0 44.0,7.7 38.3,10.4 32.3,12.1 26.1,12.7 19.9,12.2 13.8,10.7 8.1,8.1 2.9,4.6 3.9,20.1 6.9,35.3 11.9,49.9 18.9,63.8 27.7,76.6 38.1,88.0 50.0,98.0"
            case 34:
                // 6 pointed top crest
                return "50,98 55.8,91.1 62.7,85.3 70.5,80.8 77.7,78.2 83.9,73.7 88.6,67.7 91.4,60.6 92.2,53.0 90.7,44.1 90.3,35.1 91.3,26.2 93.5,17.4 96.8,9.1 93.5,11.5 89.5,12.8 85.4,12.8 81.5,11.5 78.1,9.1 74.7,11.5 70.8,12.8 66.7,12.8 62.7,11.5 59.4,9.1 56.0,11.5 52.1,12.8 47.9,12.8 44.0,11.5 40.6,9.1 37.3,11.5 33.3,12.8 29.2,12.8 25.2,11.5 21.9,9.1 18.5,11.5 14.6,12.8 10.4,12.8 6.5,11.5 3.1,9.1 6.5,17.4 8.7,26.2 9.6,35.1 9.3,44.1 7.8,53.0 8.6,60.6 11.4,67.7 16.1,73.7 22.3,78.2 29.5,80.8 37.3,85.3 44.2,91.1 50.0,98.0   "
            case 35:
                // 5 pointed top crest
                return "50,98 55.8,91.1 62.7,85.3 70.5,80.8 77.6,78.2 83.7,73.7 88.3,67.6 91.0,60.5 91.5,52.9 89.5,44.1 88.8,35.2 89.3,26.2 91.1,17.4 94.0,8.9 93.3,8.0 89.3,10.3 84.7,11.1 80.1,10.3 76.1,8.0 73.1,4.4 70.2,8.0 66.1,10.3 61.6,11.1 57.0,10.3 53.0,8.0 50.0,4.4 47.0,8.0 43.0,10.3 38.4,11.1 33.8,10.3 29.8,8.0 26.8,4.4 23.8,8.0 19.8,10.3 15.2,11.1 10.7,10.3 6.6,8.0 3.7,4.4 8.9,17.4 10.6,26.2 11.1,35.2 10.4,44.1 8.5,52.9 9.0,60.5 11.7,67.6 16.2,73.7 22.3,78.2 29.5,80.8 37.3,85.3 44.2,91.1 50.0,98.0 "
            case 36:
                // 4 pointed top crest
                return "50,98 56.3,95.0 63.0,92.9 69.9,91.5 77.9,91.0 85.0,87.4 90.1,81.2 92.5,73.6 91.1,60.8 90.8,48.0 91.5,35.3 93.1,22.6 95.8,10.1 97.2,5.3 93.2,10.1 87.7,13.3 81.5,14.3 75.3,13.3 69.8,10.1 65.7,5.3 61.7,10.1 56.2,13.3 50.0,14.3 43.8,13.3 38.3,10.1 34.3,5.3 30.2,10.1 24.7,13.3 18.5,14.3 12.3,13.3 6.8,10.1 2.8,5.3 4.2,10.1 6.7,22.6 8.3,35.3 8.8,48.1 8.4,60.9 6.9,73.6 9.2,81.3 14.3,87.5 21.4,91.2 29.4,91.8 36.2,93.2 42.9,95.4 49.2,98"
        }
    }

    render(size = 22) {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <defs>
                ${this.getStripes()}
            </defs>
            <polygon 
                points="${this.shape}" 
                fill="url(#gradient${Crest.crestCounter++})" 
                stroke="rgba(127,127,127,0.9)"
                stroke-width="3"
            />
            <style>

            </style>
            <text 
                x="50%" 
                y="53%" 
                font-family="${this.fontStyle}" 
                font-weight="bold" 
                text-anchor="middle" 
                dominant-baseline="middle"
                fill="${this.fontColor}" 
                
                font-size="${90/this.teamPlaceAbbreviation.length + 10}px" 
                style="-webkit-text-stroke: 1px ${this.shadowColor}; text-shadow: 1px 1px 0px ${this.shadowColor}, -1px -1px 0px ${this.shadowColor}, -1px 1px 0px ${this.shadowColor}, 1px -1px 0px ${this.shadowColor};"
        >
                ${this.teamPlaceAbbreviation}
            </text>
        </svg>
    `;
    }
}
//stroke="${this.shadowColor}"
//stroke-width="1"
// style="-webkit-text-stroke: 1px ${this.shadowColor}; text-shadow: 1px 1px 0px ${this.shadowColor}, -1px -1px 0px ${this.shadowColor}, -1px 1px 0px ${this.shadowColor}, 1px -1px 0px ${this.shadowColor};"