import { useTasks } from '../../contexts/TasksContextProvider';
import { useState } from 'react';

import ContinueSentence from '../tasks/tasksType/ContinueSentence';
import BuildDialog from '../tasks/tasksType/BuildDialog';
import Sentence from '../tasks/tasksType/Sentence';
import Dropdown from '../tasks/tasksType/DropDown';
import Inputs from '../tasks/tasksType/Inputs';
import Table from '../tasks/tasksType/Table';

export const useRenderTask = (task, id, task_id) => {
    const { handleCaseDetail, handleAnswer, caseInfo } = useTasks();
    const inputValuesHook = useState({});

    console.log(task);

    if (task === null) return <></>;

    switch (task?.implemented_case) {
        case 'missing word':
            return (
                <Inputs
                    inputValuesHook={inputValuesHook}
                    descr={task?.description}
                    id={id}
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={task}
                    handleCaseDetail={handleCaseDetail}
                    answers={task.answers[0]}
                />
            );

        case 'build sentence':
            return (
                <Sentence
                    descr={task?.description}
                    id={id}
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={task}
                    handleCaseDetail={handleCaseDetail}
                />
            );

        case 'build dialog':
            return (
                <BuildDialog
                    descr={task?.description}
                    id={id}
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={task}
                    handleCaseDetail={handleCaseDetail}
                />
            );

        case 'connect words':
            return (
                <ContinueSentence
                    descr={task?.description}
                    id={id}
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={task}
                    handleCaseDetail={handleCaseDetail}
                />
            );

        case 'drop down':
            return (
                <Dropdown
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={task}
                />
            );

        case 'table':
            return (
                <Table
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    caseDetail={task}
                />
            );

        default:
            return <></>;
    }
};
