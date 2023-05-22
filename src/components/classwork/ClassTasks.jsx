import React, { useEffect } from "react";
import Vocabulary from "./tasks/Vocabulary";
import Listening from "./tasks/Listening";
import Table from "./tasks/Table";

const ClassTasks = ({
  lesson,
  playing,
  setPlaying,
  handleInputsChange,
  sendJsonMessage,
  inps,
  setInps,
}) => {
  const renderTask = (task) => {
    switch (task.title.toLowerCase()) {
      case "vocabulary":
        return <Vocabulary task={task.tasks} />;
      case "listening":
        return (
          <Listening
            task={task.tasks}
            playing={playing}
            setPlaying={setPlaying}
          />
        );
      case "table_exercise":
        return (
          <Table
            task={task.tasks}
            handleInputsChange={handleInputsChange}
            lesson={lesson}
            sendJsonMessage={sendJsonMessage}
            inps={inps}
            setInps={setInps}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      {lesson?.case_tasks?.map((task, key) => (
        <div style={{ margin: "20px 0", width: "100%" }} key={key}>
          {renderTask(task)}
        </div>
      ))}
    </>
  );
};

export default ClassTasks;
