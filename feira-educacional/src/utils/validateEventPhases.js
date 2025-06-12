import { isBefore, isAfter, areIntervalsOverlapping } from 'date-fns';


function isValidInterval(interval) {
  return (
    interval &&
    Array.isArray(interval) &&
    interval.length === 2 &&
    interval[0] instanceof Date &&
    interval[1] instanceof Date &&
    isBefore(interval[0], interval[1])
  );
}

function getAllPhaseIntervals(event) {
  const intervals = [];

  if (isValidInterval(event.enrollmentRange)) {
    intervals.push({
      name: 'Fase de inscrição',
      type: 'enrollment',
      range: event.enrollmentRange
    });
  }

  (event.phases || []).forEach((phase, i) => {
    if (isValidInterval(phase.submissionRange)) {
      intervals.push({
        name: `Submissão da fase ${i + 1}`,
        type: 'submission',
        range: phase.submissionRange
      });
    }
    if (isValidInterval(phase.evaluationRange)) {
      intervals.push({
        name: `Avaliação da fase ${i + 1}`,
        type: 'evaluation',
        range: phase.evaluationRange
      });
    }
  });

  return intervals;
}

export function validateNewEventTimeline(event) {
  const now = new Date();
  const intervals = getAllPhaseIntervals(event);
  const errors = [];

  for (let i = 0; i < intervals.length; i++) {
    const a = intervals[i];

    if (isBefore(a.range[0], now)) {
      errors.push(`${a.name} começa no passado.\n`);
    }

    for (let j = i + 1; j < intervals.length; j++) {
      const b = intervals[j];
      if (areIntervalsOverlapping(
        { start: a.range[0], end: a.range[1] },
        { start: b.range[0], end: b.range[1] }
      )) {
        errors.push(`${a.name} se sobrepõe com ${b.name}.\n`);
      }
    }

    if (i > 0 && isBefore(a.range[0], intervals[i - 1].range[1])) {
      errors.push(`${a.name} começa antes do fim de ${intervals[i - 1].name}.\n`);
    }
  }

  return errors;
}

export function validateEditedEventTimeline(newData, oldData) {
  const now = new Date();
  const newIntervals = getAllPhaseIntervals(newData);
  const oldIntervals = getAllPhaseIntervals(oldData);
  const errors = [];

  for (let i = 0; i < newIntervals.length; i++) {
    const newInt = newIntervals[i];
    const oldInt = oldIntervals[i];

    if (oldInt && isBefore(oldInt.range[1], now)) {
      const changed =
        newInt.range[0].getTime() !== oldInt.range[0].getTime() ||
        newInt.range[1].getTime() !== oldInt.range[1].getTime();

      if (changed) {
        errors.push(`${newInt.name} já passou e não pode ser alterado.\n`);
      }
    }
  }


  return [...errors, ...validateNewEventTimeline(newData)];
}
