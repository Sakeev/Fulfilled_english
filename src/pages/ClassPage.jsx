import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Chat from '../components/classwork/Chat';
import ClassTasks from '../components/classwork/ClassTasks';
import ClassWorkLayout from '../components/classwork/ClassWorkLayout';
import Sidebar from '../components/Sidebar'

const ClassPage = () => {

  return (
    <Box sx={{ 
      display: 'flex',
      }}>
      <Sidebar />
      <Box sx={{ margin: '20px', height: '90vh', width: '30vw' }}>
        <Box sx={{ height: '50%;', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Typography component={"p"}>
            zoom link here
          </Typography>
        </Box>
        <Box sx={{ height: '50%;', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <ClassWorkLayout />
        </Box>
      </Box>
      <Box sx={{ margin: '20px', width: '40%', backgroundColor: 'lightcoral' }}>
        <ClassTasks />
      </Box>
    </Box>
  );
}

export default ClassPage;
