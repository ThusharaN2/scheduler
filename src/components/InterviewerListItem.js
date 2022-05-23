import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListitem(props) {

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const imgClass = classNames({ //conditional SCSS for avatar if selected/not
    "interviewers__item-image": props.avatar,
    "interviewers__item-image--selected-image":props.avatar && props.selected
  })

  function formatName(name,selected){ //conditionally renders name 
    if (selected) {
      return `${name}`
    }
  }
  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}> 
      <img
        className={imgClass}
        src={props.avatar}
        alt={props.name}
      />
      {formatName(props.name, props.selected)}
    </li>
  )
}