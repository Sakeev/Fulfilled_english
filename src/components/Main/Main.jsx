import React, { useEffect, useState } from 'react'

import TeacherMain from './TeacherMain/TeacherMain'
import StudentMain from './StudentMain/StudentMain'
import styles from './Main.module.scss'
import { useAuth } from 'contexts/AuthContextProvider'
import StartLesson from './StartLesson/StartLesson'
import api from 'http'
import { SCHEDULE_API } from 'helpers/consts'
import { useClassWork } from 'contexts/ClassWorkContextProvider'

const Main = () => {
    const { isTeacher } = useAuth()
    const [nextLesson, setNextLesson] = useState(null)
    const [isLessonStart, setIsLessonStart] = useState(false)

    const { getRoom } = useClassWork()
    const getUpcomingLessons = () => {
        api.get(SCHEDULE_API).then((res) => {
            const currentTime = new Date()
            let data = res.data
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
        getRoom()
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
                        {isTeacher ? <TeacherMain /> : <StudentMain />}
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
