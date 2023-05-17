import { useEssay } from '../../../contexts/EssayContextProvider';
import ProgressModal from '../ProgressModal/ProgressModal';
import { Button } from '@mui/material';
import { useState } from 'react';

import './StudentsList.css';

const StudentsList = () => {
    // const { students } = useEssay();
    const [showModal, setShowModal] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);

    const onReviewHomeworks = (room) => {
        setShowModal(true);
        setCurrentRoom(room);
    };

    const studentRooms = [
        {
            id: 1,
            lessons: [
                'http://35.239.173.63/room/lessons/1/',
                'http://35.239.173.63/room/lessons/2/',
            ],
            level: 'elem',
            progress: 45,
            quantity_taks: 115,
            payment: 0,
            count_lessons: 1,
            user: {
                email: 'student@gmail.com',
                first_name: 'Student',
                last_name: 'Studentovich',
            },
        },
        {
            id: 2,
            lessons: ['http://35.239.173.63/room/lessons/2/'],
            level: 'elem',
            progress: 34,
            quantity_taks: 115,
            payment: 0,
            count_lessons: 1,
            user: {
                email: 'jbarakanov@gmail.com',
                first_name: 'Jaanger',
                last_name: 'Barakanov',
            },
        },
        {
            id: 3,
            lessons: ['http://35.239.173.63/room/lessons/3/'],
            level: 'elem',
            progress: 107,
            quantity_taks: 115,
            payment: 0,
            count_lessons: 1,
            user: {
                email: 'bekovs@gmail.com',
                first_name: 'Bekov',
                last_name: 'Sultan',
            },
        },
    ];

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
                        (100 / room.quantity_taks) * room.progress
                    );

                    return (
                        <div className="sl-student-row" key={index}>
                            <div className="sl-element-wrapper">
                                <p>
                                    {room.user.first_name} {room.user.last_name}
                                </p>
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
