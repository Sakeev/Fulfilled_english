import { Button, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useEssay } from '../../../contexts/EssayContextProvider';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContextProvider';
import correct from '../../../assets/images/correct.png';
import incorrect from '../../../assets/images/cross.png';
import EditIcon from '@mui/icons-material/Edit';

import './TeacherEssay.css';

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
    const [studentsWithoutEssay, setStudentsWithoutEssay] = useState([]);
    const [editTitle, setEditTitle] = useState(false);
    const [editTitleId, setEditTitleId] = useState(null);
    const [essayTitle, setEssayTitle] = useState('');
    const { students, essays, getStudents, getEssays } = useEssay();
    const { userId } = useAuth();

    useEffect(() => {
        // getStudents();
        // getEssays();
    }, []);

    const getStudentEssay = (id) => {
        const studentEssay = essays.filter((essay) => essay.student === id);
        const noEssay = { title: 'No essay', deadline: '-', text: '' };

        if (studentEssay.length) return studentEssay[0];
        else return noEssay;
    };

    const onClickEditIcon = (studentId, index) => {
        if (editTitle && index === editTitleId) {
            setEditTitle(false);
            console.log(essayTitle);
        } else if (!editTitle) {
            setEditTitle(true);
            setEditTitleId(index);
            setEssayTitle(getStudentEssay(studentId).title);
        } else {
            setEditTitle(false);
            setEditTitleId(null);
            setEssayTitle('');
        }
    };

    // console.log(students);

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
                            <div>
                                {/* <p> */}
                                <TextField
                                    onChange={(e) =>
                                        setEssayTitle(e.target.value)
                                    }
                                    disabled={
                                        !(editTitle && index === editTitleId)
                                    }
                                    variant="standard"
                                    value={
                                        editTitle && index === editTitleId
                                            ? essayTitle
                                            : getStudentEssay(student.id).title
                                    }
                                />

                                <IconButton
                                    onClick={() =>
                                        onClickEditIcon(student.id, index)
                                    }
                                    color={
                                        editTitle && index === editTitleId
                                            ? 'primary'
                                            : ''
                                    }
                                    sx={{ marginLeft: '0.25em' }}
                                >
                                    <EditIcon fontSize="inherit" />
                                </IconButton>
                                {/* </p> */}
                            </div>
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
                        <Link
                            to={
                                getStudentEssay(student.id).text.length
                                    ? `/essay/view/${
                                          getStudentEssay(student.id).id
                                      }`
                                    : `/essay/send/${userId}`
                            }
                        >
                            <Button
                                sx={{
                                    ...btnStyle,
                                    width: 'auto',
                                    whiteSpace: 'nowrap',
                                    marginRight: '5%',
                                }}
                            >
                                {getStudentEssay(student.id).text.length
                                    ? 'view essay'
                                    : 'send essay'}
                            </Button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherEssay;
