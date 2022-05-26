import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };  
  }

    function cancelInterview(id) {
      const appointment = {
        ...state.appointments[id],
        interview: null
      }; 
       const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios 
      .delete(`/api/appointments/${id}`, appointment)
      .then(setState({ ...state, appointments: appointments }))
      .catch((error) => { console.log("Error: ", error);});
    };
  

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day)
  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));

  const schedule = dailyAppointments.map((appointment) => {  //same as what our object.values() fcn did before for each appt
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
      }).catch(err=>console.log("error",err))
    }, [])

    return (
      <main className="layout">
        <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              value={state.day} //getter
              onChange={setDay} //setter
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />      </section>
        <section className="schedule">
          {schedule}           
          <Appointment key="last" time="5pm" /> 
        </section>
      </main>
    );
  }

