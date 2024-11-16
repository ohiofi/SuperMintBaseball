// Observer design pattern
// an EventManager generates/publishes Events
// an EventManager belongs to an Editor (a BaseballTeam or BaseballPlayer or something that generates events)
// Editor has an EventManager
class EventManager {
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
      this.listeners.forEach((listener) => observer(data));
    }
  }