import React from 'react';
import Essey from '../components/tasks/Essey';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';
const EsseyPage = () => {
    return (
        <div>
            <Box sx={{
        height: '100vh',
        overflowY: 'hidden',
        display: 'flex',
      }}>
            <Sidebar />
            <Essey/>
            </Box>
        </div>
    );
};

export default EsseyPage;