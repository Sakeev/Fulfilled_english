import React, { useEffect, useRef, useState } from "react";
import { isTeacher } from "../../../helpers/funcs";

const Audio = ({
  audioSource = "",
  playing,
  setPlaying,
  test = true,
  sendJsonMessage,
  request_id,
  is_playing,
  task,
}) => {
  const audioRef = useRef();

  useEffect(() => {
    if (
      // !isTeacher() &&
      audioSource === "http://13.50.235.4//media/media/Unit_01.mp3"
    ) {
      if (!playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }, [playing]);

  const handleTogglePlayback = (booli) => {
    if (booli !== playing) {
      setPlaying(booli);
      sendJsonMessage({
        action: "is_playing",
        booli: booli,
        request_id: request_id,
        task_id: 15,
      });
      sendJsonMessage({
        pk: 1,
        action: "get_lesson",
        request_id: request_id,
      });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSource}
        onPause={() => handleTogglePlayback(false)}
        onPlay={() => handleTogglePlayback(true)}
        controls={"controls"}
      />
    </>
  );
};
export default Audio;
