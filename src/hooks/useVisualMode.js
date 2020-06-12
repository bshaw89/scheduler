import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const transition = (data) => {
    // let newMode = mode;
    // newMode.push(data);
    setMode(data);
  }
  

  return { mode, transition };
}