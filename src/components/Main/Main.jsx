import React, { useEffect, useState } from "react";

import TeacherMain from "./TeacherMain/TeacherMain";
import StudentMain from "./StudentMain/StudentMain";
import styles from "./Main.module.scss";
import { useAuth } from "contexts/AuthContextProvider";
import StartLesson from "./StartLesson/StartLesson";
import api from "http";
import { SCHEDULE_API } from "helpers/consts";

const Main = () => {
  const { isTeacher } = useAuth();
  const [nextLesson, setNextLesson] = useState(null);
  const getUpcomingLessons = () => {
    api.get(SCHEDULE_API).then((res) => {
      let data = res.data;
      data.sort((a, b) => a.weekday - b.weekday);
      if (data.length > 0) {
        const date = new Date(`${data[0].date}T${data[0].time}`);
        setNextLesson(date);
      }
    });
  };

  useEffect(() => {
    getUpcomingLessons();
  }, []);

  return (
    <>
      <div className={styles.main}>
        {nextLesson && (
          <StartLesson
            isTeacher={isTeacher}
            styles={styles}
            startTime={nextLesson}
          />
        )}

        {isTeacher ? <TeacherMain /> : <StudentMain />}
      </div>
    </>
  );
};

export default Main;
