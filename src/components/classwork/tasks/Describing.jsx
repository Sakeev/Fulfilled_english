import { Divider } from "@mui/material";
import React from "react";
import { API } from "../../../helpers/consts";

const Describing = ({ task }) => {
  return (
    <div>
      {task.map((elem, index) => (
        <div
          key={elem.id}
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "40px 10px",
            rowGap: 20,
          }}
        >
          {index !== 0 && <Divider />}
          <h2>Exercise</h2>
          {elem.images.map((image, index) => (
            <img
              key={index}
              style={{ maxWidth: image.size }}
              src={API + image.image}
              alt="error"
            />
          ))}
          <div>
            {elem.description.split("\r\n").map((question, index) => {
              return <div key={index}>{question}</div>;
            })}
          </div>
          <div style={{ marginBottom: "60px" }}>
            {elem.condition.split("\r\n").map((question, index) => {
              return <div key={index}>{question}</div>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Describing;
