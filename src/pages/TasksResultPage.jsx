import { useTasks } from '../contexts/TasksContextProvider';
import TasksResult from '../components/tasks/TasksResult';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';
import { useEffect } from 'react';

const TasksResultPage = () => {
    const { getAnswers } = useTasks();

    useEffect(() => {
        getAnswers();
    }, []);

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
            }}
        >
            <Sidebar />

            <Box>
                <TasksResult />
            </Box>
        </Box>
    );
};

export default TasksResultPage;
