import { useEssay } from '../../../contexts/EssayContextProvider';
import { useAuth } from '../../../contexts/AuthContextProvider';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import cancelled from '../../../assets/images/cancelled.png';
import api from '../../../http';
import { highlightSelection } from '../../../helpers/essay';
import { useRef } from 'react';

const ViewEssay = () => {
    const { getEssay, essay, getStudent, student, updateEssay, loading } =
        useEssay();
    const { userId, isTeacher, user } = useAuth();
    const [mistakesArr, setMistakesArr] = useState([]);
    const [selection, setSelection] = useState(null);
    const [edit, setEdit] = useState(false);
    const colorFillsRef = useRef();
    const essayRef = useRef();
    const params = useParams();

    useEffect(() => {
        getEssay(params.essayId);
        getStudent(localStorage.getItem('studentId'));
    }, []);

    useEffect(() => {
        setMistakesArr(() => {
            const newArr = [];
            for (let i in essay.mistakes) {
                newArr[i] = {
                    id: essay.mistakes[i].id,
                    color: essay.mistakes[i].color,
                    description: essay.mistakes[i].description,
                };
            }
            return newArr;
        });
    }, [essay]);

    useEffect(() => {
        if (essayRef.current && essay.id) {
            essayRef.current.innerHTML = essay.html_text;
        }
    }, [essayRef.current, essay]);

    const onMouseUp = (event) => {
        const userSelection = window.getSelection();
        const s = userSelection.toString();

        if (s.trim() === '') {
            return;
        }

        setSelection(userSelection.getRangeAt(0));

        colorFillsRef.current.style.left = event.clientX + 'px';
        colorFillsRef.current.style.top = `calc(${event.clientY}px - 3rem`;
        colorFillsRef.current.style.opacity = 1;
    };

    const colorFillHandler = (class_) => {
        highlightSelection(selection, class_);
        colorFillsRef.current.style.left = 0;
        colorFillsRef.current.style.top = 0;
        colorFillsRef.current.style.opacity = 0;

        console.log(essayRef.current.innerHTML);
    };

    const createMarker = async () => {
        const data = {
            color: 'orange',
            description: 'something',
        };

        await api.post(
            `http://35.239.173.63/room/essa/${essay.id}/add_mistake/`,
            data
        );
        getEssay();
    };

    const onMistakeChange = (e, index) => {
        setMistakesArr((prev) => {
            const newMistakesArr = JSON.parse(JSON.stringify(prev));
            newMistakesArr[index].description = e.target.value;
            return newMistakesArr;
        });
    };

    const onMistakeBlur = async (index) => {
        const data = { ...mistakesArr[index] };

        await api.patch(
            `http://35.239.173.63/room/essa/${essay.id}/update_mistake/`,
            data
        );
    };

    const deleteMistake = async (index) => {
        const data = { data: { id: mistakesArr[index].id } };

        await api.delete(
            `http://35.239.173.63/room/essa/${essay.id}/delete_mistake/`,
            data
        );

        getEssay(essay.id);
    };

    if (loading) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="student-essay-wrapper">
            <div
                onMouseLeave={() => {
                    colorFillsRef.current.style.opacity = 0;
                }}
                ref={colorFillsRef}
                className="view-essay-color-fills"
            >
                <div
                    onClick={() => colorFillHandler('highlight-orange')}
                    className="view-essay-color-fill"
                ></div>
                <div
                    onClick={() => colorFillHandler('highlight-red')}
                    className="view-essay-color-fill"
                ></div>
                <div
                    onClick={() => colorFillHandler('highlight-green')}
                    className="view-essay-color-fill"
                ></div>
                <img
                    onClick={() => colorFillHandler('highlight-white')}
                    src={cancelled}
                    alt="cancel selection"
                />
            </div>
            <div className="student-essay">
                <h2>Essay</h2>
                <div className="student-essay-info-text">
                    <div className="student-essay-subject">
                        <span>Subject: </span>
                        <span className="black">{essay.title}</span>
                    </div>
                    <div className="student-essay-status">
                        <span>Student: </span>
                        <span>
                            {' '}
                            <a href="#">{student.username}</a>{' '}
                        </span>
                    </div>
                </div>
                <div className="student-essay-textareas">
                    <div className="teacher-essay-corrections-wrapper">
                        <div className="student-essay-corrections info-window">
                            <p>Here is the teachers corrections:</p>
                            <ul>
                                {mistakesArr.map((mistake, index) => {
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
                                            />
                                            <input
                                                disabled={essay.checked}
                                                onBlur={() =>
                                                    onMistakeBlur(index)
                                                }
                                                onChange={(e) =>
                                                    onMistakeChange(e, index)
                                                }
                                                value={mistake.description}
                                                type="text"
                                            />
                                            <img
                                                onClick={() =>
                                                    deleteMistake(index)
                                                }
                                                src={require('../../../assets/images/delete.png')}
                                                alt="delete"
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <Button
                            disabled={essay.checked}
                            onClick={createMarker}
                            className="teacher-essay-create-marker"
                        >
                            Create marker
                        </Button>
                        <div className="view-essay-color-picker">
                            <div className="view-essay-color-fill"></div>
                            <div className="view-essay-color-fill"></div>
                            <div className="view-essay-color-fill"></div>
                        </div>
                    </div>
                    <div
                        ref={essayRef}
                        onMouseUp={(event) => onMouseUp(event)}
                        className={`${
                            edit ? '' : 'unactive'
                        } student-essay-text info-window`}
                    />
                </div>
                <div className="student-essay-btns">
                    <Button
                        disabled={essay.checked}
                        onClick={async () => {
                            await updateEssay(essay.id, {
                                checked: true,
                            });
                            getEssay(essay.id);
                        }}
                    >
                        send
                    </Button>
                    <Button
                        disabled={essay.checked}
                        onClick={async () => {
                            if (edit) {
                                await updateEssay(essay.id, {
                                    html_text: essayRef.current.innerHTML,
                                });

                                getEssay(essay.id);
                            }
                            setEdit((prev) => {
                                return !prev;
                            });
                        }}
                    >
                        {edit ? 'save' : 'edit'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ViewEssay;
