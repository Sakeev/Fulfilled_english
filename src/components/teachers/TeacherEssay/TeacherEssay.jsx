import { Button } from '@mui/material';
import { useState } from 'react';
import { useEssay } from '../../../contexts/EssayContextProvider';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContextProvider';
import correct from '../../../assets/images/correct.png';
import incorrect from '../../../assets/images/cross.png';

import './TeacherEssay.css';
import EditEssayTitle from './EditEssayTitle';

const btnStyle = {
    margin: '10px 5px',
    backgroundColor: '#9bd0cb',
    color: '#006D77',
    textTransform: 'upper',
    '&:hover': {
        backgroundColor: '#006D77',
        color: '#9bd0cb',
    },
};

const TeacherEssay = () => {
    const [editTitle, setEditTitle] = useState(false);
    const [editTitleId, setEditTitleId] = useState(null);
    const [essayTitle, setEssayTitle] = useState('');

    const { students, getStudentEssay, loading } = useEssay();
    const { userId } = useAuth();

    const essayTitleObj = {
        editTitle,
        setEditTitle,
        editTitleId,
        setEditTitleId,
        essayTitle,
        setEssayTitle,
    };

    if (loading) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="essay-container">
            <div className="essay-headers">
                <h2>Students list</h2>
            </div>
            <div className="essay-columns">
                <p>Email:</p>
                <p>Essay theme:</p>
                <p>Deadline:</p>
                <p>Status:</p>
            </div>
            {!students.length && <h2>You haven't students yet</h2>}
            <ul className="essay-students-list">
                {students.map((student, index) => (
                    <li className="essay-student" key={index}>
                        <div
                            className="essay-student-info"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <p>{student.email}</p>
                            <EditEssayTitle
                                essayTitleObj={essayTitleObj}
                                student={student}
                                index={index}
                            />
                            <p>{getStudentEssay(student.id).deadline}</p>
                            <div className="essay-icon">
                                <img
                                    src={
                                        getStudentEssay(student.id).text.length
                                            ? correct
                                            : incorrect
                                    }
                                />
                            </div>
                        </div>
                        <Button
                            disabled={!getStudentEssay(student.id).text.length}
                            sx={{
                                ...btnStyle,
                                width: 'auto',
                                whiteSpace: 'nowrap',
                                marginRight: '5%',
                            }}
                            onClick={() => {
                                if (getStudentEssay(student.id).text.length) {
                                    localStorage.setItem(
                                        'studentId',
                                        student.id
                                    );
                                }
                            }}
                        >
                            <Link
                                to={
                                    getStudentEssay(student.id).text.length
                                        ? `/essay/view/${
                                              getStudentEssay(student.id).id
                                          }`
                                        : `/essay/send/${userId}`
                                }
                            >
                                {getStudentEssay(student.id).text.length
                                    ? 'view essay'
                                    : 'essay have sent'}
                            </Link>
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherEssay;
