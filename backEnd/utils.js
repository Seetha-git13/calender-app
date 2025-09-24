const DEFAULT_BUFFER_MINUTES = 15;
const WORK_START_HOUR = 9;
const WORK_END_HOUR = 17;


//   Check conflicts between a proposed event and existing events
 
function checkConflicts(proposed, existing, buffer = DEFAULT_BUFFER_MINUTES) {
  const conflicts = [];
  const proposedStart = new Date(proposed.start);
  const proposedEnd = new Date(proposed.end);
  for (const ev of existing) {
    const evStart = new Date(ev.start);
    const evEnd = new Date(ev.end);

    // Check if participants overlap
    const sharedParticipants = proposed.participants.filter(p => ev.participants.includes(p));
    if (sharedParticipants.length === 0) continue;

    // Add buffer time
    const bufferedStart = new Date(evStart.getTime() - buffer * 60000);
    const bufferedEnd = new Date(evEnd.getTime() + buffer * 60000);

    // Check time overlap
    if (proposedStart < bufferedEnd && proposedEnd > bufferedStart) {
      conflicts.push(ev);
    }
  }
  return conflicts;
}


//   Suggest 3 alternative times if conflict exists
 
function suggestTimes(proposed, existing, buffer = DEFAULT_BUFFER_MINUTES) {
  const suggestions = [];
  const proposedStart = new Date(proposed.start);
  const proposedEnd = new Date(proposed.end);
  const duration = proposedEnd.getTime() - proposedStart.getTime();

  let trialStart = new Date(proposedEnd.getTime() + buffer * 60000);

  while (suggestions.length < 3) {
    let trialEnd = new Date(trialStart.getTime() + duration);

    // Respect working hours (9 AM - 5 PM)
    if (trialStart.getHours() >= WORK_START_HOUR && trialEnd.getHours() <= WORK_END_HOUR) {
      const conflictCheck = checkConflicts(
        { ...proposed, start: trialStart, end: trialEnd },
        existing,
        buffer
      );

      if (conflictCheck.length === 0) {
        suggestions.push({ start: trialStart, end: trialEnd });
      }
    }

    // Move trial 30 minutes forward if conflict
    trialStart = new Date(trialStart.getTime() + 30 * 60000);
  }
  return suggestions;
}

module.exports = { checkConflicts, suggestTimes };
