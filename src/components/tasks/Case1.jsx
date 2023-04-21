import { Box, Button, LinearProgress, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../../contexts/TasksContextProvider';
import ContinueSentence from './tasksType/ContinueSentence';
import PagBar from './PagBar';
import Progress from './Progress';
import WordFind from './WordFind';
import SideBar from '../Sidebar';
import { margin, width } from '@mui/system';
import Inputs from '../tasks/tasksType/Inputs';
import Sentence from './tasksType/Sentence';
import Dropdown from './tasksType/Dropdown';

const caseDetail = {
    answers: [],
    audio: '',
    case_work: 1,
    correct_answers: 0,
    description:
        'The __drop__ King is a cruise ship. It sailing __drop__ the Caribbean. There are a __drop__ of tourists on the ship.',
    flag: 0,
    id: 1,
    image: null,
    implemented_case: 'select from dropdown',
    is_playing: false,
    lessons: 1,
    passed: 0,
    right_answer:
        'The Sun King is a cruise ship. It sailing around the Caribbean. There are a lot of tourists on the ship.',
    title: 'lesson-1 1',
    dropdowns: [
        ['Moon', 'Star', 'Sun'],
        ['around', 'between', 'near'],
        ['some', 'lot', 'many'],
    ],
};

// const test = [
//     { dropNumber: '__drop1__', options: ['go', 'say', 'walk'] },
//     { dropNumber: '__drop1__', options: ['go', 'say', 'walk'] },
// ];

const Case1 = () => {
    const { id, task_id } = useParams();
    const [compl, setCompl] = useState([]);

    const {
        handleCaseDetail,
        progObj,
        getProgress,
        handleCase,
        cases,
        editProgress,
        taskProgress,
        countTasksProgress,
        // caseDetail,
        singleCase,
        oneCase,
        handleAnswer,
        infoCase,
        caseInfo,
    } = useTasks();
    const [count, setCount] = useState(0);
    const { tasks } = caseDetail;
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        infoCase(id);
        handleCase();
    }, []);

    // console.log(caseInfo);

    const checkCompl = () => {
        handleCase();
        if (oneCase?.passed_quantity == oneCase?.quantity_task) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    useEffect(() => {
        handleCaseDetail(id, task_id);
    }, [id, task_id]);

    useEffect(() => {
        singleCase(id);
        setCount(oneCase?.quantity_task);
    }, [oneCase?.quantity_task]);

    const [answer, setAnswer] = useState('');

    const answerObj = {
        answers: answer,
    };

    const boxStyle = {
        display: 'flex',
        marginLeft: '10%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    };
    const taskBoxStyle = {
        width: '50vw',
        height: '35vw',
        border: '2px solid #006D77',
        borderRadius: '22px',
        margin: '3%',
    };
    const checkRes = (newElement) => {
        const newCompl = [...compl, newElement];
        setCompl(newCompl);
    };

    useEffect(() => {
        singleCase(id);
        if (oneCase?.passed_quantity === oneCase?.quantity_task) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [oneCase?.passed_quantity]);

    // console.log(caseInfo);

    let component = null;

    // console.log(caseDetail);

    switch (caseDetail?.implemented_case) {
        case 'missing word':
            component = (
                <Inputs
                    descr={caseDetail?.description}
                    id={id}
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                    handleCaseDetail={handleCaseDetail}
                />
            );
            break;
        case 'build ':
            component = (
                <Sentence
                    descr={caseDetail?.description}
                    id={id}
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                    handleCaseDetail={handleCaseDetail}
                />
            );

            break;
        case 'build sentence':
            component = (
                <ContinueSentence
                    descr={caseDetail?.description}
                    id={id}
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                    handleCaseDetail={handleCaseDetail}
                />
            );

            break;
        case 'select from dropdown': // ! temporary
            component = <Dropdown caseDetail={caseDetail} />;

            break;
        default:
            component = null;
            break;
    }

    return (
        <>
            {component}
            <PagBar count={count} sx={{ alignSelf: 'center' }} />
        </>
    );
};

export default Case1;
