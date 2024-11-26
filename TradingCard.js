class TradingCard{
    constructor(player, cost){
        this.name = player.firstName + " " + player.lastName;
        this.position = player.position;
        this.team = player.teamPlaceAbbreviation + " " + player.teamMascot;
        this.leagueIdNumber = player.leagueIdNumber;
        this.colorScheme = player.colorScheme;
        this.profilePic = player.profilePic;
        this.cost = cost
        this.reward = "+1 🎟️ per strikeout"
        this.container = View.createElement("span");
        this.container.innerHTML = `<trading-card onclick="app.view.modal.update(${this.leagueIdNumber});" data-bs-target="#statsModal" data-bs-toggle="modal"
  name="${this.name}"
  position="${this.position}"
  team="${this.team}"
  reward="${this.reward}"
  cost="${this.cost}"
  colorPrimary="${this.colorScheme[0]}"
  colorSecondary="${this.colorScheme[1]}"
  emoji="${this.profilePic}">
</trading-card>`
    }
    render() {
        return this.container
    }
}