import React from "react";
import { API } from "../../../helpers/consts";

const Describing = ({ task }) => {
  console.log(task);
  return (
    <div>
      {task.map((elem) => (
        <div key={elem.id}>
          {elem.images.map((image, index) => (
            <img
              key={index}
              style={{ maxWidth: "450px" }}
              src={API + image.image}
              alt="error"
            />
          ))}
          <div>Description: {elem.description}</div>
          <div>Condition: {elem.condition}</div>
        </div>
      ))}
    </div>
  );
};

export default Describing;
