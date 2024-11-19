// Observer design pattern
// a StatsEventManager generates/publishes a StatsEvent
// a StatsEventManager belongs to a BaseballTeam or BaseballPlayer or something that has Stats
// a BaseballTeam or BaseballPlayer has a StatsEventManager
// a User or the League subscribes to one or more StatsEventManagers and can handleEvent(data)
const StatsEventType = {
    GAME_WINNER:0,
    GAME_LOSER:1,
    AT_BATS:2,
    SINGLES:4,
    DOUBLES:5,
    TRIPLES:6,
    HOME_RUNS:7,
    BASES_ON_BALLS:8,
    SACRIFICE_FLIES:10,
    STRIKEOUTS_AT_BAT:11,
    STOLEN_BASES:12,// todo
    HIT_BY_PITCH:13,// todo
    INNINGS_PITCHED:14,
    STRIKEOUTS_THROWN:15,
    RUNS_ALLOWED:18,
    HOME_RUNS_ALLOWED:19,
    WALKS_ALLOWED:20
}


class StatsEvent {
    constructor(eventType, team, player) {
      this.eventType = eventType
      this.team = team
      this.player = player
    }
}