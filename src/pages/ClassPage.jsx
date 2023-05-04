import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ClassWorkLayout from '../components/classwork/ClassWorkLayout';
import Sidebar from '../components/Sidebar';
import './ClassPage.css';

const ClassPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Sidebar />
            <Box sx={{ margin: '20px', height: '90vh', width: '30vw' }}>
                <ClassWorkLayout />
                <Box
                    sx={{
                        height: '50%;',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography component={'p'}>zoom link here</Typography>
                </Box>
                <Box
                    sx={{
                        height: '50%;',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* <Chat /> */}
                </Box>
            </Box>
        </Box>
    );
};

export default ClassPage;
