import React, { useEffect } from 'react'
import studentsProfile from '../assets/students-profile.svg'
import clip from '../assets/clip.svg'
import profileImg from '../assets/profile-img.svg'
import styles from './TeacherMain.module.scss'
import { useClassWork } from 'contexts/ClassWorkContextProvider'
import logoBeginner from 'assets/images/logo-beginner.svg'
import logoElementary from 'assets/images/logo-elementary.svg'
import logoPre from 'assets/images/logo-pre.svg'
import logoInterm from 'assets/images/logo-interm.svg'
import logoUpper from 'assets/images/logo-upper.svg'
import logoAdv from 'assets/images/logo-adv.svg'
import { useUsers } from 'contexts/UsersContextProvider'
import { useNavigate } from 'react-router-dom'
import { API } from 'helpers/consts'

const TeacherMain = ({ currentTime, schedule }) => {
    const { getLessonCounter, lessonCounter } = useClassWork()
    const { getNotes } = useClassWork()
    const { hwstudents, getUsers, teacherInfo, getTeacher } = useUsers()

    const navigate = useNavigate()

    useEffect(() => {
        getNotes()
        getUsers()
        getTeacher()
        getLessonCounter()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function lvlcheck(lvl) {
        switch (lvl) {
            case 'beginner':
                return (
                    <img
                        src={logoBeginner}
                        alt="level"
                        className={styles.level}
                    />
                )
            case 'elementary':
                return (
                    <img
                        src={logoElementary}
                        alt="level"
                        className={styles.level}
                    />
                )
            case 'pre-intermediate':
                return (
                    <img src={logoPre} alt="level" className={styles.level} />
                )
            case 'intermediate':
                return (
                    <img
                        src={logoInterm}
                        alt="level"
                        className={styles.level}
                    />
                )
            case 'upper-intermediate':
                return (
                    <img src={logoUpper} alt="level" className={styles.level} />
                )
            case 'advanced':
                return (
                    <img src={logoAdv} alt="level" className={styles.level} />
                )
            default:
                return
        }
    }

    return (
        <div className={styles.teacher}>
            <div className={styles.content}>
                <div className={styles.left}>
                    {/* schedule */}
                    <div className={styles.head}>
                        <h3>Schedule</h3>
                    </div>
                    <div className={styles.schedule}>
                        {schedule
                            .filter((item) => {
                                const itemDate = new Date(
                                    `${item.date}T${item.time}`
                                )
                                return itemDate >= currentTime
                            })
                            .sort(
                                (a, b) =>
                                    new Date(`${a.date}T${a.time}`) -
                                    new Date(`${b.date}T${b.time}`)
                            )
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
                                                <p
                                                    className={
                                                        styles.studentname
                                                    }
                                                >
                                                    {onepoint.user.first_name +
                                                        ' ' +
                                                        onepoint.user.last_name}
                                                </p>
                                                <p
                                                    className={styles.date}
                                                >{`${day} ${month}`}</p>
                                            </div>
                                        </div>
                                        <div className={styles.lessontime}>
                                            <p className={styles.lesson}>
                                                {onepoint.lesson} lesson
                                            </p>
                                            <p className={styles.time}>
                                                {hour}:{min}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className={styles.right}>
                    {/* profile */}
                    <div className={styles.profile}>
                        <div
                            className={styles.profileblock}
                            onClick={() => {
                                navigate('/profile')
                            }}
                        >
                            <img
                                src={
                                    (teacherInfo.avatar &&
                                        API + teacherInfo.avatar) ||
                                    profileImg
                                }
                                alt="profile"
                                className={styles.logo}
                            />
                            <h4>{`${teacherInfo.first_name} ${teacherInfo.last_name}`}</h4>
                        </div>
                        <div className={styles.classes}>
                            <h5 className={styles.text}>
                                Successfull classes: {lessonCounter}
                            </h5>
                        </div>
                    </div>
                    {/* students */}
                    <div className={styles.students}>
                        <div className={styles.head}>
                            <h3>Students</h3>
                        </div>
                        <div className={styles.block}>
                            {hwstudents.map((student, key) => (
                                <div key={key} className={styles.onestudent}>
                                    <div className={styles.studentleft}>
                                        <img
                                            src={
                                                (student.user.avatar &&
                                                    API +
                                                        student.user.avatar) ||
                                                studentsProfile
                                            }
                                            alt="level"
                                            className={styles.icon}
                                        />
                                        <p className={styles.studentname}>
                                            {student?.user.first_name}
                                        </p>
                                        {lvlcheck(student.level)}
                                    </div>
                                    <p
                                        style={{
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {student.lessons_left} lessons
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherMain
