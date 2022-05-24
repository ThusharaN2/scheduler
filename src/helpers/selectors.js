  //... returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  const results = [];
  const foundDay = state.days.find(date => date.name === day )
  if(!foundDay) {
    return [];
  }
  for (const appt of foundDay.appointments) {
    results.push(state.appointments[appt]);
  }

  return results;
}

