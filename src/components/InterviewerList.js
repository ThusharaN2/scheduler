import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">

        {props.interviewers.map((theInterviewer) => (
          <InterviewerListItem
            key={theInterviewer.id}
            id={theInterviewer.id}
            name={theInterviewer.name}
            avatar={theInterviewer.avatar}
            selected={theInterviewer.id === props.interviewer}
            setInterviewer={() => props.setInterviewer(theInterviewer.id)} //set interviewer  w/ anon fcn declaration so it's not called right away
            />
        ))}
      </ul>
    </section>
  )
}