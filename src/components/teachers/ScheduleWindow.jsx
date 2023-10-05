import React from 'react'

function ScheduleWindow({lesson}) {
  console.log(lesson)
  return (
    <div className="lesson_block" id={lesson.id}>
        <p id={lesson.id}>{lesson.user}</p>
        <p id={lesson.id} className='lesson_block__time'>
            <b>{lesson?.time?.split(":")?.splice(0, 2).join(":")}</b>
        </p>
    </div>
  )
}

export default ScheduleWindow