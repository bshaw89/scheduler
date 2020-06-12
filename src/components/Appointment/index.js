import React from 'react';

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onEdit={props.onEdit}
      onDelete={props.onDelete}
      interviewers={props.interviewList}
    />
  )}
  {mode === CREATE && <Form name={props.name} interviewers={[]} onSave={props.onSave} onCancel={() => back()} />}
      {/* { props.interview ? <Show student={props.interview.student} interviewer={props.interviewList[props.interview.interviewer]}/> : <Empty /> } */}
    </article>
  )
}