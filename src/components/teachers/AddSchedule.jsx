import React, { useEffect } from 'react';
import { useState } from 'react';
import { useUsers } from '../../contexts/UsersContextProvider';
import "./Schedule.css"

const AddSchedule = ({info = {weekday: '?', time: '?'}, setShowInps}) => {
  const { getStudents, studentsList } = useUsers();
  const [student, setStudent] = useState({})

  useEffect(() => {
    getStudents();
  }, [])

  document.addEventListener('keydown', (e) => {
    if(e.key == 'Escape') {
      setShowInps(false);
    }
  })

  const handleButton = () => {
    console.log(student)
  }

  return (
    <div className='overlay' onClick={() => setShowInps(false)}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <h4>{info.weekday} {info.time}</h4>
        <select name="" id="" onChange={(e) => setStudent(JSON.parse(e.target.value))}>
          <option value="" selected hidden></option>
          {
            studentsList.map((student, index) => (
              <option key={index} value={JSON.stringify(student)}>{student.username}</option>
            ))
          }
        </select>
        <button onClick={handleButton}>accept</button>
      </div>
    </div>
  );
};

export default AddSchedule;