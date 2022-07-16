import React, { useEffect, useState } from "react";
import axios from "axios";
import Appointment from "./Appointment";
import DayList from "./DayList";
import "components/Application.scss";
 

export default function Application(props) {
  const [ state, setState ] = useState ({
    day: "Monday",
    days: [],
    appointments: {}
  })
  // const setDay = (day) => setState (state => ({...state, day}))
  // const setDays = (days) => setState(prev => ({...prev, days }))
  const dailyAppointments = []
  const appointmentsArray = dailyAppointments.map(appointment => {
    return (
      <Appointment
      key={appointment.id}
      {...appointment}
      />);
    });
    
    useEffect(() => {
        Promise.all([
          axios.get('/api/days'),
          axios.get('api/appointments'),
          axios.get('/api/interviewers')
        ]) .then(all => {
          setState(prev => ({...prev, days: all[0], appointments: [1], interviewers: all[2] }))
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
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
