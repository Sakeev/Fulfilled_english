import { useEffect, useState } from 'react';
import { useUsers } from 'contexts/UsersContextProvider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'components/ui';
import { useTasks } from 'contexts/TasksContextProvider';

import styles from './HWStudentList.module.scss';

const selectContainer = {
    margin: '10px 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '5px 0',
    borderRadius: '5px',
};

const HWStudentList = () => {
    const { getStudents, students } = useUsers();
    const { getStudentLessons, studentsLessons } = useTasks();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getStudents();
    }, []);

    const handleChange = (event, userId) => {
        const caseId = event.target.value;

        if (caseId) navigate(`/student-tasks/${userId}/results/${caseId}`);
    };

    const onView = (id) => {
        setShowModal(true);
        getStudentLessons(id);
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
                                onClick={() => onView(student.id)}
                            >
                                view h/w
                            </Button>

                            <Modal useStateHook={[showModal, setShowModal]}>
                                <Box>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                    >
                                        Home works
                                    </Typography>
                                    <div
                                        id="modal-modal-description"
                                        sx={{ mt: 2 }}
                                    >
                                        {studentsLessons.length > 0 ? (
                                            <>
                                                <label
                                                    style={{ marginTop: '5%' }}
                                                    htmlFor="lessons"
                                                >
                                                    Choose a lesson:
                                                </label>
                                                <select
                                                    name="lessons"
                                                    onChange={(event) =>
                                                        handleChange(
                                                            event,
                                                            student.id
                                                        )
                                                    }
                                                    style={selectContainer}
                                                >
                                                    <option
                                                        value="-"
                                                        defaultChecked
                                                    >
                                                        -
                                                    </option>
                                                    {studentsLessons.map(
                                                        (lesson) => {
                                                            return (
                                                                <option
                                                                    key={
                                                                        lesson.id
                                                                    }
                                                                    value={
                                                                        lesson
                                                                            .case_tasks[0]
                                                                            ?.id
                                                                    }
                                                                >
                                                                    {
                                                                        lesson.title
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            </>
                                        ) : (
                                            <Typography>
                                                There are no lessons
                                            </Typography>
                                        )}
                                    </div>
                                </Box>
                            </Modal>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HWStudentList;
