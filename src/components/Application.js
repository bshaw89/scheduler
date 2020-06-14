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
    
    {console.log('appointment:', appointment);
    console.log('state.appointments[id].id:', state.appointments[id].id)
    console.log('id:', id)
    console.log('appointment.interview:', appointment.interview) // this is the interview data, same thing as just interview
    console.log('interview:', interview)
    console.log('appointments:', appointments) // this is the list of 25 interview slots with most interviews set to null
  }
    
  
  
    axios.put(`/api/appointments/${id}`, { interview }) // update what, and to what?
      .then(response => {
        console.log(response);
      })
      .catch((e) => {console.log(e)})
      
      {// console.log(id, interview, appointment);
      
      // PROBLEM: make an axios PUT request to /api/appointments/:id
      // with interview data in the body
      // to update database with the appointment data
      // QUESTIONS
      // 1. does :id need to refer to the id argument? $(id) --> try both
      //    - looks like data fetching or calling an API counts as a side effect in React
      // 2. do I need to wrap the axios call in useEffect? --> look up useEffect
      //    - A. looks like YES
      //    - except maybe not because it's inside a normal function (not a custom Hook or React function)
      // 3. do I need to use a Promise?
      // 4. How do I put the interview data in the body? Using the interview argument?
      
      // STEPS
      // 1. Make the request --> should receive 204 No Content response
      
      // useEffect: tells React your component needs to do something after render
      // React will remember function passed ('effect') and call it later after performing the DOM updates
      // useEffect called inside components gives it access to the props and component scope
      // useEffect runs after every render (i.e. 'after render')
}
      
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
