import React, { useEffect, useRef, useState } from "react";
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
  setTyping,
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
            setTyping={setTyping}
          />
        );
      default:
        return <></>;
    }
  };

  const slide = useRef();

  const [tasksQuan, setTasksQuan] = useState(1); // unit 2 also

  useEffect(() => {
    setTasksQuan(lesson?.case_tasks?.unit1?.length)
  }, [lesson])

  const handlePaginationBtn = (direction) => {
    if(((tasksQuan - 1 <= activePage) && direction !== -1) || (activePage <= 1) && direction !== 1){
      return
    }
    setActivePage(activePage + direction);
  }

  const [activePage, setActivePage] = useState(1);
  return (
    <>
      <div className="slider__container">
        <div className="slider__pagination">
          <button onClick={() => handlePaginationBtn(-1)}>PREV</button>
          <button onClick={() => handlePaginationBtn(1)}>NEXT</button>
        </div>
        {
          lesson?.case_tasks?.unit1.map((task, ind) => (
            <div style={{ margin: "20px 0", width: "100%" }} className={activePage === ind + 1 ? "slider__page slider__page_active" : "slider__page"} key={ind} ref={slide} >
              {renderTask(task)}
            </div>
          ))
        }
      </div>
    </>
  );
};

export default ClassTasks;
