import React, { useState } from 'react';
import Audio from './Audio';

const Listening = ({ task = [], playing}) => {

  // const [duration, setDuration] = useState(0);
  // const [appTime, setAppTime] = useState(0);

  return (
    <>
      <h2>Listening</h2>
      <div className='listening-box'>
        {
          task[0]?.description.split('\r\n').map((text, index) => (
            <p className='listening-text' key={index}>{text}</p>
          ))
        }
        <Audio audioSource='/sound/metamarphosis.mp3' playing={playing} />
      </div>
    </>
  );
};

export default Listening;