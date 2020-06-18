import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
 
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers && props.interviewers.map((item) =>
        <InterviewerListItem
          key={item.id}
          name={item.name}
          selected={item.id === props.interviewer}
          setInterviewer={(event) => props.onChange(item.id)}
          avatar={item.avatar}
          id={item.id} />
        )}
      </ul>
    </section>
  )
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
