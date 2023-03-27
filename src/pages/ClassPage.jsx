import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Chat from '../components/classwork/Chat';
import Sidebar from '../components/Sidebar'

const ClassPage = () => {

  return (
    <Box sx={{ 
      display: 'flex',
      }}>
      <Sidebar />
      <Box sx={{ margin: '20px' }}>
        <Chat />
      </Box>
    </Box>
  );
}

export default ClassPage;
