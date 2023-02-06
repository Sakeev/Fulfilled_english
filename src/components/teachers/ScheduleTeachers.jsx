import React, { useEffect, useState } from 'react';
import { useSchedule } from '../../contexts/ScheduleContextProvider';
import AddSchedule from './AddSchedule';
import "./Schedule.css"

const rows = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ,18, 19, 20, 21, 22, 23, 24];

const schedule_test = [
  {
    time: '8:00',
    weekday: 'Monday',
    student: 'David Ghetto',
    credits: 9,
  },
  {
    time: '17:00',
    weekday: 'Monday',
    student: 'Salomon Peters',
    credits: 7,
  },
  {
    time: '9:00',
    weekday: 'Tuesday',
    student: 'Magnus Skewer',
    credits: 88,
  },
  {
    time: '11:00',
    weekday: 'Wendesday',
    student: 'Ronaldo SUII',
    credits: 77,
  },
  {
    time: '20:00',
    weekday: 'Friday',
    student: 'David Guetta',
    credits: 121,
  }
]


const setLesson = (lessons = schedule_test, time, weekday) => {
  let lesson = lessons.find((les) => les.time === `${time}:00` && les.weekday === weekday)
  return (
    <>
        { 
          lesson ? 
          <div className='lesson_block'>
            <p>{lesson.student}</p>
            <p>credits: <b>{lesson.credits}</b></p>
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
  const [showInps, setShowInps] = useState(false)

  useEffect(() => {
    getSchedule();
  }, [])

  console.log(schedule)
  
  return (
    <div style={container}>
      <table style={table_style} className="table_schedule">
        <tr>
          <th>GMT+3</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
        </tr>
        {
          rows.map((row, index) => (
            <tr key={index}>
              <td onClick={()=>setShowInps(!showInps)}>{`${row}:00`}</td>
              <td onClick={()=>setShowInps(!showInps)}>{setLesson(schedule_test, row, 'Monday')}</td>
              <td onClick={()=>setShowInps(!showInps)}>{setLesson(schedule_test, row, 'Tuesday')}</td>
              <td onClick={()=>setShowInps(!showInps)}>{setLesson(schedule_test, row, 'Wendesday')}</td>
              <td onClick={()=>setShowInps(!showInps)}>{setLesson(schedule_test, row, 'Thursday')}</td>
              <td onClick={()=>setShowInps(!showInps)}>{setLesson(schedule_test, row, 'Friday')}</td>
              <td onClick={()=>setShowInps(!showInps)}>{setLesson(schedule_test, row, 'Saturday')}</td>
              <td onClick={()=>setShowInps(!showInps)}>{setLesson(schedule_test, row, 'Sunday')}</td>
            </tr>
          ))
        }
      </table>
      {
        showInps ?
        <AddSchedule setShowInps={setShowInps} />
        :
        <></>
      }
    </div>
  );
};

export default ScheduleTeachers;