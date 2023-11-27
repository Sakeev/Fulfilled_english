import { formatText, lvlcheck } from 'helpers/funcs'
import React, { useEffect, useState } from 'react'
import clip from '../assets/clip.svg'
import profileImg from '../assets/profile-img.svg'
import ProgressBar from './ProgressBar'
import styles from './StudentMain.module.scss'
import { useClassWork } from 'contexts/ClassWorkContextProvider'
import { useSchedule } from 'contexts/ScheduleContextProvider'
import { useUsers } from 'contexts/UsersContextProvider'
import { useNavigate } from 'react-router-dom'
import { API } from 'helpers/consts'

const StudentMain = () => {
    const { getNotes, notes } = useClassWork()
    const { hwstudents, getUsers, teacherInfo, getTeacher } = useUsers()
    const { getSchedule, schedule } = useSchedule()

    const navigate = useNavigate()
    useEffect(() => {
        getNotes()
        getUsers()
        getTeacher()
        getSchedule()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Для определения уровня и прогресса
    const [progress, setProgress] = useState(0)

    const { logo, level } = lvlcheck(hwstudents[0]?.level)

    //   __html:
    useEffect(() => {
        setProgress(
            hwstudents[0]
                ? (hwstudents[0].progress_classwork * 100) /
                      hwstudents[0].lessons.length
                : 0
        )
    }, [hwstudents])

    const currentDate = new Date()

    return (
        <div className={styles.student}>
            <div className={styles.userinfo}>
                <div className={styles.progress}>
                    <div className={styles.animation}>
                        <h3>Progress</h3>
                        <ProgressBar
                            progress={progress}
                            size={130}
                            strokeWidth={20}
                            circleOneStroke="#E29578"
                            circleTwoStroke="#83c5be"
                        />
                    </div>
                    <div className={styles.level}>
                        <h3>Level</h3>
                        <div className={styles.levelicon}>
                            <img
                                src={logo}
                                alt="logo"
                                className={styles.levelimg}
                            />
                            <p className={styles.leveltext}>{level}</p>
                        </div>
                    </div>
                </div>
                <div
                    className={styles.profile}
                    onClick={() => {
                        navigate('/profile')
                    }}
                >
                    <img
                        src={
                            (teacherInfo.avatar && API + teacherInfo.avatar) ||
                            profileImg
                        }
                        alt="profile"
                        className={styles.profileimg}
                    />
                    <h4>{`${teacherInfo.first_name} ${teacherInfo.last_name}`}</h4>
                    <div className={styles.classes}>
                        <h4 className={styles.classestext}>
                            Classes left: {hwstudents[0]?.payment}
                        </h4>
                    </div>
                </div>
            </div>
            <div className={styles.scheduleblock}>
                <div className={styles.notes}>
                    <div className={styles.head}>
                        <h3>Notes</h3>
                    </div>
                    {notes.length > 0 ? (
                        <div
                            className={styles.note}
                            onClick={() => {
                                navigate('/notes')
                            }}
                        >
                            <span>
                                Lesson{' '}
                                {notes.sort((a, b) => b.id - a.id)[0]?.lesson}
                            </span>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: formatText(notes[0]),
                                }}
                            ></p>
                        </div>
                    ) : (
                        <div className={styles.message}>
                            <span>You don't have any notes</span>
                        </div>
                    )}
                </div>
                <div className={styles.schedule}>
                    <div className={styles.head}>
                        <h3>Schedule</h3>
                    </div>
                    <div className={styles.schedulebox}>
                        {schedule
                            .filter((item) => {
                                const itemDate = new Date(
                                    `${item.date}T${item.time}`
                                )
                                return itemDate >= currentDate
                            })
                            .map((onepoint, key) => {
                                //date
                                const date = onepoint.date.split('-')
                                const day = date[2]
                                const month = new Date(
                                    2000,
                                    date[1] - 1,
                                    1
                                ).toLocaleString('en-US', { month: 'short' })
                                //time
                                const time = onepoint.time.split(':')
                                const hour = time[0]
                                const min = time[1]

                                return (
                                    <div
                                        className={styles.onepoint}
                                        onClick={() => {
                                            navigate('/schedule')
                                        }}
                                        key={key}
                                    >
                                        <div className={styles.clipbox}>
                                            <img
                                                src={clip}
                                                alt="clip"
                                                className={styles.clipimg}
                                            />
                                            <div>
                                                <p className={styles.teacher}>
                                                    Teacher:
                                                </p>
                                                <p className={styles.name}>
                                                    Ten Maksim
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className={styles.lesson}>
                                                lesson #{onepoint.lesson}
                                            </p>
                                            <p className={styles.time}>
                                                {`${day} ${month} ${hour}:${min}`}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentMain
