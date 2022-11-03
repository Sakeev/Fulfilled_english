import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';

const mainBox = {
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 0'
}

const taskBox = {
  display: 'flex',
  flexDirection: 'column',

}

const answerBox = {
  mr: 1,
  width: '15%',
  height: '30px',
  bgcolor: 'lightgray',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  "&:hover": {
    bgcolor: 'lightgreen'
  }
}

const inputBox = {
  width: '80px',
  mr: 3,
  "& input": {
    padding: '5px',
  }
}

const Tasks = () => {
  const [answer, setAnswer] = useState('___')

  return (
    <Box sx={mainBox}>
      <Box sx={taskBox}>
        <Typography variant="h6">Упражнение № 1</Typography>
        <Box sx={{padding: '20px 0'}}>
          <Typography>Tom has {answer} out. He'll be back in about an hour.</Typography>
          <Box sx={{display: 'flex', mt: 1}}>
            <Box sx={answerBox} onClick={()=>setAnswer('been')}>been</Box>
            <Box sx={answerBox} onClick={()=>setAnswer('gone')}>gone</Box>
          </Box>
        </Box>
      </Box>
      <Box sx={taskBox}>
        <Typography variant="h6">Упражнение № 2</Typography>
        <Box sx={{display: 'flex', padding: "20px 0", alignItems: 'center'}}>
          <TextField sx={inputBox}></TextField>
          <Typography>you</Typography>
          <TextField sx={{...inputBox, ml: 3}}></TextField>
          <Typography>in God?</Typography>
        </Box>
      </Box>
      <Box sx={taskBox}>
        <Typography variant="h6">Упражнение № 3</Typography>
      </Box>
    </Box>
  );
};

export default Tasks;