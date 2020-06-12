import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

/* const appointments = [
  {
    id: 1,
    time: "12pm",
    // interview: {
    //   student: "Bobby Boi",
    //   interviewer: {
    //     id: 2,
    //     name: "Tori Malcolm",
    //     avatar: "https://i.imgur.com/Nmx0Qxo.png"
    //   }
    // }
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Danny Needshelp",
      interviewer: {
        id: 1,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Rea Ct",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
]; */

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
 
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)

    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      console.log(all);
    });
  }, [])

  const interviewers = getInterviewersForDay(state, state.day);
  // const interview = getInterview(state, state.appointments.interview);

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
  day={state.day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        <ul>
        {getAppointmentsForDay(state, state.day).map((appointment) =>
          <Appointment key={appointment.id} interviewList={interviewers} interview={getInterview(state, appointment.interview)} id={appointment.id} time={appointment.time} />
        )}
        <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
