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

//return obj that has interview data if the obj that's passed to it has an interviewer
export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  } 
  return  {...interview, interviewer: state.interviewers[interview.interviewer]}
}
