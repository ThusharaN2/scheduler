import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">

        {interviewers.map((interviewer) => (
          <InterviewerListItem //for each interviewer
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === value}
            setInterviewer={() => { onChange(interviewer.id) }} //set interviewer  w/ anon fcn declaration so it's not called right away
          />
        ))}
      </ul>
    </section>
  )
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};