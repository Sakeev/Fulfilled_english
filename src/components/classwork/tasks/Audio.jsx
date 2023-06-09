import React, { useEffect, useRef, useState } from "react";
import { isTeacher } from "../../../helpers/funcs";

const Audio = ({ audioSource = "", playing, setPlaying, test = true }) => {

  const [localAudio, setLocalAudio] = useState(playing)
  const audioRef = useRef();

  // useEffect(() => {
  //   playing ? ref.current.play() : ref.current.pause();
  // }, [playing]);

  const handleTogglePause = () => {
    if (audioRef.current) {
      if (!playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      isTeacher() && setPlaying(!playing);
    }
  };
  console.log(playing);
  // console.log(audioRef.current.currentTime);

  return (
    <>
      {/* <button onClick={() => setPlaying(!playing)}>click</button> */}
      <audio
        ref={audioRef}
        src={audioSource}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        controls={isTeacher() && "controls"}
      />
      {/* <source src={audioSource} /> */}
      {/* </audio> */}
      {/* {isTeacher() && (
        <button onClick={handleTogglePause}>
          {!playing ? "Возобновить" : "Пауза"}
        </button>
      )} */}
    </>
  );
};

export default Audio;
