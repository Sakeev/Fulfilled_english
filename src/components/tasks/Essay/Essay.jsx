import { useEssay } from '../../../contexts/EssayContextProvider';
import { useAuth } from '../../../contexts/AuthContextProvider';
import { API } from '../../../helpers/consts';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../../http';
import { useRef } from 'react';
import React from 'react';

import './Essay.css';

const Essay = () => {
    const { getLesson, lesson, loading } = useEssay();
    const [essayTemplate, setEssayTemplate] = useState(null);
    const [essayText, setEssayText] = useState('');
    const [essay, setEssay] = useState(null);
    const highlightedEssayText = useRef();

    useEffect(() => {
        let isTeacher = localStorage.getItem('isTeacher');
        isTeacher = isTeacher ? JSON.parse(isTeacher) : isTeacher;
        if (!isTeacher) getLesson();
    }, []);

    useEffect(() => {
        if (lesson.essay) {
            setEssayTemplate(lesson.essay[0]);
        }
    }, [lesson]);

    useEffect(() => {
        if (essayTemplate) {
            if (essayTemplate.user_essay[0]) {
                setEssay(essayTemplate.user_essay[0]);
                setEssayText(essayTemplate.user_essay[0].text);
                if (highlightedEssayText.current) {
                    highlightedEssayText.current.innerHTML =
                        essayTemplate.user_essay[0].html_text;
                }
            }
        }
    }, [essayTemplate]);

    const sendEssay = async () => {
        const data = {
            text: essayText,
            html_text: essayText,
            essay: essayTemplate.id,
        };

        await api.post(`${API}room/essa/`, data);
        getLesson();
    };

    if (!essayTemplate || loading) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="student-essay-wrapper">
            <div className="student-essay">
                <h2>Essay</h2>
                <div className="student-essay-info-text">
                    <div className="student-essay-subject">
                        <span>Subject: </span>
                        <span className="black">{essayTemplate?.title}</span>
                    </div>
                    <div className="student-essay-status">
                        <span>Status:</span>
                        <span>{essay?.checked ? '' : ' not'} checked</span>
                    </div>
                </div>
                <div className="student-essay-textareas">
                    {essay?.checked && (
                        <div className="student-essay-corrections info-window">
                            <p>Here is the teachers corrections:</p>
                            <ul>
                                {essay?.mistakes.map((mistake, index) => {
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
                    {essay?.checked ? (
                        <div
                            ref={highlightedEssayText}
                            className="unactive student-essay-text info-window"
                        ></div>
                    ) : (
                        <textarea
                            className={`${
                                essay ? 'unactive' : ''
                            } student-essay-text info-window`}
                            readOnly={!!essay}
                            onChange={(e) => setEssayText(e.target.value)}
                            value={essayText}
                        />
                    )}
                </div>
                <div className="student-essay-btns">
                    <Button
                        disabled={!!essay}
                        onClick={() => sendEssay(essayText)}
                    >
                        send
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Essay;
