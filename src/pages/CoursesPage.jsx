import { Box } from '@mui/system';
import React from 'react';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main'
import Navbar from '../components/Navbar';

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
          "#d1e09424",
          // 'green',
          display: 'flex', justifyContent: 'flex-start'}}>
          <Main />
      </Box>
      </Box>
    );
};

export default CoursesPage;