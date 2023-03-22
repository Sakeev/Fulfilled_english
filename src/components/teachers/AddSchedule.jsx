import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSchedule } from '../../contexts/ScheduleContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';
import "./Schedule.css"

const AddSchedule = ({info = {weekday: '?', time: '?', filled: false}, setShowInps}) => {
  const { getStudents, studentsList } = useUsers();
  const { setSchedule, deleteSchedule } = useSchedule();
  const [student, setStudent] = useState({})

  useEffect(() => {
    getStudents();
  }, [])

  document.addEventListener('keydown', (e) => {
    if(e.key == 'Escape') {
      setShowInps(false);
    }
  })

  console.log(info)

  const handleButton = () => {
    console.log(student)
    let new_info = {
      time: info.time + ":00",
      weekday: info.weekday,
      accepted: false,
      room: 3,
      student_id: student.id,
    }
    setSchedule(new_info)

  }

  return (
    <div className='overlay' onClick={() => setShowInps(false)}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <h4>{info.weekday} {info.time}</h4>
        <select name="" id="" onChange={(e) => setStudent(JSON.parse(e.target.value))} defaultValue={''}>
          <option value="" hidden></option>
          {
            studentsList.map((student, index) => (
              <option key={index} value={JSON.stringify(student)}>{student.username}</option>
            ))
          }
        </select>
        <button onClick={handleButton}>accept</button>
        {
          info.filled ? <button onClick={() => deleteSchedule(info.id)}>delete</button> : <></>
        }
      </div>
    </div>
  );
};

export default AddSchedule;