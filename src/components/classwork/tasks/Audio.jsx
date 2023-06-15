import React, { useCallback, useEffect, useRef, useState } from "react";

const Audio = ({
  audioSource = "",
  playing,
  sendJsonMessage,
  request_id,
  listeningId,
  taskId,
  current_time,
}) => {
  const audioRef = useRef();

  const changeTime = (currentTime) => {
    sendJsonMessage({
      action: "set_current_time",
      current_time: currentTime,
      request_id: request_id,
      task_id: taskId,
    });
    sendJsonMessage({
      pk: listeningId,
      action: "get_current_time",
      request_id: request_id,
    });
  };

  useEffect(() => {
    if (listeningId == current_time.unit1.id) {
      const timeout = setTimeout(() => {
        audioRef.current.currentTime = +current_time.unit1.task?.seeked;
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [current_time.unit1.task?.seeked]);

  useEffect(() => {
    if (listeningId == current_time.unit2.id) {
      const timeout = setTimeout(() => {
        audioRef.current.currentTime = +current_time.unit2.task?.seeked;
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [current_time.unit2.task?.seeked]);

  useEffect(() => {
    const { unit1, unit2 } = playing;
    if (listeningId === unit1.id) {
      console.log(unit1);
      const timeout = setTimeout(() => {
        audioRef.current[unit1.task.is_playing ? "play" : "pause"]();
      }, 200);
      return () => clearTimeout(timeout);
    } else if (listeningId === unit2.id) {
      const timeout = setTimeout(() => {
        audioRef.current[unit2.task.is_playing ? "play" : "pause"]();
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [playing]);

  const sendToggleButton = useCallback((booli = false) => {
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
  });

  const handleTogglePlayback = (booli = false) => {
    sendToggleButton(booli);
    switch (listeningId) {
      case playing.unit1?.id:
        if (booli !== playing.unit1?.task.is_playing) {
          sendToggleButton(booli);
        }
        break;
      case playing.unit2?.id:
        if (booli !== playing.unit2?.task.is_playing) {
          sendToggleButton(booli);
        }
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
        muted="muted"
        controls
        onSeeked={(e) => {
          changeTime(e.target.currentTime);
        }}
      />
    </>
  );
};
export default Audio;
