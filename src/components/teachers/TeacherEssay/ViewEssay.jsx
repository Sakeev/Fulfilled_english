import { useEssay } from '../../../contexts/EssayContextProvider';
import { useAuth } from '../../../contexts/AuthContextProvider';
import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import checked from '../../../assets/images/correct.png';
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
    const { getEssay, essay, getStudent, student, updateEssay, loading } =
        useEssay();
    const { userId, isTeacher, user } = useAuth();
    const [teacherEssayText, setTeacherEssayText] = useState('');
    const [saved, setSaved] = useState(false);
    const params = useParams();

    useEffect(() => {
        getEssay(params.essayId);
        getStudent(localStorage.getItem('studentId'));
    }, []);

    useEffect(() => {
        if (essay.teacher_text) {
            setTeacherEssayText(essay.teacher_text);
        } else {
            setTeacherEssayText(essay.text);
        }
    }, [essay]);

    const sendEssay = async () => {
        // await api.patch(`${API}room/essa/${essay.id}/`, data);
        // getEssay();
    };

    console.log(essay.checked);

    if (loading) {
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
                    <div className="essay-view-textarea">
                        <p>Student version</p>
                        <textarea
                            className={essay.accepted ? 'unactive' : ''}
                            readOnly={essay.accepted}
                            value={essay.text}
                        />
                    </div>
                    <div className="essay-view-textarea">
                        <p>Teacher version</p>
                        <textarea
                            onChange={(e) =>
                                setTeacherEssayText(e.target.value)
                            }
                            value={teacherEssayText}
                            className={essay.checked ? 'unactive' : ''}
                        />
                    </div>
                </div>
                <div className="view-essay-btns">
                    <Button
                        onClick={() => {
                            updateEssay(essay.id, {
                                teacher_text: teacherEssayText,
                                checked: true,
                            });
                        }}
                        disabled={essay.checked}
                        sx={{ ...btnStyle }}
                    >
                        {essay.checked ? 'essay have sent back' : 'send back'}
                    </Button>
                    {!essay.checked ? (
                        <Button
                            onClick={() => {
                                setSaved(true);
                                updateEssay(essay.id, {
                                    teacher_text: teacherEssayText,
                                });
                            }}
                            sx={{ ...btnStyle }}
                        >
                            {saved ? 'saved!' : 'save edited essay'}
                        </Button>
                    ) : (
                        <img src={checked} />
                    )}
                </div>
            </Box>
        </div>
    );
};

export default ViewEssay;
