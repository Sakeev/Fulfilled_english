import { Box } from '@mui/system';
import React from 'react';
import Appbar from '../components/Appbar';
import Main from '../components/Main'
import Navbar from '../components/Navbar';

const CoursesPage = () => {
    return (
      <Box sx={{
        bgcolor: 
        'green',
          height: '100vh',
        overflowY: 'hidden'
      }}>
      <Appbar />
      
        <Box sx={{
          bgcolor: 
          "#d1e09424",
          // 'green',
          display: 'flex', justifyContent: 'flex-start',
          height: '100%'}}>
          <Navbar />
          <Main />
      </Box>
      </Box>
    );
};

export default CoursesPage;