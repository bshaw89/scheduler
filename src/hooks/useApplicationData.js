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
  const days = [...state.days]
  days.forEach(day => {
    if (day.appointments.includes(id)) {
      console.log(state.appointments[id]);
      console.log(state.appointments);
      if (!state.appointments[id].interview) {
        day.spots--;
      }
    }
  })

  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };


  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  
  return axios.put(`/api/appointments/${id}`, { interview }) // needed a RETURN before axios..... GOD...
    .then(response => {
      console.log(response);
    })
    // .catch((e) => {console.log(e)})
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
  console.log(state);

  const days = [...state.days]
  days.forEach(day => {
    if (day.appointments.includes(id)) {
      day.spots++;
    }
  }) 
  console.log(days);
  return axios.delete(`/api/appointments/${id}`, { interview: null })
    .then(response => {
      console.log(response);
    })
    // .catch((e) => {console.log(e)})
    .then(() => setState({ ...state, appointments, days }))

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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

  // is this right? or do I need an onChange: (event) => setValue(event.target.value)

}
