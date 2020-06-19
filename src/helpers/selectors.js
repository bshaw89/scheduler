export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(d => d.name === day)[0];

  const selectedAppointments = [];

  if (!filteredDays) {
    return [];
  }

  for (let id in state.appointments) {
    if (filteredDays.appointments.includes(state.appointments[id].id)) {
      selectedAppointments.push(state.appointments[id]);
    }
  }
  return selectedAppointments;
}

export function getInterview(state, interview) {
  return (interview && { ...interview, interviewer: state.interviewers[interview.interviewer] });
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(d => d.name === day)[0];

  const selectedInterviewers = [];

  if (!filteredDays) {
    return [];
  }

  for (let id in state.interviewers) {
    if (filteredDays.interviewers.includes(state.interviewers[id].id)) {
      selectedInterviewers.push(state.interviewers[id]);
    }
  }
  return selectedInterviewers;
};