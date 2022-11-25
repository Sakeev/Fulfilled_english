import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import FillInps from './FillInps';
import Sentence from './Sentence';
import WordFind from './WordFind';

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

const theme = createTheme({
  palette: {
    secondary: {
      main: '#006D77'
    }
  }
})

const Tasks = () => {

  return (
    <ThemeProvider theme={theme}>
      <Box sx={mainBox}>
        <WordFind taskBox={taskBox} />
        <FillInps taskBox={taskBox} />
        <Sentence taskBox={taskBox} />
        <Button variant="success">Отправить</Button>
      </Box>
      {/* <img style={{position: 'absolute', left: '1000px', top: '100px'}} src="https://plus.unsplash.com/premium_photo-1661759476421-af5519793034?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8em9vbSUyMGNhbGx8ZW58MHx8MHx8&w=1000&q=80" alt='2' width='400' height="300" /> */}
    </ThemeProvider>
  );
};

export default Tasks;