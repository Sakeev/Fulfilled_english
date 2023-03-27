import React from 'react';
import Essay from '../components/tasks/Essay/Essay';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';

const EssayPage = () => {
    return (
        <div>
            <Box
                sx={{
                    height: '100vh',
                    overflowY: 'hidden',
                    display: 'flex',
                }}
            >
                <Sidebar />
                <Essay />
            </Box>
        </div>
    );
};

export default EssayPage;
