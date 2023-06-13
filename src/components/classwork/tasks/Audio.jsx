import React, { useEffect, useRef, useState } from "react";

const Audio = ({
  audioSource = "",
  playing,
  sendJsonMessage,
  request_id,
  listeningId,
  taskId,
}) => {
  const audioRef = useRef();

  useEffect(() => {
    switch (listeningId) {
      case playing.unit1?.id:
        if (!playing.unit1.task?.is_playing) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        break;
      case playing.unit2?.id:
        if (!playing.unit2.task?.is_playing) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        break;
      default:
        console.error("Unexpected listening id:", listeningId);
        break;
    }
  }, [playing]);

  function sendToggleButton(booli) {
    sendJsonMessage({
      action: "is_playing",
      booli: booli,
      request_id: request_id,
      task_id: taskId,
    });
    sendJsonMessage({
      pk: listeningId,
      action: "get_listening",
      request_id: request_id,
    });
  }

  const handleTogglePlayback = (booli) => {
    sendToggleButton(booli);
    switch (listeningId) {
      case playing.unit1?.id:
        if (booli !== playing.unit1?.task.is_playing) {
          sendToggleButton(booli);
        }
        break;
      case playing.unit2?.id:
        sendToggleButton(booli);
        break;
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
