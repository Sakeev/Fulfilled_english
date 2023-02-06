import React from 'react';
import "./Schedule.css"

const AddSchedule = ({time, setShowInps}) => {

  document.addEventListener('keydown', (e) => {
    if(e.key == 'Escape') {
      setShowInps(false);
    }
  })

  return (
    <div className='overlay' onClick={() => setShowInps(false)}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <select name="" id="">
          <option>Carlsen</option>
          <option>Ronaldo</option>
          <option>David</option>
        </select>
        <button>accept</button>
      </div>
    </div>
  );
};

export default AddSchedule;