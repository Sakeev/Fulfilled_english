import React, { useEffect } from 'react';
import Vocabulary from './tasks/Vocabulary';
import Listening from './tasks/Listening';

const ClassTasks = ({lesson, playing}) => {

  const renderTask = (task) => {
    switch (task.title) {
      case "vocabulary":
        return <Vocabulary task={task.tasks} />
      case "listening":
        return <Listening task={task.tasks} playing={playing} />
  
      default:
        return <></>;
    }
  }

  return (
    <>
      {
        lesson?.case_tasks?.map((task, key) => (
          <div style={{ margin: "20px 0" }} key={key}>
            {
              renderTask(task)
            }
          </div>
        ))
      }
    </>
  );
};

export default ClassTasks;