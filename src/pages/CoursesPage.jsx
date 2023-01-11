import { Box } from '@mui/system';
import React from 'react';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main'

const CoursesPage = () => {
  
    return (
      <Box sx={{
        height: '100vh',
        overflowY: 'hidden',
        display: 'flex',
      }}>
      <Sidebar />
      
      <Box sx={{
          bgcolor: 
          "#fff",
          // 'green',
          display: 'flex', justifyContent: 'center', width: '100%'}}>
          <Main />
      </Box>
      </Box>
    );
};

export default CoursesPage;