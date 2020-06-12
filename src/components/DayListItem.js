import React from "react";
import "components/DayListItem.scss";

import classnames from "classnames";

export default function DayListItem(props) {
  const dayClass = classnames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    } else {
      return `${spots} spots remaining`;
    }
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2> 
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}