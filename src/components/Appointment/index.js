import React from 'react';
import axios from "axios"; // needed this

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // console.log(name, interviewer);
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
    // transition to SHOW
  }

  function deleteIntv(event) {
    // const interview = {
    //   student: name,
    //   interviewer
    // };
    transition(DELETING, true);
    props 
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  // need to capture value and preload form

  return (
    <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onEdit={() => transition(EDIT)}
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
    {mode === DELETING && <Status />}
    {mode === CONFIRM && <Confirm onConfirm={deleteIntv} onCancel={back} />}
    {mode === EDIT && <Form
      name={props.interview.student}
      interviewers={props.interviewList}
      interviewer={props.interview.interviewer.id}
      onSave={save}
      onCancel={back}
  />}
    {mode === ERROR_SAVE && <Error message={props.message} onClose={back} />}
    {mode === ERROR_DELETE && <Error message={props.message} onClose={back} />}
      {/* { props.interview ? <Show student={props.interview.student} interviewer={props.interviewList[props.interview.interviewer]}/> : <Empty /> } */}
    </article>
  )
}