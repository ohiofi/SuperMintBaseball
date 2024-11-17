// Observer design pattern
// a StatsEventManager generates/publishes a StatsEvent
// a StatsEventManager belongs to a BaseballTeam or BaseballPlayer or something that has Stats
// a BaseballTeam or BaseballPlayer has a StatsEventManager
// a User or the League subscribes to one or more StatsEventManagers and can handleEvent(data)
const StatsEventType = {
    GAME_WINNER:0,
    GAME_LOSER:1
}
class StatsEvent {
    constructor(eventType, team, player) {
      this.eventType = eventType
      this.team = team
      this.player = player
    }
}