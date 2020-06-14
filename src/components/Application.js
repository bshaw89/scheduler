import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

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
