// Observer design pattern
// a StatsEventManager generates/publishes a StatsEvent
// a StatsEventManager belongs to a BaseballTeam or BaseballPlayer or something that has Stats
// a BaseballTeam or BaseballPlayer has a StatsEventManager
// a User or the League subscribes to one or more StatsEventManagers and can handleEvent(data)
const StatsEventType = {
  GAME_WINNER:0,
  GAME_LOSER:1,
  AT_BATS:2,
  SINGLES:3,
  DOUBLES:4,
  TRIPLES:5,
  HOME_RUNS:6,
  RUNS_SCORED:7,
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
  constructor(eventType, teamId, playerId) {
    this.eventType = eventType
    this.teamId = teamId
    this.playerId = playerId
  }
}