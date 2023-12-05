import { useEffect, useState } from 'react'
import { useUsers } from 'contexts/UsersContextProvider'
import { capitalize, isTeacher, lvlcheck } from 'helpers/funcs'
import { API } from 'helpers/consts'

import styles from './Profile.module.scss'

const Profile = () => {
    const { user, studentProgress, getUserAndProgress, updateAvatar } =
        useUsers()
    const [avatar, setAvatar] = useState(null)

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

    const handleAvatar = (e) => {
        setAvatar(e.target.files[0])
    }
    console.log(user)
    return (
        <div className={styles.profileContainer}>
            <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                    <img src={`${API}${user.avatar}`} alt="user" />
                    <div className={styles.overlay}>
                        {/* <span >Edit</span> */}
                        <label
                            className={styles.cameraIcon}
                            htmlFor="avatarEditBtn"
                        >
                            Edit
                            <input
                                id="avatarEditBtn"
                                type="file"
                                className={styles.inputFile}
                                onChange={handleAvatar}
                            />
                        </label>
                        {avatar ? (
                            <p
                                onClick={() =>
                                    updateAvatar(avatar, studentProgress)
                                }
                            >
                                upload
                            </p>
                        ) : null}
                    </div>
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
                <div className={styles.hobby}>
                    <p>Interest and Hobby's</p>
                    <ul className={styles.hobbysList}>
                        {user.hobby &&
                            user?.hobby.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                    </ul>
                </div>
                <div className={styles.aboutMe}>
                    <p>About</p>
                    <p className={styles.about}>{user.about}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile
