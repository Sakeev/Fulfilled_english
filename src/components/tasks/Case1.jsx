// import { Box, Button, LinearProgress, TextField } from '@mui/material';
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
import Dropdown from './tasksType/DropDown';
import Table from './tasksType/Table';

import './Case1.css';

const Case1 = () => {
    const { id, task_id } = useParams();
    const [compl, setCompl] = useState([]);
    const inputValuesHook = useState({});

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

    const getVocabulary = () => {
        if (cases.length === 0) return null;

        let vocabulary;

        cases[0]?.case_tasks.forEach((caseTask) => {
            if (caseTask.title === 'vocabulary') vocabulary = caseTask;
        });

        return vocabulary || null;
    };

    useEffect(() => {
        singleCase(id);
        if (oneCase?.passed_quantity === oneCase?.quantity_task) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [oneCase?.passed_quantity]);

    let component = null;

    switch (caseDetail?.implemented_case) {
        case 'missing word':
            component = (
                <Inputs
                    inputValuesHook={inputValuesHook}
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
        case 'drop down':
            component = (
                <Dropdown
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={caseDetail}
                />
            );
            break;
        case 'table':
            component = (
                <Table
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

    // console.log(caseDetail);

    const vocabulary = getVocabulary();

    return (
        <div className="case1-hw-page">
            <SideBar />
            <div className="case1-task-container">
                <div className="vocabulary-box-wrapper">
                    {vocabulary ? (
                        <>
                            <h2>Vocabulary</h2>
                            <div className="vocabulary-box">
                                {vocabulary.tasks[0]?.description.map(
                                    (word, index) => (
                                        <p
                                            className="vocabulary-word"
                                            key={index}
                                        >
                                            {word.toLowerCase()}
                                        </p>
                                    )
                                )}
                            </div>{' '}
                        </>
                    ) : null}
                </div>
                <div className="case1-task">
                    <p className="task-condition">
                        {caseInfo.tasks?.[task_id - 1].condition}
                    </p>
                    {component}
                    <PagBar
                        count={count}
                        sx={{ alignSelf: 'center' }}
                        inputValuesHook={inputValuesHook}
                    />
                </div>
            </div>
        </div>
    );
};

export default Case1;
