import React, { useEffect, useState } from "react";

const FlInps = ({ task, inps, setInps, setTyping }) => {
  const [str, setStr] = useState("");
  const [condition, setCondition] = useState("");

  useEffect(() => {
    setStr(task[0]?.description);
    setCondition(task[0]?.condition);
  }, []);

  const inputCount = str?.split("__inp__").length - 1;

  const handleInputChange = (e, index) => {
    setInps({ ...inps, [`inp${task[0].id}_${index}`]: e.target.value });

    setTyping((prev) => !prev);
  };

  return (
    <div className="fillinps">
      <h2>Fill inputs below</h2>
      {condition?.split("\r\n").map((cond, index) => (
        <p key={index}>{cond}</p>
      ))}
      {str?.split("__inp__").map((value, index) => {
        if (str?.split("__inp__").length - 1 !== index) {
          return (
            <div className="fillinps__block" key={index}>
              <p>{value}</p>
              {index < inputCount && (
                <textarea
                  onChange={(e) => handleInputChange(e, index)}
                  value={inps[`inp${task[0].id}_${index}`] || ""}
                />
              )}
            </div>
          );
        }
      })}
    </div>
  );
};
export default FlInps;
