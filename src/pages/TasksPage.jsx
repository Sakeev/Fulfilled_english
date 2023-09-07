import { Box } from '@mui/material';
import React from 'react';
import Tasks from '../components/tasks/@index';

const TasksPage = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                // overflowY: 'hidden',
                display: 'flex',
            }}
        >
            <Box
                sx={{
                    bgcolor: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                <Tasks />
            </Box>
        </Box>
    );
};

export default TasksPage;
