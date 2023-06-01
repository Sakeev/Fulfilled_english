import React, { useEffect } from "react";
import Vocabulary from "./tasks/Vocabulary";
import Listening from "./tasks/Listening";
import Table from "./tasks/Table";
import { Box } from "@mui/system";
import FlInps from "./tasks/FlInps";
import Describing from "./tasks/Describing";

const ClassTasks = ({
  lesson,
  playing,
  setPlaying,
  handleInputsChange,
  sendJsonMessage,
  inps,
  setInps,
  setTyping,
}) => {
  const renderTask = (task) => {
    console.log(task);
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
            setTyping={setTyping}
          />
        );
      case "flinps":
        return (
          <FlInps
            task={task.tasks}
            inps={inps}
            setInps={setInps}
            setTyping={setTyping}
          />
        );
      case "describing":
        return <Describing task={task.tasks} />;
      default:
        return <></>;
    }
  };

  return (
    <Box>
      {lesson?.case_tasks?.unit1.map((task, key) => (
        <div style={{ margin: "20px 0", width: "100%" }} key={key}>
          {renderTask(task)}
        </div>
      ))}
      {lesson?.case_tasks?.unit2.map((task, key) => (
        <div style={{ margin: "20px 0", width: "100%" }} key={key}>
          {renderTask(task)}
        </div>
      ))}
    </Box>
  );
};

export default ClassTasks;
