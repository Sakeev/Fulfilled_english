import { useEffect } from 'react'
import { useUsers } from 'contexts/UsersContextProvider'
import { capitalize, isTeacher, lvlcheck } from 'helpers/funcs'
import { API } from 'helpers/consts'

import styles from './Profile.module.scss'

const Profile = () => {
    const { user, studentProgress, getUserAndProgress } = useUsers()

    useEffect(() => {
        getUserAndProgress()
    }, [])

    const getPercents = () => {
        return Math.round(
            (100 / studentProgress.lessons.length) *
                studentProgress.progress_classwork
        )
    }

    if (!user) return <></>

    const { logo, level } = lvlcheck(studentProgress.level)

    return (
        <div className={styles.profileContainer}>
            <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                    <img src={`${API}${user.avatar}`} alt="user" />
                </div>
                <div className={styles.userInfoCardWrapper}>
                    <div className={styles.userInfoCard}>
                        <div className={styles.userFullName}>
                            <h2>
                                {user.first_name} {user.last_name}
                            </h2>
                            <span>{isTeacher() ? 'Teacher' : 'Student'}</span>
                        </div>
                        <div className={styles.courseInfo}>
                            <p>
                                Email: <span>{user.email}</span>
                            </p>
                            <p>
                                Phone number: <span>{user.phone_number}</span>
                            </p>
                            {!isTeacher() && (
                                <p>
                                    Payment left:{' '}
                                    <span>{studentProgress.payment}</span>
                                </p>
                            )}
                            {!isTeacher() && (
                                <div className={styles.studentProgress}>
                                    <span>Progress</span>
                                    <div className={styles.progress}>
                                        <span className={styles.percent}>
                                            {getPercents()}%
                                        </span>
                                        <div
                                            className={styles.progressBar}
                                            style={{
                                                width: getPercents() + '%',
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.level}>
                        <p>
                            Level: <span>{level}</span>
                        </p>
                        <div className={styles.emblem}>
                            <img src={logo} alt="level" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.userHobby}>
                <p>Interest and Hobby's</p>
                <ul className={styles.hobbysList}>
                    {studentProgress.user?.hobby.map((item) => (
                        <li>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Profile
