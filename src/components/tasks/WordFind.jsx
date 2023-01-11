import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTasks } from '../../contexts/TasksContextProvider';

const answerBox = {
  mr: 1,
  width: '15%',
  height: '30px',
  bgcolor: '#e7e7e7',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: '150ms',
  "&:hover": {
    bgcolor: '#9bd0cb'
  }
}

const WordFind = ({taskBox}) => {
  const [answer, setAnswer] = useState('___')

  const {dispatch} = useTasks();
  // console.log(dispatch);

  return (
    <>
      <Box sx={taskBox}>
          <Typography variant="h6" color="secondary">Упражнение № 1</Typography>
          <Box sx={{padding: '20px 0'}}>
            <Typography>Tom has <strong>{answer}</strong> out. He'll be back in about an hour.</Typography>
            <Box sx={{display: 'flex', mt: 1}}>
            <Box sx={answerBox} onClick={()=>{dispatch({
                type:"GET_WORD",
                payload:'been',
              })
              setAnswer('been');
              }}>gone</Box>
              <Box sx={answerBox} onClick={()=>{dispatch({
                type:"GET_WORD",
                payload:'gone',
              })
              setAnswer('gone');
              }}>gone</Box>
            </Box>
          </Box>
        </Box>
    </>
  );
};

export default WordFind;