import { useUsers } from 'contexts/UsersContextProvider';
import { useTasks } from 'contexts/TasksContextProvider';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'components/ui';
import { useEffect, useState } from 'react';

import styles from './HWStudentList.module.scss';

const HWStudentList = () => {
    const { getStudents, students } = useUsers();
    const { getStudentLessons, studentsLessons, loading } = useTasks();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [student, setStudent] = useState(null);

    useEffect(() => {
        getStudents();
    }, []);

    const handleChange = (event, userId) => {
        const caseId = event.target.value;

        if (caseId) navigate(`/student-tasks/${userId}/results/${caseId}`);
    };

    const onView = (student) => {
        setShowModal(true);
        getStudentLessons(student.id);
        setStudent(student);
    };

    return (
        <div className={styles.studentListContainer}>
            <div className={styles.header}>
                <h2>Students list</h2>
            </div>
            <div className={styles.studentListWrapper}>
                <div className={`${styles.student} ${styles.listHeader}`}>
                    <div className={styles.studentImg}></div>
                    <div className={styles.studentInfo}>
                        <span>Name:</span>
                        <span>Email:</span>
                    </div>
                    <Button className={styles.viewBtn}>view h/w</Button>
                </div>
                <ul className={styles.studentList}>
                    {students.map((student, key) => (
                        <li className={styles.student} key={key}>
                            <div className={styles.studentImg}>
                                <img src={student.avatar} alt="student" />
                            </div>
                            <div className={styles.studentInfo}>
                                <span>{student.first_name}</span>
                                <span>{student.email}</span>
                            </div>
                            <Button
                                className={styles.viewBtn}
                                onClick={() => onView(student)}
                            >
                                view h/w
                            </Button>
                        </li>
                    ))}
                </ul>
                <Modal useStateHook={[showModal, setShowModal]}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.modalHeader}>Home works</h2>
                        <div className={styles.selectLessonWrapper}>
                            {studentsLessons.length > 0 && !loading ? (
                                <>
                                    <label htmlFor="lessons">
                                        Choose a lesson:
                                    </label>
                                    <select
                                        className={styles.selectLesson}
                                        name="lessons"
                                        onChange={(event) =>
                                            handleChange(event, student.id)
                                        }
                                    >
                                        <option value="-" defaultChecked>
                                            -
                                        </option>
                                        {studentsLessons.map(
                                            (lesson, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={
                                                            lesson.case_tasks[0]
                                                                ?.id
                                                        }
                                                    >
                                                        {lesson.title}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </>
                            ) : (
                                <p>There are no lessons</p>
                            )}
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default HWStudentList;
