import { isTeacher } from "helpers/funcs";
import React, { useCallback, useEffect, useRef } from "react";

const Audio = ({
  audioSource = "",
  playing,
  sendJsonMessage,
  request_id,
  listeningId,
  taskId,
  current_time,
  setShowAudioText,
  setIsDisable,
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
    if (listeningId === current_time.unit1.id) {
      const timeout = setTimeout(() => {
        audioRef.current.currentTime = +current_time.unit1.task?.seeked;
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [current_time.unit1.task?.seeked, listeningId]);

  useEffect(() => {
    if (listeningId === current_time.unit2.id) {
      const timeout = setTimeout(() => {
        audioRef.current.currentTime = +current_time.unit2.task?.seeked;
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [current_time.unit2.task?.seeked, listeningId]);

  useEffect(() => {
    const { unit1, unit2 } = playing;
    if (listeningId === unit1.id) {
      const timeout = setTimeout(() => {
        audioRef.current[unit1.task.is_playing ? "play" : "pause"]();
        if (!isTeacher()) {
          if (unit1.task.is_playing) {
            setShowAudioText(false);
            setIsDisable(true);
          } else {
            setIsDisable(false);
          }
        }
      }, 200);
      return () => clearTimeout(timeout);
    } else if (listeningId === unit2.id) {
      const timeout = setTimeout(() => {
        audioRef.current[unit2.task.is_playing ? "play" : "pause"]();
        unit2.task.is_playing && setShowAudioText(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [playing, listeningId]);

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
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSource}
        onPause={() => sendToggleButton(false)}
        onPlay={() => sendToggleButton(true)}
        controls={isTeacher() ? "controls" : ""}
        style={{ margin: "15px 0", width: "80%" }}
        preload="auto"
        onSeeked={(e) => {
          changeTime(e.target.currentTime);
        }}
      >
        Your browser does not support the audio element.
      </audio>
    </>
  );
};
export default Audio;
