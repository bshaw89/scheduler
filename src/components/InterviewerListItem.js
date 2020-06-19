import React from 'react';
import "components/InterviewerListItem.scss";
// import into InterviwerList.js

import classNames from "classnames";

export default function InterviewerListItem(props) {
  // console.log(props.item);
  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected // ?? returns undefined 
  })
  return (
    <li onClick={props.setInterviewer} className={interviewerListItemClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
};