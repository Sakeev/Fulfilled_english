import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const FlInps = ({ task, inps, setInps, setTyping }) => {
  console.log(inps);
  const [str, setStr] = useState("");

  useEffect(() => {
    setStr(task[0]?.description);
  }, []);

  const inputCount = str.split("__inp__").length - 1;

  const handleInputChange = (e) => {
    setInps({ ...inps, inp1: e.target.value });

    setTyping((prev) => !prev);
  };

  return (
    <div>
      {str.split("__inp__").map((value, index) => (
        <React.Fragment key={index}>
          {value}
          {index < inputCount && (
            <input onChange={handleInputChange} value={inps.inp1 || ""} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
export default FlInps;
