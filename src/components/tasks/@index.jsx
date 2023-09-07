import {
    Box,
    Button,
    createTheme,
    TextField,
    ThemeProvider,
    Typography,
} from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../../contexts/TasksContextProvider';
import ContinueSentence from './tasksType/ContinueSentence';
import FillInps from './FillInps';
import Sentence from './tasksType/Sentence';
import WordFind from './WordFind';
import { useAuth } from '../../contexts/AuthContextProvider';

const mainBox = {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 0',
};

const casesBox = {
    width: '40%',
    maxWidth: '300px',
    height: '7vh',
    minHeight: '50px',
    backgroundColor: '#C5E5E2',
    color: '#006D77',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1% 2% 1% 0',
    cursor: 'pointer',
    transition: '150ms',
    fontWeight: '600',
    '&:hover': {
        backgroundColor: '#9bd0cb',
    },
};
const casesMainBox = {
    width: '100%',
    height: '100%',
    marginTop: '20px',
};

const theme = createTheme({
    palette: {
        secondary: {
            main: '#006D77',
        },
    },
});

const Tasks = () => {
    const {
        handleTask,
        oneCase,
        taskProgress,
        handleCase,
        cases,
        tasks,
        sent,
        fillInps,
        wordFind,
        handleAnswer,
        getAnswers,
        answers,
    } = useTasks();
    const { isTeacher } = useAuth();

    const result = answers.slice(answers.length - 3, answers.length);

    const navigate = useNavigate();

    useEffect(() => {
        handleTask();
        handleCase();
    }, []);

    let formData = new FormData();
    formData.append('answer', wordFind);
    formData.append('tasks', 2);

    let formData2 = new FormData();
    formData2.append('answer', `${fillInps.first} , ${fillInps.second}`);
    formData2.append('tasks', 3);

    let formData3 = new FormData();
    formData3.append('answer', `${sent.join()}`);
    formData3.append('tasks', 4);

    const sendAnswers = () => {
        handleAnswer(formData);
        handleAnswer(formData2);
        handleAnswer(formData3);
        getAnswers();
    };

    const alertAnswers = () => {
        alert(result[0]?.answer + '->' + result[0]?.accepted);
        alert(result[1]?.answer + '->' + result[1]?.accepted);
        alert(result[2]?.answer + '->' + result[2]?.accepted);
    };

    const [doneTasks, setDoneTasks] = useState(0);

    const [countStyle, setCountStyle] = useState('');
    // console.log(cases);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={mainBox}>
                <h1 style={{ color: '#006D77' }}>Cases</h1>
                <Box style={casesMainBox}>
                    {cases[0]?.case_tasks?.map((e, key) => {
                        if (e.title === 'vocabulary') return null;

                        return (
                            <Box
                                key={e.id}
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                <Box
                                    sx={casesBox}
                                    onClick={() =>
                                        navigate(`/task/case/${e.id}/task/1`)
                                    }
                                >
                                    {e.title.charAt(0).toUpperCase() +
                                        e.title.slice(1)}{' '}
                                </Box>
                                {e.passed_quantity === e.quantity_task ? (
                                    <p style={{ color: '#006D77' }}>
                                        {e?.passed_quantity}/{e.quantity_task}
                                    </p>
                                ) : (
                                    <p style={{ color: '#E29578' }}>
                                        {e?.passed_quantity}/{e.quantity_task}
                                    </p>
                                )}
                                {/* <p>{taskProgress[key]?.doneTasks}/{e.quantity_task}</p> */}
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Tasks;
