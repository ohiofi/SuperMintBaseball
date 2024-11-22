// Observer design pattern
// a StatsEventManager generates/publishes a StatsEvent
// a StatsEventManager belongs to a BaseballTeam or BaseballPlayer or something that has Stats
// a BaseballTeam or BaseballPlayer has a StatsEventManager
// a User or the League subscribes to one or more StatsEventManagers and can handleEvent(data)
class StatsEventManager {

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, StatsEventManager.prototype);
        return jsonObject;
    }

    constructor() {
        this.listeners = [];
    }

    subscribe(func) {
        this.listeners.push(func);
    }

    unsubscribe(func) {
        this.listeners = this.listeners.filter((listener) => listener !== func);
    }

    notify(data) {
        this.listeners.forEach((listener) => listener(data));
    }
}