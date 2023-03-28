import React, { useEffect, useState } from 'react';
import { useSchedule } from '../../contexts/ScheduleContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';
import AddSchedule from './AddSchedule';
import "./Schedule.css"
import { getWeekDay } from '../../helpers/funcs';

const rows = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17" ,"18", "19", "20", "21", "22", "23", "24"];
const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const setLesson = (lessons, time, weekday) => {
  let lesson = lessons?.find((les) => les.time === `${time}:00:00` && les.weekday === weekday)
  return (
    <>
        {
          lesson ? 
          <div className='lesson_block' id={lesson.id}>
            <p id={lesson.id}>{lesson.name_of_user}</p>
            <p id={lesson.id}><b id={lesson.id}>{lesson.accepted ? "accepted" : "not accepted"}</b></p>
          </div>
          :
          <></>
        }
    </>
  )
}

const container = {
  margin: '0 auto',
  width: '90%',
  padding: '50px 70px',
}

const table_style = {
  width: '100%',
}

const ScheduleTeachers = () => {
  const { getSchedule, schedule } = useSchedule();
  const [showInps, setShowInps] = useState(false);
  const [dayInfo, setDayInfo] = useState({});
  
  useEffect(() => {
    getSchedule();
  }, [])

  console.log(schedule)
  
  return (
    <div style={container}>
      <table style={table_style} className="table_schedule">
        <tbody>
          <tr>
            <th>GMT+3</th>
            <th className={getWeekDay() == 'Monday' ? 'today-active' : ''}>Mon</th>
            <th className={getWeekDay() == 'Tuesday' ? 'today-active' : ''}>Tue</th>
            <th className={getWeekDay() == 'Wendesday' ? 'today-active' : ''}>Wed</th>
            <th className={getWeekDay() == 'Thursday' ? 'today-active' : ''}>Thu</th>
            <th className={getWeekDay() == 'Friday' ? 'today-active' : ''}>Fri</th>
            <th className={getWeekDay() == 'Saturday' ? 'today-active' : ''}>Sat</th>
            <th className={getWeekDay() == 'Sunday' ? 'today-active' : ''}>Sun</th>
          </tr>
        {
          rows.map((row, index) => (
            <tr key={index}>
              <td onClick={()=>setShowInps(!showInps)}>{`${row}:00`}</td>
              {
                weekdays.map((weekday, index) => (
                  <td key={index} onClick={(e)=>{
                    setShowInps(!showInps)
                    setDayInfo({weekday, time: `${row}:00`})
                    if(e.target.tagName !== "TD"){
                      setDayInfo({...dayInfo, filled: true, id: e.target.id})
                    }
                  }}>{setLesson(schedule, row, weekday)}</td>
                  ))
                }
            </tr>
          ))
        }
        </tbody>
      </table>
      {
        showInps ?
        <AddSchedule setShowInps={setShowInps} info={dayInfo} />
        :
        <></>
      }
    </div>
  );
};

export default ScheduleTeachers;