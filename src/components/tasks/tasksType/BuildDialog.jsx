import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTasks } from '../../../contexts/TasksContextProvider';
import { useNavigate } from 'react-router-dom';

import './tasksType.css';

const BuildDialog = ({
    taskBox,
    handleCaseDetail,
    id,
    task_id,
    caseDetail,
    descr,
    handleAnswer,
    caseInfo,
}) => {
    const { dispatch, sent } = useTasks();
    const navigate = useNavigate();
    const [words, setWords] = useState([]);
    useEffect(() => {
        handleCaseDetail(id, task_id);
        // setWords([caseDetail?.description.split(" ")])
    }, []);

    useEffect(() => {
        setWords([caseDetail?.description.split(' ')]);
    }, [task_id]);

    useEffect(() => {
        if (caseDetail) {
            setWords([caseDetail?.description.split(' ')]);
        }
    }, [caseDetail]);

    const checkFields = () => {
        let res = [];
        for (let i = 0; i < words.length; i++) {
            res.push([]);
        }
        return res;
    };

    useEffect(() => {
        setAnswer(checkFields());
    }, [words]);

    const [answer, setAnswer] = useState([]);

    const handleWord = (ind, index) => {
        let pickedWord = words[index].splice(ind, 1);
        let newAns = [];
        newAns.push(pickedWord[0]);
        let res = [...answer];
        res[index] = res[index].concat([...newAns]);

        setAnswer(res);

        dispatch({
            type: 'GET_SENT',
            payload: res,
        });
    };

    const handleWordBack = (ind, index) => {
        words[index].splice(ind, 0, answer[index][ind]);
        let newAns = [...answer];
        newAns[index].splice(ind, 1);
        setAnswer(newAns);
        dispatch({
            type: 'GET_SENT',
            payload: newAns,
        });
    };
    const str = answer[0]?.join(' ');

    const obj = {
        answers: str,
    };

    return (
        <>
            <p className="task-condition">
                {caseInfo.tasks?.[task_id - 1].condition}
            </p>
            <div className="build-dialog-container task-types-container">
                <div className="build-dialog-task-box">
                    <div>
                        {words.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div
                                        className="build-dialog-words-box"
                                        key={'id' + index}
                                    >
                                        {item.map((word, ind) => (
                                            <p
                                                key={'inner' + ind}
                                                onClick={() => {
                                                    handleWord(ind, index);
                                                }}
                                            >
                                                {word}
                                            </p>
                                        ))}
                                    </div>
                                    <div
                                        className="build-dialog-answer-block"
                                        key={'key' + index}
                                    >
                                        {answer[index]?.map((item, ind) => (
                                            <p
                                                key={'inner_ans' + ind}
                                                className="build-dialog-answer"
                                                onClick={() => {
                                                    handleWordBack(ind, index);
                                                }}
                                            >
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Button
                    className='hw__send-btn'
                    onClick={() =>
                        handleAnswer(obj, caseInfo.tasks?.[task_id - 1].id)
                    }
                >
                    send
                </Button>
            </div>
        </>
    );
};

export default BuildDialog;
