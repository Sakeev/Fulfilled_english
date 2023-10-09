import { Fragment } from "react";

import "./resultDisplayTasks.css";
import { Button } from "@mui/material";
import { useTasks } from "../../../contexts/TasksContextProvider";

const Inputs = ({ task, answer, displayDataType }) => {
  const { updateAnswer } = useTasks();

  if (answer === null) return <h2>This task hasn't done yet</h2>;

  const inputCount = task.description.split("__inp__").length - 1;
  const answers =
    displayDataType === "student" ? answer.answer : answer.right_answer;

  if (answers.length < answer.right_answer.length) {
    for (let i = 0; i < answer.right_answer.length - answers.length; i++) {
      answers.push("No answer");
    }
  }

  const inputArr = task.description.split("__inp__").map((value, index) => {
    return (
      <Fragment key={index}>
        {value}
        {index < inputCount && (
          <p
            style={{
              color: displayDataType === "teacher" ? "green" : "",
            }}
          >
            {answers[index] || ""}
          </p>
        )}
      </Fragment>
    );
  });

  return (
    <div>
      <div>{inputArr}</div>
      <div>
        <Button>Correct</Button>
        <Button>Incorrect</Button>
      </div>
    </div>
  );
};

export default Inputs;
