import React from 'react'

function ScheduleWindow({lesson}) {
  return (
    <div className="lesson_block" id={lesson.id}>
        <div>
          {/* <img className='lesson_block__settings' src="/images/Ellipsis.png" alt="..." /> */}
          <img className='lesson_block__avatar' src="https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=900&q=88&f=033839230865952d5752c6a9e0e4d606" alt="avatar" />
          <p id={lesson.id} className='lesson_block__name'>{lesson.name_of_user}</p>
        </div>
        <p id={lesson.id} className='lesson_block__time'>
            <b>{lesson?.time?.split(":")?.splice(0, 2).join(":")}</b>
        </p>
    </div>
  )
}

export default ScheduleWindow