import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  // const dailyAppointments = [];
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));


    useEffect(() => {
      Promise.all([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers")
      ]).then(all => {
        console.log(all[0].data)
        console.log(all[1].data)
        console.log(all[2].data)
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
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

          {dailyAppointments.map(appointment =>  //uses Object.values() to change appts into an array to be mapped
            <Appointment
              key={appointment.id}
              {...appointment}
            /> //below represents last appt of day(check console to see if appt has key)
          )}
          <Appointment key="last" time="5pm" />
        </section>
      </main>
    );
  }

