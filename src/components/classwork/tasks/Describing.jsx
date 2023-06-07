import { Divider } from "@mui/material";
import React from "react";
import { API } from "../../../helpers/consts";

const Describing = ({ task }) => {
  console.log(task);
  return (
    <div>
      {task.map((elem) => (
        <div
          key={elem.id}
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "40px 10px",
            rowGap: 20,
          }}
        >
          <Divider />
          <h2>Exrcise</h2>
          {elem.images.map((image, index) => (
            <img
              key={index}
              style={{ maxWidth: image.size }}
              src={API + image.image}
              alt="error"
            />
          ))}
          <div>Description: {elem.description}</div>
          <div style={{ marginBottom: "60px" }}>
            Condition:{" "}
            {elem.condition.split("\r\n").map((question, index) => {
              console.log(question);
              return <div key={index}>{question}</div>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Describing;
