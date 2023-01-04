import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: "center",
  justifyContent: 'space-between',
  width: "20%",
  height: "90%"
}

const innerBox = {
  bgcolor: "#ffffff",
  border: '1px solid #83C5BE',
  borderRadius: "10px",
  width: '100%',
  height: '80%',
  "&:hover": { bgcolor: '#83C5BE' },
  cursor: 'pointer',
}

const HomePageSchedule = () => {
  return (
    <div>
      <Paper
          elevation={1}
          sx={{
              m: 2,
              height: '28vh',
              maxHeight: '220px',
              width: '100%',
              p: 2,
              bgcolor: '#EDF6F9',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
          }}
      >
          <Box sx={boxStyle}>
            <h4>10:20 - 12:20</h4>
            <Box sx={innerBox}></Box>
          </Box>
          <Box sx={boxStyle}>
            <h4>10:20 - 12:20</h4>
            <Box sx={innerBox}></Box>
          </Box>
          <Box sx={boxStyle}>
            <h4>10:20 - 12:20</h4>
            <Box sx={innerBox}></Box>
          </Box>
          <Box sx={boxStyle}>
            <h4>10:20 - 12:20</h4>
            <Box sx={innerBox}></Box>
          </Box>
      </Paper>
    </div>
  );
};

export default HomePageSchedule;