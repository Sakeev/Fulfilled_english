import { useEssay } from '../../../contexts/EssayContextProvider';
import { highlightSelection } from '../../../helpers/essay';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import api from '../../../http';

import cancelled from '../../../assets/images/cancelled.png';

const ViewEssay = () => {
    const { updateEssay, loading, getLesson, lesson } = useEssay();

    const [showPicker, setShowPicker] = useState(false);
    const [mistakesArr, setMistakesArr] = useState([]);
    const [selection, setSelection] = useState(null);
    const [edit, setEdit] = useState(false);
    const [grade, setGrade] = useState(0);
    const colorFillsRef = useRef();
    const essayRef = useRef();
    const params = useParams();

    const [essay, setEssay] = useState(null);
    const [studentEssay, setStudentEssay] = useState(null);

    useEffect(() => {
        getLesson(params.studentId);
    }, []);

    useEffect(() => {
        if (lesson) setEssay(lesson.essay[0]);
    }, [lesson]);

    useEffect(() => {
        if (essay) {
            setStudentEssay(essay.user_essay[0]);
            setMistakesArr(essay.user_essay[0].mistakes);
        }
    }, [essay]);

    useEffect(() => {
        if (essayRef.current && studentEssay.id) {
            essayRef.current.innerHTML = studentEssay.html_text;
        }
    }, [essayRef.current, studentEssay]);

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
    };

    const onCreateMarker = async () => {
        setShowPicker((prev) => !prev);
    };

    const createMistake = async (color) => {
        const data = {
            color: color,
            description: '',
        };

        await api.post(
            `http://35.239.173.63/room/essa/${studentEssay.id}/add_mistake/`,
            data
        );
        setShowPicker(false);
        getLesson(params.studentId);
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
            `http://35.239.173.63/room/essa/${studentEssay.id}/update_mistake/`,
            data
        );
    };

    const deleteMistake = async (index) => {
        const data = { data: { id: mistakesArr[index].id } };

        await api.delete(
            `http://35.239.173.63/room/essa/${studentEssay.id}/delete_mistake/`,
            data
        );

        getLesson(params.studentId);
    };

    if (loading || !essay) {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        );
    }

    console.log(grade);

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
                            <a href="#">{lesson?.user.username}</a>{' '}
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
                                                disabled={studentEssay?.checked}
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
                        <div className="view-essay-create-marker">
                            <Button
                                disabled={studentEssay?.checked}
                                onClick={onCreateMarker}
                                className="teacher-essay-create-marker"
                            >
                                Create marker
                            </Button>
                            <div
                                className={`view-essay-color-picker ${
                                    showPicker ? 'show' : ''
                                }`}
                            >
                                <div
                                    onClick={() => createMistake('orange')}
                                    className="view-essay-color orange"
                                ></div>
                                <div
                                    onClick={() => createMistake('red')}
                                    className="view-essay-color red"
                                ></div>
                                <div
                                    onClick={() => createMistake('green')}
                                    className="view-essay-color green"
                                ></div>
                            </div>
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
                        disabled={studentEssay?.checked}
                        onClick={async () => {
                            await updateEssay(studentEssay.id, {
                                checked: true,
                            });
                            getLesson(params.studentId);
                        }}
                    >
                        send
                    </Button>
                    <div className="student-essay-edit-btns">
                        <div className={`${!edit ? 'unactive' : ''}`}>
                            <input
                                disabled={!edit}
                                type="text"
                                value={
                                    studentEssay?.checked
                                        ? studentEssay?.score
                                        : grade
                                }
                                onChange={(event) => {
                                    const value = event.target.value;

                                    if (!isNaN(value - parseFloat(value))) {
                                        if (
                                            parseFloat(value) <= 10 &&
                                            parseFloat(value) >= 0
                                        )
                                            if (value.length <= 3)
                                                setGrade(value);
                                    } else if (value === '') setGrade(value);
                                }}
                            />
                            <span>/10</span>
                        </div>
                        <Button
                            disabled={studentEssay?.checked}
                            onClick={async () => {
                                if (edit) {
                                    await updateEssay(studentEssay.id, {
                                        html_text: essayRef.current.innerHTML,
                                        score: grade,
                                    });

                                    // console.log({
                                    //     html_text: essayRef.current.innerHTML,
                                    //     score: grade,
                                    // });

                                    getLesson(params.studentId);
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
        </div>
    );
};

export default ViewEssay;
