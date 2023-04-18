import React, { useEffect, useRef } from 'react';

const Audio = ({ audioSource = "", playing, setPlaying, test=true }) => {

  const ref = useRef();

  useEffect(() => {
    playing ? ref.current.play() : ref.current.pause();
  }, [playing])

  return (
    <>
      <button onClick={() => setPlaying(!playing)}>click</button>
      <audio ref={ref} controls onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
        <source src={audioSource} />
      </audio>
    </>
  );
};

export default Audio;