import { Box } from '@mui/material';
import React from 'react';
import TasksResult from '../components/tasks/TasksResult';
import Sidebar from '../components/Sidebar'
import { useTasks } from '../contexts/TasksContextProvider';
import { useEffect } from 'react';
const TasksResultPage = () => {


    const {getAnswers , answers} = useTasks()


useEffect(()=>{
    getAnswers();
    console.log(answers);
},[])


    return (
        <Box sx={{
            height: '100vh',
            // overflowY: 'hidden',
            display: 'flex',
          }}>
          <Sidebar />
            
            <Box>
            <TasksResult/>    
            </Box>  
    
          </Box>
    );
};

export default TasksResultPage;