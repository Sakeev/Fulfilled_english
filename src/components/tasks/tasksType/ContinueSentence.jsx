import { Box, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

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

const data = ['lorem some', 'words', 'have to', 'get'];
const dataSecond = ['thing', 'are so strong', 'dooo', 'a girl'];

const ContinueSentence = ({ taskBox }) => {
    const [wordsPairs, setWordsPairs] = useState({
        first: [],
        second: [],
        third: [],
        fourth: [],
    });

console.log(wordsPairs);
    const checkWordsPairs = (id) => {
        for (let key in wordsPairs) {
            wordsPairs[key].forEach((wordObj, wordObjIndex) => {
                if (wordObj.id === id) {
                    const newWordsPairs = {
                        ...wordsPairs,
                        first: [...wordsPairs.first],
                        second: [...wordsPairs.second],
                        third: [...wordsPairs.third],
                        fourth: [...wordsPairs.fourth],
                    };
                    newWordsPairs[key].splice(wordObjIndex, 1);
                    setWordsPairs(newWordsPairs);
                }
            });
        }
    };

    

    const addArr = (item, index) => {
        if (wordsPairs.first.length < 2) {
            setWordsPairs((prev) => {
                const newWordsPairs = {
                    ...prev,
                    first: [...prev.first],
                    second: [...prev.second],
                    third: [...prev.third],
                    fourth: [...prev.fourth],
                };

                newWordsPairs.first.push({
                    word: item,
                    picked: true,
                    id: index,
                });

                return newWordsPairs;
            });
            checkWordsPairs(index);
        } else if (wordsPairs.second.length < 2) {
            setWordsPairs((prev) => {
                const newWordsPairs = {
                    ...prev,
                    first: [...prev.first],
                    second: [...prev.second],
                    third: [...prev.third],
                    fourth: [...prev.fourth],
                };

                newWordsPairs.second.push({
                    word: item,
                    picked: true,
                    id: index,
                });

                return newWordsPairs;
            });
            checkWordsPairs(index);
        } else if (wordsPairs.third.length < 2) {
            setWordsPairs((prev) => {
                const newWordsPairs = {
                    ...prev,
                    first: [...prev.first],
                    second: [...prev.second],
                    third: [...prev.third],
                    fourth: [...prev.fourth],
                };

                newWordsPairs.third.push({
                    word: item,
                    picked: true,
                    id: index,
                });

                return newWordsPairs;
            });
            checkWordsPairs(index);
        } else if (wordsPairs.fourth.length < 2) {
            setWordsPairs((prev) => {
                const newWordsPairs = {
                    ...prev,
                    first: [...prev.first],
                    second: [...prev.second],
                    third: [...prev.third],
                    fourth: [...prev.fourth],
                };

                newWordsPairs.fourth.push({
                    word: item,
                    picked: true,
                    id: index,
                });

                return newWordsPairs;
            });
            checkWordsPairs(index);
        }
    };

    return (
        <>
            <Box sx={taskBox}>
                <Typography variant="h6" color="secondary">
                    Упражнение № 4
                </Typography>
                <Box sx={styles.main}>
                    <Box sx={styles.wordsContainer}>
                        {data.map((item, index) => (
                            <Typography
                                key={index}
                                sx={styles.words}
                                onClick={() => addArr(item, index)}
                            >
                                {item}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={styles.wordsContainer}>
                        {dataSecond.map((item, index) => (
                            <Typography
                                key={index + data.length}
                                sx={styles.words}
                                onClick={() =>
                                    addArr(item, index + data.length)
                                }
                            >
                                {item}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Box>
            <button>send</button>
        </>
    );
};

export default ContinueSentence;
