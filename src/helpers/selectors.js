export function getAppointmentsForDay(state, day) {
  const filteredAppt = state.days.filter(days => days.name === day);
  let appointments = []

  if(filteredAppt[0]) {
    const idOfDay = filteredAppt[0].appointments
    appointments = idOfDay.map(elm => state.appointments[elm]);
  }
  return appointments
}


export function getInterviewersForDay(state, day) {
  const selectedApptDay = state.days.filter(eachDay => eachDay.name === day);
  const interviewers = [];

  if (selectedApptDay[0]) {

    for (const numInterviewers of selectedApptDay[0].interviewers) {
      interviewers.push(state.interviewers[numInterviewers])
    }
  }
  return interviewers;
}



export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const interviewerData = state.interviewers[interview.interviewer]
  return { ...interview, interviewer: interviewerData };
}