import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DayList from 'components/DayList';

export default function useApplicationData() {
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

    let daysArray = []
    const appointmentCount = () => {
      let count = 0

      state.days.forEach(day => {
        if (day.appointments.includes(id)) {
          daysArray = day.appointments
        }
      })

      for (let dayElement of daysArray) {
        if (!appointments[dayElement].interview) {
          count++
        }
      }
      return count
    }

    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: appointmentCount() }
      }
      return day
    })



    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        console.log(response);
      })
      .then(() => setState({ ...state, appointments, days }))
      .then(() => state.appointments[id] === "SHOW")
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let daysArray = []
    const appointmentCount = () => {
      let count = 0

      state.days.forEach(day => {
        if (day.appointments.includes(id)) {
          daysArray = day.appointments
        }
      })

      for (let dayElement of daysArray) {
        if (!appointments[dayElement].interview) {
          count++
        }
      }
      return count
    }

    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: appointmentCount() }
      }
      return day
    })

    return axios.delete(`/api/appointments/${id}`, { interview: null })
      .then(response => {
        console.log(response);
      })
      .then(() => setState({ ...state, appointments, days }))

  }

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)

    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
};
