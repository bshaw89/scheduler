import React from 'react';

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log(name, interviewer);
    transition(SAVING);
    props.bookInterview(props.id, interview);
    transition(SHOW);
    // transition to SHOW
  }

  function deleteIntv(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING);
    props.cancelInterview(props.id, interview);
    transition(EMPTY);
  }

  return (
    <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onEdit={props.onEdit}
      onDelete={() => transition(CONFIRM)}
      interviewers={props.interviewList}
    />
  )}
  {mode === CREATE && 
    <Form 
      name={props.name}
      interviewers={props.interviewList}
      onSave={save}
      onCancel={back}
    />}

    {mode === SAVING && <Status />}
    {mode === CONFIRM && <Confirm onConfirm={deleteIntv} onCancel={back}/>}
      {/* { props.interview ? <Show student={props.interview.student} interviewer={props.interviewList[props.interview.interviewer]}/> : <Empty /> } */}
    </article>
  )
}