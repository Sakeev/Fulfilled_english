import React, { useEffect, useRef } from 'react';

const Audio = ({ audioSource = "", playing, setPlaying, test=true }) => {

  return (
    <audio controls onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
      <source src={audioSource} />
    </audio>
  );
};

export default Audio;