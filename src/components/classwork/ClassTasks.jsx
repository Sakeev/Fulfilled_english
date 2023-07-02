import React, { useEffect, useState } from "react";
import Listening from "./tasks/Listening";
import Table from "./tasks/Table";
import FlInps from "./tasks/FlInps";
import Describing from "./tasks/Describing";
import Dictation from "./tasks/Dictation";

const ClassTasks = ({
  lesson,
  playing,
  current_time,
  handleInputsChange,
  sendJsonMessage,
  inps,
  setInps,
  setTyping,
  request_id,
  tablePlaying,
  table_current_time,
}) => {
  const renderTask = (task) => {
    switch (task.title.toLowerCase()) {
      case "dictation":
        return (
          <Dictation inps={inps} setInps={setInps} setTyping={setTyping} />
        );
      case "listening":
        return (
          <Listening
            task={task.tasks}
            playing={playing}
            sendJsonMessage={sendJsonMessage}
            request_id={request_id}
            listeningId={task.id}
            taskId={task.tasks[0].id}
            current_time={current_time}
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
            tablePlaying={tablePlaying}
            table_current_time={table_current_time}
            request_id={request_id}
            listeningId={task.id}
            taskId={task.tasks[0].id}
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

  const [tasksQuan, setTasksQuan] = useState(1); // unit 2 also
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (lesson.case_tasks) {
      setTasks(
        [{ title: "dictation" }].concat(
          lesson?.case_tasks?.unit1
            ?.concat(lesson?.case_tasks?.unit2)
            .filter(({ title }) => title.toLowerCase() !== "vocabulary")
        )
      );
    }
  }, [lesson]);

  useEffect(() => {
    if (tasks.length) {
      setTasksQuan(tasks.length);
    }
  }, [tasks]);

  const handlePaginationBtn = (direction) => {
    if (
      (tasksQuan <= activePage && direction !== -1) ||
      (activePage <= 1 && direction !== 1)
    ) {
      return;
    }
    setActivePage(activePage + direction);
  };

  const [activePage, setActivePage] = useState(1);
  return (
    <>
      <div className="slider__container">
        <div className="slider__pagination">
          <button
            onClick={() => handlePaginationBtn(-1)}
            disabled={activePage === 1 ? true : false}
          >
            &#8249;&#8249;
          </button>
          <h5>{activePage}</h5>
          <button
            onClick={() => handlePaginationBtn(1)}
            disabled={activePage === tasksQuan ? true : false}
          >
            &#8250;&#8250;
          </button>
        </div>
        {tasks?.map((task, ind) => (
          <div
            style={{ margin: "20px 0", width: "100%" }}
            className={
              activePage === ind + 1
                ? "slider__page slider__page_active"
                : "slider__page"
            }
            key={ind}
          >
            {renderTask(task)}
          </div>
        ))}
      </div>
    </>
  );
};

export default ClassTasks;
