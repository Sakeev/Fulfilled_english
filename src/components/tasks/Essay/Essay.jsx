import { useEssay } from '../../../contexts/EssayContextProvider';
import { useAuth } from '../../../contexts/AuthContextProvider';
import { Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../../http';
import { useRef } from 'react';
import React from 'react';

import noEssay from '../../../assets/images/munara.jpeg';

import './Essay.css';

const API = 'http://35.238.162.84/';

const Essay = () => {
    const [essayText, setEssayText] = useState('');
    const [edit, setEdit] = useState(false);
    const highlightedEssayText = useRef();

    const { getEssay, essay } = useEssay();

    useEffect(() => {
        getEssay();
    }, []);

    useEffect(() => {
        setEssayText(essay.text);
        if (highlightedEssayText.current) {
            highlightedEssayText.current.innerHTML = essay.html_text;
        }
    }, [essay]);

    const sendEssay = async () => {
        const data = {
            text: essayText,
            html_text: essayText,
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
                    {essay.checked && (
                        <div className="student-essay-corrections info-window">
                            <p>Here is the teachers corrections:</p>
                            <ul>
                                {essay.mistakes.map((mistake, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className="student-essay-correction"
                                        >
                                            <div
                                                className="correction-color"
                                                style={{
                                                    backgroundColor:
                                                        mistake.color,
                                                }}
                                            ></div>
                                            <p>{mistake.description}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                    {essay.checked ? (
                        <div
                            ref={highlightedEssayText}
                            className="unactive student-essay-text info-window"
                        ></div>
                    ) : (
                        <textarea
                            className={`${
                                essay.accepted && !edit ? 'unactive' : ''
                            } student-essay-text info-window`}
                            readOnly={essay.accepted && !edit}
                            onChange={(e) => setEssayText(e.target.value)}
                            value={essayText}
                        />
                    )}
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
