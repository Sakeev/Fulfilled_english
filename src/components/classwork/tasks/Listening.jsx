import React, { useState } from "react";
import { API } from "../../../helpers/consts";
import Audio from "./Audio";

const Listening = ({ task = [], playing, setPlaying }) => {
  const [duration, setDuration] = useState(0);
  const [appTime, setAppTime] = useState(0);
  return (
    <>
      <h2>Listening</h2>
      <div className="listening-box">
        <Audio
          audioSource={API + task[0]?.audio}
          playing={playing}
          setPlaying={setPlaying}
        />
        {task[0]?.description.split("\r\n").map((text, index) => (
          <p className="listening-text" key={index}>
            {text}
          </p>
        ))}
      </div>
    </>
  );
};

export default Listening;
