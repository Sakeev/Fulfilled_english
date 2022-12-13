import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

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

  return (
    <>
      <Box sx={taskBox}>
          <Typography variant="h6" color="secondary">Упражнение № 1</Typography>
          <Box sx={{padding: '20px 0'}}>
            <Typography>Tom has <strong>{answer}</strong> out. He'll be back in about an hour.</Typography>
            <Box sx={{display: 'flex', mt: 1}}>
              <Box sx={answerBox} onClick={()=>setAnswer('been')}>been</Box>
              <Box sx={answerBox} onClick={()=>setAnswer('gone')}>gone</Box>
            </Box>
          </Box>
        </Box>
    </>
  );
};

export default WordFind;