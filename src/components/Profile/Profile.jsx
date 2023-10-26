import { useEffect } from 'react';
import { useUsers } from 'contexts/UsersContextProvider';
import { capitalize, isTeacher } from 'helpers/funcs';
import { API } from 'helpers/consts';

import styles from './Profile.module.scss';

const Profile = () => {
    const {
        user,
        studentProgress,
        getStudentProgress,
        getUser,
        getUserAndProgress,
    } = useUsers();

    useEffect(() => {
        // getStudentProgress();
        // getUser();
        getUserAndProgress();
    }, []);

    const getPercents = () => {
        return Math.round(
            (100 / studentProgress.lessons.length) *
                studentProgress.progres_classwork
        );
    };

    console.log(studentProgress);
    console.log(user);

    if (!user) return <></>;

    return (
        <div className={styles.profileContainer}>
            <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                    <img src={`${API}${user.avatar}`} alt="user" />
                </div>
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
                            Level:{' '}
                            <span>{capitalize(studentProgress.level)}</span>
                        </p>
                        {!isTeacher() && (
                            <div className={styles.studentProgress}>
                                <span>Progress</span>
                                <div className={styles.progress}>
                                    <span className={styles.percent}>
                                        {getPercents()}%
                                    </span>
                                    <div
                                        className={styles.progressBar}
                                        style={{ width: getPercents() + '%' }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
