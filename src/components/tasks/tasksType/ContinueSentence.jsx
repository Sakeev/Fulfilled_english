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
        bgcolor: '#C5E5E2',
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


const ContinueSentence = ({ taskBox  , handleAnswer , caseInfo , task_id , id , caseDetail , handleCaseDetail}) => {
    const [wordsPairs, setWordsPairs] = useState({
        first: [],
        second: [],
        third: [],
        fourth: [],
    });

    const [firstDesc , setFirstDesc] = useState(null);
    const [secondDesc , setSecondDesc] = useState(null);


    useEffect(()=>{
        handleCaseDetail(id , task_id)
        setFirstDesc(caseDetail?.description1)
        setSecondDesc(caseDetail?.description2)

    },[])
    
    useEffect(()=>{
        setFirstDesc(caseDetail?.description1)
        setSecondDesc(caseDetail?.description2)
    },[task_id])
    
    useEffect(() => {
        if (caseDetail) {
            setFirstDesc(caseDetail?.description1)
        setSecondDesc(caseDetail?.description2)
        }
      }, [caseDetail]);

      console.log(firstDesc , secondDesc);
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
    const obj={
        answers:wordsPairs
    }

    return (
        <>
            <Box sx={taskBox}>
                <Typography variant="h6" color="secondary">
                </Typography>
                <Box sx={styles.main}>
                    <Box sx={styles.wordsContainer}>
                        {firstDesc?.map((item, index) => (
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
                        {secondDesc?.map((item, index) => (
                            <Typography
                                key={index + firstDesc?.length}
                                sx={styles.words}
                                onClick={() =>
                                    addArr(item, index + firstDesc?.length)
                                }
                            >
                                {item}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Box>
            <button onClick={()=>handleAnswer(obj , caseInfo.tasks?.[task_id-1].id)}>send</button>
        </>
    );
};

export default ContinueSentence;
