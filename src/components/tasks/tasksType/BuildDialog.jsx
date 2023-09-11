import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';

import './tasksType.css';

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

const BuildDialog = ({ task_id, taskDetails, handleAnswer, caseInfo }) => {
    const [sentences, setSentences] = useState([]);
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
        setSentences(taskDetails?.description.trim().split('|'));
    }, []);

    const handleSentence = (ind) => {
        const newSentences = [...sentences];
        const pickedSentence = newSentences.splice(ind, 1)[0];

        setSentences(newSentences);
        setAnswer((answer) => [...answer, pickedSentence]);
    };

    const handleSentenceBack = (ind) => {
        const newSentences = [...sentences];
        newSentences.splice(ind, 0, answer[ind]);
        const newAns = [...answer];
        newAns.splice(ind, 1);
        setSentences(newSentences);
        setAnswer(newAns);
    };

    return (
        <div className="sentence-container task-types-container">
            <div className="sentence-task-box-wrapper">
                <div className="sentence-task-box">
                    <div className="sentence-word build-dialog-word">
                        {sentences.map((word, ind) => (
                            <span
                                key={ind}
                                sx={styles.word}
                                onClick={() => {
                                    handleSentence(ind);
                                }}
                            >
                                {word}
                            </span>
                        ))}
                    </div>
                    <div
                        className="build-dialog-answer-block"
                        sx={styles.answer_block}
                    >
                        {answer?.map((item, ind) => (
                            <p
                                className="build-dialog-answer"
                                key={ind}
                                onClick={() => {
                                    handleSentenceBack(ind);
                                }}
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <Button
                className="hw__send-btn"
                onClick={() =>
                    handleAnswer(
                        { answers: answer },
                        caseInfo.tasks?.[task_id - 1].id
                    )
                }
            >
                send
            </Button>
        </div>
    );
};

export default BuildDialog;
