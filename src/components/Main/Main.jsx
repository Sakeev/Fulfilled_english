import React, { useEffect, useState } from 'react'

import TeacherMain from './TeacherMain/TeacherMain'
import StudentMain from './StudentMain/StudentMain'
import styles from './Main.module.scss'
import { useAuth } from 'contexts/AuthContextProvider'
import StartLesson from './StartLesson/StartLesson'
import api from 'http'
import { SCHEDULE_API } from 'helpers/consts'
import { useSchedule } from 'contexts/ScheduleContextProvider'

const Main = () => {
    const { isTeacher } = useAuth()
    const { schedule, setSchedule } = useSchedule()

    const [nextLesson, setNextLesson] = useState(null)
    const [isLessonStart, setIsLessonStart] = useState(false)

    const currentTime = new Date(
        new Date().toLocaleString('en-US', {
            timeZone: 'Europe/Moscow',
        })
    )
    const getUpcomingLessons = () => {
        api.get(SCHEDULE_API).then((res) => {
            let data = res.data
            setSchedule(data)

            data.sort(
                (a, b) =>
                    new Date(`${a.date}T${a.time}`).getTime() -
                    new Date(`${b.date}T${b.time}`).getTime()
            )
            data = data.filter((date) => {
                const dateTime = new Date(`${date.date}T${date.time}`) // Создаем объект Date из даты и времени объекта date
                const diffInMinutes = (dateTime - currentTime) / (1000 * 60) // Разница в минутах
                return diffInMinutes >= -50
            })

            if (data.length > 0) {
                const date = new Date(`${data[0].date}T${data[0].time}`)
                setNextLesson(date)
            }
            setIsLessonStart(true)
        })
    }

    useEffect(() => {
        getUpcomingLessons()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className={styles.main}>
                {isLessonStart ? (
                    <>
                        <StartLesson
                            isTeacher={isTeacher}
                            styles={styles}
                            startTime={nextLesson}
                        />
                        {isTeacher ? (
                            <TeacherMain
                                currentTime={currentTime}
                                schedule={schedule}
                            />
                        ) : (
                            <StudentMain
                                currentTime={currentTime}
                                schedule={schedule}
                            />
                        )}
                    </>
                ) : (
                    <div className="loader-wrapper">
                        <div className="loader"></div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Main
