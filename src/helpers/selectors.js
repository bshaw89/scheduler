export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(d => d.name === day)[0];
  // console.log(state)
  // console.log(state.appointments);
  const selectedAppointments = [];

  if (!filteredDays) {
    return [];
  }

  for (let id in state.appointments) {
    // console.log(state.appointments[id]);
    if (filteredDays.appointments.includes(state.appointments[id].id)) {
      selectedAppointments.push(state.appointments[id]);
    }
  }
  return selectedAppointments;
  // console.log(filteredDays[0].appointments)
  const filteredAppointments = filteredDays[0].appointments.filter(id => state.appointments === id)
  // console.log(filteredAppointments)
  // return filteredDays;
}

// selector: a function to return filtered objects/arrays