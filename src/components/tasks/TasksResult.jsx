import { TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTasks } from '../../contexts/TasksContextProvider';

const TasksResult = () => {

    const [task , setTask] = useState([])

    const {getAnswers , answers , handleTask , tasks} = useTasks();
    useEffect(()=>{
        getAnswers();
        handleTask();
        setTask(tasks)
        console.log(answers);    
    },[])
    console.log(task);

    return (
        <>
            {tasks?.map((item)=>(
                <>
                <div><h1>Task{item.id}</h1></div>
  <div> <p style={{color:"blue"}}>{item.right_answer}</p> - right answer</div>
  <div><p style={{color:"red"}}> {item.answers[item.answers.length-1]?.answer}</p> - your answer</div>
  </>
))}
        </>
    );
};

export default TasksResult;