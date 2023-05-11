import ProgressModal from '../ProgressModal/ProgressModal';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

import './StudentsList.css';
import { useAuth } from '../../../contexts/AuthContextProvider';

const StudentsList = () => {
    // const { students } = useEssay();
    const { isTeacher, getRoomOrRooms } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [studentRooms, setStudentRooms] = useState([]);

    useEffect(() => {
        getRoomOrRooms()
            .then((res) => {
                console.log(res);
                setStudentRooms(res);
            })
            .catch((err) => console.log(err));
    }, [isTeacher]);

    // const studentProgress = Math.round(
    //     (100 / progress.lessonsQuantity) * progress.passedLessons
    // );

    const onReviewHomeworks = (room) => {
        setShowModal(true);
        setCurrentRoom(room);
    };

    if (studentRooms.length === undefined)
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>;
            </div>
        );

    return (
        <>
            {showModal && (
                <ProgressModal room={currentRoom} setShowModal={setShowModal} />
            )}
            <div className="sl-container">
                <div className="sl-headers">
                    <h2 style={{ width: '40%' }}>Students</h2>
                    <h2>Progress</h2>
                </div>
                {studentRooms?.map((room, index) => {
                    const studentProgress = Math.round(
                        (100 / room.count_lessons) * room.progres_classwork
                    );

                    return (
                        <div className="sl-student-row" key={index}>
                            <div className="sl-element-wrapper">
                                <p>{room.user.email}</p>
                            </div>
                            <div className="sl-element-wrapper">
                                <div className="sl-progress-bar">
                                    <span>{studentProgress} %</span>
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: `${studentProgress}%`,
                                            height: '100%',
                                            backgroundColor: '#E29578',
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className="sl-element-wrapper">
                                <Button onClick={() => onReviewHomeworks(room)}>
                                    Review homeworks
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default StudentsList;
