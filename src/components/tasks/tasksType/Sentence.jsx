import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTasks } from '../../../contexts/TasksContextProvider';
import { useNavigate } from 'react-router-dom';

import './tasksType.css';
// const words = [

//     ['cute' , 'is' , 'she'],
// ];

const styles = {
    word: {
        bgcolor: '#e7e7e7',
        padding: '2px 10px',
        margin: '5px',
        borderRadius: '10px',
        transition: '100ms',
        cursor: 'pointer',
        '&:hover': {
            bgcolor: '#9bd0cb',
        },
    },
};

const Sentence = ({
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
        <div className="sentence-container task-types-container">
            {/* <div className="sentence-task-box-wrapper"> */}
            <div className="sentence-task-box-wrapper">
                {words.map((item, index) => (
                    <div className="sentence-task-box" key={index}>
                        <div className="sentence-word" key={'id' + index}>
                            {item.map((word, ind) => (
                                <span
                                    key={'inner' + ind}
                                    sx={styles.word}
                                    onClick={() => {
                                        handleWord(ind, index);
                                    }}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                        <div
                            className="sentence-answer-block"
                            sx={styles.answer_block}
                            key={'key' + index}
                        >
                            {answer[index]?.map((item, ind) => (
                                <p
                                    key={'inner_ans' + ind}
                                    onClick={() => {
                                        handleWordBack(ind, index);
                                    }}
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {/* </div> */}
            <Button
                onClick={() =>
                    handleAnswer(obj, caseInfo.tasks?.[task_id - 1].id)
                }
            >
                send
            </Button>
        </div>
    );
};

export default Sentence;
