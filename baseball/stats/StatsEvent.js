// Observer design pattern
// a StatsEventManager generates/publishes a StatsEvent
// a StatsEventManager belongs to a BaseballTeam or BaseballPlayer or something that has Stats
// a BaseballTeam or BaseballPlayer has a StatsEventManager
// a User or the League subscribes to one or more StatsEventManagers and can handleEvent(data)
/**
 * Represents types of statistics events using an enumerated object.
 * Used to define various game events such as hits, home runs, or pitching stats.
 * @enum {number}
 */
const StatsEventType = {
  GAME_WINNER:0,
  GAME_LOSER:1,
  PLATE_APPEARANCES:2,
  HITS:3,
  SINGLES:4,
  DOUBLES:5,
  TRIPLES:6,
  HOME_RUNS:7,
  RUNS_SCORED:8,
  BASES_ON_BALLS:9,
  SACRIFICE_FLIES:10,
  STRIKEOUTS_AT_BAT:11,
  STOLEN_BASES:12,// todo
  HIT_BY_PITCH:13,// todo
  INNINGS_PITCHED:14,
  STRIKEOUTS_THROWN: 15,
  RUNS_ALLOWED:18,
  HOME_RUNS_ALLOWED:19,
  WALKS_ALLOWED:20,
  AT_BATS:21
}


/**
 * Represents a statistical event in the context of a baseball game or baseball player's performance.
 * Utilizes the observer design pattern to publish events that can be subscribed to by other objects.
 */
class StatsEvent {
  /**
   * Restructures a plain JSON object into an instance of the `StatsEvent` class.
   * @param {Object} jsonObject - The plain JSON object to convert.
   * @returns {StatsEvent} The converted object with `StatsEvent` prototype.
   */
  static restructure(jsonObject) {
    Object.setPrototypeOf(jsonObject, StatsEvent.prototype);
    return jsonObject;
  }

  /**
   * Initializes a new instance of the `StatsEvent` class.
   * @param {number} eventType - The type of event, corresponding to a value from `StatsEventType`.
   * @param {number} teamId - The unique league id number for the team involved in the event.
   * @param {number} playerId - The unique league id number for the player involved in the event.
   */
  constructor(eventType, teamId, playerId) {
    /** @type {number} The type of the event, defined by `StatsEventType`. */
    this.eventType = eventType;

    /** @type {number} The unique league id number for the team associated with the event. */
    this.teamId = teamId;

    /** @type {number} The unique league id number for the player associated with the event. */
    this.playerId = playerId;
  }
}