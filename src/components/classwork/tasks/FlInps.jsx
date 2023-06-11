import React, { useEffect, useState } from "react";

const FlInps = ({ task, inps, setInps, setTyping }) => {
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
    <div className="fillinps">
      <h2>Fill inputs below</h2>
      {str.split("__inp__").map((value, index) => (
        <div className="fillinps__block" key={index}>
          <p>{value}</p>
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
