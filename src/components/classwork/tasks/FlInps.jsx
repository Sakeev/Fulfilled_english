import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const FlInps = ({ task, inps, setInps, setTyping }) => {
  console.log(inps);
  const [str, setStr] = useState("");

  useEffect(() => {
    setStr(task[0]?.description);
  }, []);

  const inputCount = str.split("__inp__").length - 1;

  const handleInputChange = (e, index) => {
    setInps({ ...inps, [`inp${task[0].id}_${index}`]: e.target.value });

    setTyping((prev) => !prev);
  };

  return (
    <div>
      {str.split("__inp__").map((value, index) => (
        <div key={index}>
          {value}
          {index < inputCount && (
            <input
              onChange={(e) => handleInputChange(e, index)}
              value={inps[`inp${task[0].id}_${index}`] || ""}
            />
          )}
        </div>
      ))}
    </div>
  );
};
export default FlInps;
