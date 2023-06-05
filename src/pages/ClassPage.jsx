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
            <ClassWorkLayout />
        </Box>
    );
};

export default ClassPage;
