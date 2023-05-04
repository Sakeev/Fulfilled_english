import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTasks } from '../../../contexts/TasksContextProvider';
import {useNavigate} from 'react-router-dom'


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
    words_box: {
        display: 'flex',
        height: '40px',
        alignItems: 'center',
    },
    answer_block: {
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'flex-start',
        paddingLeft: '10px',
        width: '50%',
        height: '60vh',
        borderRadius: '10px',
        border: '1px solid lightgray',
        margin: '10px 5px',
        overflowX: 'auto',
    },
    answer: {
        margin: '5px 0',
        fontSize: '18px',
        fontWeight: '500',
        transition: '150ms',
        cursor: 'pointer',
        padding: '5px 10px',
        color: '#006D77',
        '&:hover': {
            bgcolor: '#e7e7e7',
            borderRadius: '10px',
        },
    },
};

const BuildDialog = ({ taskBox , handleCaseDetail , id , task_id , caseDetail , descr  , handleAnswer , caseInfo}) => {
    const { dispatch, sent } = useTasks();
  const navigate = useNavigate()
    const [words , setWords] = useState([])
useEffect(()=>{
    handleCaseDetail(id , task_id)
    // setWords([caseDetail?.description.split(" ")])
},[])

useEffect(()=>{
    setWords([caseDetail?.description.split(" ")])
},[task_id])

useEffect(() => {
    if (caseDetail) {
        setWords([caseDetail?.description.split(" ")])
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
    const str = answer[0]?.join(' ')
console.log(caseInfo.tasks?.[task_id-1].id);

const obj={
    answers:str
}
    return (
        <>
            <Box sx={taskBox}>
                <Typography variant="h6" color="secondary">
                </Typography>
                <Box sx={{ padding: '20px 0' }}>
                    {words.map((item, index) => (
                        <Box key={index}>
                            <Box sx={styles.words_box} key={'id' + index}>
                                {item.map((word, ind) => (
                                    <Typography
                                        key={'inner' + ind}
                                        sx={styles.word}
                                        onClick={() => {
                                            handleWord(ind, index);
                                        }}
                                    >
                                        {word}
                                    </Typography>
                                ))}
                            </Box>
                            <Box sx={styles.answer_block} key={'key' + index}>
                                {answer[index]?.map((item, ind) => (
                                    <Typography
                                        key={'inner_ans' + ind}
                                        sx={styles.answer}
                                        onClick={() => {
                                            handleWordBack(ind, index);
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                    
                                ))}
                                
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <button onClick={()=>handleAnswer( obj, caseInfo.tasks?.[task_id-1].id)}>send</button>
        </>
    );
};

export default BuildDialog;
