// Observer design pattern
// a StatsEventManager generates/publishes a StatsEvent
// a StatsEventManager belongs to a BaseballTeam or BaseballPlayer or something that has Stats
// a BaseballTeam or BaseballPlayer has a StatsEventManager
// a User or the League subscribes to one or more StatsEventManagers and can handleEvent(data)

/**
 * Manages the publication and subscription of `StatsEvent` objects using the Observer design pattern.
 * Used by entities like `BaseballTeam` or `BaseballPlayer` to notify subscribers (e.g., Users or League) of statistical events.
 */
class StatsEventManager {

    /**
   * Restructures a plain JSON object into an instance of the `StatsEventManager` class.
   * @param {Object} jsonObject - The plain JSON object to convert.
   * @returns {StatsEventManager} The converted object with `StatsEventManager` prototype.
   */
    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, StatsEventManager.prototype);
        return jsonObject;
    }

    /**
   * Initializes a new instance of the `StatsEventManager` class.
   * Manages a list of subscribed listeners for event notifications.
   */
    constructor() {
        this.listeners = [];
    }

    /**
   * Subscribes a listener to the event manager.
   * The listener will be notified when an event is published.
   * @param {Function} func - The callback function to be invoked when an event occurs.
   */
    subscribe(func) {
        this.listeners.push(func);
    }

    /**
   * Unsubscribes a listener from the event manager.
   * The listener will no longer be notified of events.
   * @param {Function} func - The callback function to remove from the list of listeners.
   */
    unsubscribe(func) {
        this.listeners = this.listeners.filter((listener) => listener !== func);
    }

    /**
   * Notifies all subscribed listeners of a new event.
   * Each listener's callback function will be invoked with the event data.
   * @param {Object} data - The data associated with the event being published.
   */
    notify(data) {
        this.listeners.forEach((listener) => listener(data));
    }
}