import { useTasks } from '../contexts/TasksContextProvider';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import HWResults from '../components/HWResults/HWResults';

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
            <Box sx={{ width: '100%' }}>
                {/* <TasksResult /> */}
                <HWResults />
            </Box>
        </Box>
    );
};

export default TasksResultPage;
