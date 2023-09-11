import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import './tasksType.css';

const styles = {
    main: {
        display: 'flex',
        width: '50%',
        justifyContent: 'space-between',
        mt: 2,
    },
    words: {
        bgcolor: '#9bd0cb',
        color: '#006D77',
        margin: '5px 0',
        padding: '10px',
        width: '100%',
        cursor: 'pointer',
        transition: '150ms',
        textAlign: 'center',
        borderRadius: '5px',
        '&:hover': {
            bgcolor: '#93c7c2',
        },
    },
    wordsContainer: {
        width: '42%',
    },
};

// const data = ['lorem some', 'words', 'have to', 'get'];
// const dataSecond = ['thing', 'are so strong', 'dooo', 'a girl'];

const colors = [
    '#ffddd2',
    '#edf67d',
    '#edf6f9',
    '#E29578',

    '#90ee90',
    '#ffbbee',
];

const ConnectWords = ({ handleAnswer, caseInfo, taskId, taskDetails }) => {
    const [wordsPairs, setWordsPairs] = useState([]);

    const [firstDesc, setFirstDesc] = useState(null);
    const [secondDesc, setSecondDesc] = useState(null);

    useEffect(() => {
        setFirstDesc(taskDetails?.description1);
        setSecondDesc(taskDetails?.description2);
    }, []);

    useEffect(() => {
        setFirstDesc(taskDetails?.description1);
        setSecondDesc(taskDetails?.description2);
    }, [taskId]);

    useEffect(() => {
        if (taskDetails) {
            setFirstDesc(taskDetails?.description1);
            setSecondDesc(taskDetails?.description2);
        }
    }, [taskDetails]);

    const isWordInArr = (index) => {
        if (wordsPairs.length === 0) return false;

        for (let wordsPair of wordsPairs) {
            for (let word of wordsPair) {
                if (word.id === index) return true;
            }
        }

        return false;
    };

    const handleWord = (item, index, event) => {
        let newWordsPairs = JSON.parse(JSON.stringify(wordsPairs));

        if (isWordInArr(index)) {
            for (let i in newWordsPairs) {
                for (let j in newWordsPairs[i]) {
                    if (newWordsPairs[i][j].id === index) {
                        newWordsPairs[i].splice(j, 1);
                        event.target.style.backgroundColor = '#9bd0cb';
                        break;
                    }
                }
            }
        } else {
            let added = false;

            for (let i in newWordsPairs) {
                if (newWordsPairs[i].length < 2) {
                    if (
                        newWordsPairs[i].length !== 0 &&
                        ((newWordsPairs[i][0].id < firstDesc.length &&
                            index < firstDesc.length) ||
                            (newWordsPairs[i][0].id >= firstDesc.length &&
                                index >= firstDesc.length))
                    )
                        return;
                    newWordsPairs[i].push({
                        word: item,
                        picked: true,
                        id: index,
                    });
                    added = true;
                    event.target.style.backgroundColor = colors[i];
                    break;
                }
            }

            if (!added) {
                newWordsPairs.push([
                    {
                        word: item,
                        picked: true,
                        id: index,
                    },
                ]);
                event.target.style.backgroundColor =
                    colors[newWordsPairs.length - 1];
            }
        }
        setWordsPairs(newWordsPairs);
    };

    const formObj = () => {
        const answer = [];

        for (let i = 0; i < firstDesc.length; i++) {
            answer.push(['No answer', 'No answer']);
        }

        for (let i = 0; i < wordsPairs.length; i++) {
            for (let j = 0; j < wordsPairs[i].length; j++) {
                answer[i][j] = wordsPairs[i][j].word.toLowerCase();
            }
        }

        return {
            answers: answer,
        };
    };

    return (
        <div className="continue-sentence-container task-types-container">
            <div className="continue-sentence">
                <Box sx={styles.main}>
                    <Box sx={styles.wordsContainer}>
                        {firstDesc?.map((item, index) => (
                            <Typography
                                key={index}
                                sx={styles.words}
                                onClick={(e) => {
                                    handleWord(item, index, e);
                                }}
                            >
                                {item}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={styles.wordsContainer}>
                        {secondDesc?.map((item, index) => (
                            <Typography
                                key={index + firstDesc?.length}
                                sx={styles.words}
                                onClick={(e) =>
                                    handleWord(
                                        item,
                                        index + firstDesc?.length,
                                        e
                                    )
                                }
                            >
                                {item}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </div>
            <Button
                onClick={() => {
                    const answer = [];

                    for (let i = 0; i < firstDesc.length; i++) {
                        answer.push(['', '']);
                    }

                    for (let i = 0; i < wordsPairs.length; i++) {
                        for (let j = 0; j < wordsPairs[i].length; j++) {
                            answer[i][j] = wordsPairs[i][j].word;
                        }
                    }

                    console.log(caseInfo, taskId);

                    handleAnswer(formObj(), caseInfo.tasks?.[taskId - 1].id);
                }}
            >
                send
            </Button>
        </div>
    );
};

export default ConnectWords;
