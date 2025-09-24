const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { checkConflicts, suggestTimes } = require('./utils');
const { events, addEvent } = require('./events');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

//  POST /check-conflicts
app.post('/check-conflicts', (req, res) => {
  const proposedEvent = req.body;
  const conflicts = checkConflicts(proposedEvent, events);
  if (conflicts.length > 0) {
    return res.json({
      conflict: true,
      conflicts,
      message: 'Conflicting events found'
    });
  }
  // No conflicts, safe to add
  addEvent(proposedEvent);
  return res.json({ conflict: false, message: 'Event scheduled successfully' });
});


//  POST /suggest-times
app.post('/suggest-times', (req, res) => {
  const proposedEvent = req.body;
  const alternatives = suggestTimes(proposedEvent, events);
  return res.json({ alternatives });
});


// get events
app.get('/events', (req, res) => {
  res.json(events);
});


// Start server
app.listen(PORT, () => {
  console.log(`Calendar API running at http://localhost:${PORT}`);
});
