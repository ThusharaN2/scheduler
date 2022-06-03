import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //updating spots
  function updateSpots(state, appointments) {
    const currentDay = state.days.find((day) => day.name === state.day);
    const apptId = currentDay.appointments //appts for the day
  
    let spots = 0;
    //increases spots as you add to appt
    for (const id of apptId) {
      if (appointments[id].interview === null) {
        spots+=1; 
      }
    }
    // mapping through all the days to see if currentday matches state.day say we map on, replace
    const updatedDays = state.days.map((day) => ({...day, spots: day.name === state.day? spots : day.spots})) 

    return updatedDays;
  };
  
  //sets current day to selected day 
  const setDay = day => setState({ ...state, day });

  //book interview 
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const newDays = updateSpots(state, appointments);
          setState({ ...state, appointments: appointments, days: newDays })
      })
      // .catch((error) => { console.log("ERROR_SAVE: ", error); });
  }


  //cancel interview
  function cancelInterview(id) { //just need id to cancel appt
    const appointment = {
      ...state.appointments[id],
      interview: null //set to null to cancel 
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        const newDays = updateSpots(state, appointments)
        setState({ ...state, appointments: appointments, days: newDays })
      })
      // .catch((error) => { console.log("ERROR_DELETE: ", error); });

  }
  // data request get
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    }).catch(err => console.log("Error: ", err))
  }, []);

  return { state, setDay, bookInterview, cancelInterview };

}