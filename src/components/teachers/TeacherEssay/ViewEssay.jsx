import { useEssay } from '../../../contexts/EssayContextProvider';
import { useAuth } from '../../../contexts/AuthContextProvider';
import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../../http';

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

const ViewEssay = () => {
    const { getEssay, essay, getStudent, student, updateEssay } = useEssay();
    const { userId, isTeacher, user } = useAuth();
    const [teacherEssayText, setTeacherEssayText] = useState('');
    const params = useParams();

    useEffect(() => {
        getEssay(params.essayId);
        getStudent(localStorage.getItem('studentId'));
    }, []);

    useEffect(() => {
        setTeacherEssayText(essay.text);
    }, [essay]);

    const sendEssay = async () => {
        // await api.patch(`${API}room/essa/${essay.id}/`, data);
        // getEssay();
    };

    if (!essay.id) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="view-essay">
            <Box
                sx={{
                    width: '80%',
                    margin: '3rem auto 0',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <h2 className="view-essay-h2">Theme: {essay.title}</h2>
                <p className="view-essay-p">
                    <span>Student email:</span> {student.email}
                </p>
                <p className="view-essay-p">
                    <span>Student username:</span> {student.username}
                </p>
                <p className="view-essay-p">
                    <span>Description:</span> {essay.description}
                </p>
                <div className="essay-view-textareas">
                    <textarea
                        className={essay.accepted ? 'unactive' : ''}
                        readOnly={essay.accepted}
                        value={essay.text}
                    />
                    <textarea
                        onChange={(e) => setTeacherEssayText(e.target.value)}
                        value={teacherEssayText}
                    />
                </div>
                <Button
                    onClick={() => {
                        updateEssay(essay.id, {
                            teacher_text: teacherEssayText,
                            checked: true,
                        });
                    }}
                    sx={{ ...btnStyle }}
                >
                    {essay.checked ? 'essay have sent back' : 'send back'}
                </Button>
            </Box>
        </div>
    );
};

export default ViewEssay;
