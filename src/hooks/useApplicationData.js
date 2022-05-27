import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
 
  const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});


  const setDay = day => setState({ ...state, day });

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
    .then(setState({ ...state, appointments: appointments }))
    .catch((error) => {console.log("ERROR_SAVE: ", error);});
}



  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }; 
     const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios 
    .delete(`/api/appointments/${id}`, appointment)
    .then(setState({ ...state, appointments: appointments }))
    .catch((error) => { console.log("ERROR_DELETE: ", error);});
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      // console.log(all[0].data)
      // console.log(all[1].data)
      // console.log(all[2].data)
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    }).catch(err=>console.log("Error: ",err))
  }, [])
  
  return { state, setDay, bookInterview, cancelInterview };

}