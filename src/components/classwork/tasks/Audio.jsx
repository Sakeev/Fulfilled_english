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
  const [localAudio, setLocalAudio] = useState(false);
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

  useEffect(() => {
    if (isTeacher()) {
      console.log("sending audio");
      console.log(task);
      // sendJsonMessage({
      //   action: "is_playing",
      //   booli: localAudio,
      //   request_id: request_id,
      //   task_id: 3,
      // });
    }
  }, [localAudio]);

  const handlePlay = () => {
    // setPlaying(true);
    // if (localAudio) audioRef.current.play();
    setLocalAudio(true);
    sendJsonMessage({
      action: "is_playing",
      booli: true,
      request_id: request_id,
      task_id: 15,
    });
    sendJsonMessage({
      pk: 1,
      action: "get_lesson",
      request_id: request_id,
    });
  };
  const handlePause = () => {
    // setPlaying(false);
    // if (!localAudio) audioRef.current.pause();
    setLocalAudio(false);
    sendJsonMessage({
      action: "is_playing",
      booli: false,
      request_id: request_id,
      task_id: 15,
    });
    sendJsonMessage({
      pk: 1,
      action: "get_lesson",
      request_id: request_id,
    });
  };

  // const handleClick = () => {
  //   if (localAudio) {
  //     audioRef.current.pause();
  //     setLocalAudio(false);
  //   } else {
  //     audioRef.current.play();
  //     setLocalAudio(true);
  //   }
  // };

  console.log(playing);
  // console.log(audioSource);

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSource}
        onPause={handlePause}
        onPlay={handlePlay}
        controls={"controls"}
      />
      {/* <button onClick={handleClick}>{`${localAudio}`}</button> */}
    </>
  );
};

export default Audio;
