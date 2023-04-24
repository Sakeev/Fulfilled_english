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
import BuildDialog from './tasksType/BuildDialog';
import Dropdown from './tasksType/Dropdown';

import './Case1.css';

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
        caseDetail,
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
        case 'build sentence':
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
        case 'build dialog':
            component = (
                <BuildDialog
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
        case 'connect words':
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
        case 'drop down': // ! temporary
            component = (
                <Dropdown
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                />
            );
            break;

        default:
            component = null;
            break;
    }

    return (
        <div className="case1-hw-page">
            <SideBar />
            <div className="case1-task-container">
                <div className="case1-task">
                    {component}
                    <PagBar count={count} sx={{ alignSelf: 'center' }} />
                </div>
            </div>
        </div>
    );
};

export default Case1;
