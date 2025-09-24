// In-memory events store
let events = [];

// Add event helper
function addEvent(event) {
  events.push({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  });
}

module.exports = { events, addEvent };
