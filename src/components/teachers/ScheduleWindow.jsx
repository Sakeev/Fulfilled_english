import { API } from "helpers/consts";
import React from "react";

function ScheduleWindow({ lesson, length }) {
  return (
    <div
      className="lesson_block"
      id={lesson.id}
      style={{ height: 100 / length + "%" }}
    >
      <div>
        {/* <img className='lesson_block__settings' src="/images/Ellipsis.png" alt="..." /> */}
        <img
          className="lesson_block__avatar"
          src={API + lesson.user.avatar}
          alt="avatar"
        />
        <p id={lesson.id} className="lesson_block__name">
          {lesson.user.first_name}
        </p>
      </div>
      <p id={lesson.id} className="lesson_block__time">
        <b>{lesson?.time?.split(":")?.splice(0, 2).join(":")}</b>
      </p>
    </div>
  );
}

export default ScheduleWindow;
