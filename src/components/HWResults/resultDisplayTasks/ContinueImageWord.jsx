import { API } from "../../../helpers/consts";
import React, { useState } from "react";
import { Button } from "@mui/material";

const ContinueImageWord = ({ answer, displayDataType }) => {
  if (answer === null) return <h2>This task hasn't done yet</h2>;

  const answers =
    displayDataType === "student" ? answer.answer : answer.right_answer;

  return (
    <div className="image-word-container task-types-container">
      <div className="image-word-image-box-wrapper">
        {answer.images.map(({ image, sentence }, index) => {
          return (
            <div className="image-word-image-box" key={image}>
              <img src={`${API}${image}`} alt="exercise" />
              <p>
                {index + 1}. {sentence}
              </p>
            </div>
          );
        })}
      </div>
      <div className="image-word-inputs">
        {answers.map((string, index) => {
          return (
            <p key={index}>
              {index + 1}. {string}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ContinueImageWord;
