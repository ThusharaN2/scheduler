import React from "react";
import useVisualMode from "hooks/useVisualMode";
import 'components/Appointment/styles.scss';

import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {

  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  //fcn to save interview & show that it's been made
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => {transition(SHOW)})
      .catch(error =>{ console.log("ERROR_SAVE: ", error)
        transition(ERROR_SAVE, true)}
      );
  }

  //fcn to delete interview
  function deleteInterview(id) {
    transition(DELETING)
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error =>{ console.log("ERROR_DELETE: ", error)
        transition(ERROR_DELETE, true)}
      );
  }


  function edit() {
    transition(EDIT)
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm message={"Can you confirm that want to delete this appointment?"} onCancel={() => back()} onConfirm={() => deleteInterview(id)} />}
      {mode === EDIT && <Form {...props.interview} interviewers={interviewers} onCancel={() => back()} onSave={save}/>}
    </article>

  )
}