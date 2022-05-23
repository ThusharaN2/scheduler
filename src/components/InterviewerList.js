import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">

        {interviewers.map((theInterviewer) => (
          <InterviewerListItem
            key={theInterviewer.id}
            name={theInterviewer.name}
            avatar={theInterviewer.avatar}
            selected={theInterviewer.id === value}
            setInterviewer={() => {onChange(theInterviewer.id)}} //set interviewer  w/ anon fcn declaration so it's not called right away
            />
        ))}
      </ul>
    </section>
  )
}