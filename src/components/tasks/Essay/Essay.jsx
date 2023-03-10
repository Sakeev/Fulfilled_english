import { useEssay } from '../../../contexts/EssayContextProvider';
import { useAuth } from '../../../contexts/AuthContextProvider';
import { Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../../http';
import React from 'react';

import noEssay from '../../../assets/images/munara.jpeg';

import './Essay.css';

const API = 'http://35.238.162.84/';

const Essay = () => {
    const [essayText, setEssayText] = useState('');
    const [edit, setEdit] = useState(false);

    const { getEssay, essay } = useEssay();

    useEffect(() => {
        getEssay();
    }, []);

    useEffect(() => {
        setEssayText(essay.text);
    }, [essay]);

    const sendEssay = async () => {
        const data = {
            text: essayText,
            accepted: true,
        };

        await api.patch(`${API}room/essa/${essay.id}/`, data);
        getEssay();
        setEdit(false);
    };

    const onEdit = () => {
        setEdit((prev) => !prev);
    };

    if (!essay.id) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        );
    } else if (essay.id === -1) {
        return (
            <Typography
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#006D77',
                    fontWeight: 'bold',
                    fontSize: '32px',
                    margin: '10% auto 0',
                }}
            >
                Your teacher have not sent essay yet
                <img src={noEssay} alt="no essay" />
            </Typography>
        );
    }

    return (
        <div className="student-essay-wrapper">
            <div className="student-essay">
                <h2>Essay</h2>
                <div className="student-essay-info-text">
                    <div className="student-essay-subject">
                        <span>Subject: </span>
                        <span className="black">{essay.title}</span>
                    </div>
                    <div className="student-essay-status">
                        <span>Status:</span>
                        <span>{essay.checked ? '' : ' not'} checked</span>
                    </div>
                </div>
                <div className="student-essay-textareas">
                    <textarea
                        className={essay.accepted && !edit ? 'unactive' : ''}
                        readOnly={essay.accepted && !edit}
                        onChange={(e) => setEssayText(e.target.value)}
                        value={essayText}
                    ></textarea>
                    {/* {essay.checked && (
                        <textarea
                            readOnly
                            value={essay.teacher_text}
                        ></textarea>
                    )} */}
                </div>
                <div className="student-essay-btns">
                    <Button
                        disabled={essay.accepted && !edit}
                        onClick={() => sendEssay(essayText)}
                    >
                        {edit ? 'save changes' : 'send'}
                    </Button>
                    {essay.accepted && (
                        <Button disabled={essay.checked} onClick={onEdit}>
                            edit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Essay;
