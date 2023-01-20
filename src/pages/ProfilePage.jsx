import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';

const ProfilePage = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                overflowY: 'hidden',
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Sidebar />
            <Profile />
        </Box>
    );
};

export default ProfilePage;
