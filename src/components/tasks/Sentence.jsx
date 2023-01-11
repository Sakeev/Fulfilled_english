import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTasks } from '../../contexts/TasksContextProvider';

const words = [['competition', 'the', 'won', 'I', 'have'], ['won', 'three', 'Oscars.', 'has', 'He']]

const styles = {
  word: {
    bgcolor: '#e7e7e7',
    padding: '2px 10px',
    margin: '5px',
    borderRadius: '10px',
    transition: '100ms',
    cursor: 'pointer',
    "&:hover": {
      bgcolor: '#9bd0cb',
    }
  },
  words_box: {
    display: 'flex',
    height: '40px',
    alignItems: 'center'
  },
  answer_block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '10px',
    width: '50%',
    height: '80px',
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
    "&:hover": {
      bgcolor: '#e7e7e7',
      borderRadius: '10px',
    }
  }
}

const Sentence = ({taskBox}) => {

  const {dispatch , sent} = useTasks()
  
  // console.log(sent[0].slice(1,2));

  const checkFields = () =>{
    let res = words.map(item => [])
    return res
  }
  const [answer, setAnswer] = useState(checkFields());
  
  const handleWord = (ind, index) => {
    let pickedWord = words[index].splice(ind, 1);
    let newAns = [];
    newAns.push(pickedWord[0]);
    let res = [...answer];
    res[index] = res[index].concat([...newAns])

    console.log(answer);
    setAnswer(res);
  }

  const handleSent=()=>{
    dispatch(
      {
        type:'GET_SENT',
        payload:answer,
      }
    )
  }
  console.log(sent[0]);
  const handleRemoveSent=( arrInd, index)=>{
    dispatch({
      type:'GET_SENT',
      payload:sent[arrInd].slice(index, index+1),
    })
  }

  useEffect((
    sent
  )=>{},[answer])

  console.log(sent);

  const handleWordBack = (ind, index) => {
    words[index].splice(ind, 0, answer[index][ind])
    let newAns = [...answer];
    newAns[index].splice(ind,1);
    setAnswer(newAns);
  }

  console.log(answer);

  return (
    <>
      <Box sx={taskBox}>
          <Typography variant="h6" color="secondary">Упражнение № 3</Typography>
          <Box sx={{padding: '20px 0'}}>
            {
              words.map((item, index) => (
                <Box key={index}>
                  <Box sx={styles.words_box} key={'id' + index}>
                    {
                      item.map((word, ind) => (
                        <Typography key={'inner' + ind} sx={styles.word} onClick={()=>{
                          handleWord(ind, index)
                          handleSent();
                        } }>{word}</Typography>
                      ))
                    }
                  </Box>
                  <Box sx={styles.answer_block} key={'key' + index}>
                    {
                      answer[index]?.map((item, ind) => (
                        <Typography key={'inner_ans' + ind} sx={styles.answer} onClick={()=>{
                          handleWordBack(ind, index)
                          handleRemoveSent(index, ind)
                        } }>{item}</Typography>
                      ))
                    }
                  </Box>
                </Box>
              ))
            }
          </Box>
        </Box>
    </>
  );
};

export default Sentence;