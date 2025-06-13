export function getCurrentPhase(event) {
  const now = new Date();

  if (event.enrollmentRange && event.enrollmentRange.length === 2) {
    const [enrollmentStart, enrollmentEnd] = event.enrollmentRange.map(d => new Date(d));
    if (now >= enrollmentStart && now <= enrollmentEnd) {
      return { phase: "enrollment", index: null };
    }
  }

  if (event.phases) {
    for (let i = 0; i < event.phases.length; i++) {
      const phase = event.phases[i];
      if (
        Array.isArray(phase.submissionRange) &&
        phase.submissionRange.length === 2
      ) {
        const [submissionStart, submissionEnd] = phase.submissionRange.map(d =>(d.toDate()));
        console.log(submissionStart, submissionEnd)
        if (now >= submissionStart && now <= submissionEnd) {
          return { phase: "submission", index: i };
        }
      }

      if (
        Array.isArray(phase.evaluationRange) &&
        phase.evaluationRange.length === 2
      ) {
        const [evalStart, evalEnd] = phase.evaluationRange.map(d => (d.toDate()));
        if (now >= evalStart && now <= evalEnd) {
          return { phase: "evaluation", index: i };
        }
      }
    }
  }

  return { phase: "closed", index: null };
}
