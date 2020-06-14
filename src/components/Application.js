import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
/*     {console.log('appointment:', appointment);
    console.log('state.appointments[id].id:', state.appointments[id].id)
    console.log('id:', id)
    console.log('appointment.interview:', appointment.interview) // this is the interview data, same thing as just interview
    console.log('interview:', interview)
    console.log('appointments:', appointments) // this is the list of 25 interview slots with most interviews set to null
  } */
    
  
  
    axios.put(`/api/appointments/${id}`, { interview }) // update what, and to what?
      .then(response => {
        console.log(response);
      })
      .catch((e) => {console.log(e)})
      
     setState({ ...state, appointments });
    
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    axios.delete(`/api/appointments/${id}`, { interview: null })
      .then(response => {
        console.log(response);
      })
      .catch((e) => {console.log(e)});

      setState({ ...state, appointments });


  }

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)

    ]).then((all) => {
      setState(prev => ({ ...prev, 
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data 
      }));
    });
  }, [])

  const interviewers = getInterviewersForDay(state, state.day);

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
            <Appointment 
            key={appointment.id}
            interviewList={interviewers}
            interview={getInterview(state, appointment.interview)}
            id={appointment.id}
            time={appointment.time}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
            />
          )}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
