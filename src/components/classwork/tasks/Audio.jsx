import React, { useEffect, useRef } from "react";
import { isTeacher } from "../../../helpers/funcs";

const Audio = ({ audioSource = "", playing, setPlaying, test = true }) => {
  // const ref = useRef();

  // useEffect(() => {
  //   playing ? ref.current.play() : ref.current.pause();
  // }, [playing]);

  const handleTogglePause = () => isTeacher() && setPlaying(!playing);

  return (
    <>
      <button onClick={() => setPlaying(!playing)}>click</button>
      <audio
        // ref={ref}
        controls
        onPlay={handleTogglePause}
        onPause={handleTogglePause}
        // onPause={() => setPlaying(false)}
      >
        <source src={audioSource} />
      </audio>
      {/* <button onClick={handleTogglePause}>
        {!playing ? "Возобновить" : "Пауза"}
      </button> */}
    </>
  );
};

export default Audio;
