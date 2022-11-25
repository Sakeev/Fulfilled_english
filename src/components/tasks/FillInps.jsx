import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

const inputBox = {
  width: '80px',
  mr: 3,
  "& input": {
    padding: '5px',
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: '#006D77',
    }
  }
}

const FillInps = ({ taskBox }) => {
  return (
    <>
      <Box sx={taskBox}>
        <Typography variant="h6" color="secondary">Упражнение № 2</Typography>
        <Box sx={{display: 'flex', padding: "20px 0", alignItems: 'center'}}>
          <TextField sx={inputBox}></TextField>
          <Typography>you</Typography>
          <TextField sx={{...inputBox, ml: 3}}></TextField>
          <Typography>in God?</Typography>
        </Box>
      </Box>
    </>
  );
};

export default FillInps;