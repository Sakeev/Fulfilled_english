import { useTasks } from '../../contexts/TasksContextProvider';
import { useState } from 'react';

import ContinueSentence from '../tasks/tasksType/ContinueSentence';
import BuildDialog from '../tasks/tasksType/BuildDialog';
import Sentence from '../tasks/tasksType/Sentence';
import Dropdown from '../tasks/tasksType/DropDown';
import Inputs from '../tasks/tasksType/Inputs';
import Table from '../tasks/tasksType/Table';

export const useRenderTask = (task, id, task_id, displayDataType = null) => {
    const { getTaskDetails, handleAnswer, caseInfo } = useTasks();
    const inputValuesHook = useState({});

    if (task === null) return <></>;
    if (task.answers[task.answers.length - 1])
        return <h2>This task hasn't done yet</h2>;

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
                    taskDetails={task}
                    getTaskDetails={getTaskDetails}
                    answer={task.answers[task.answers.length - 1] || null}
                    displayDataType={displayDataType}
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
                    taskDetails={task}
                    getTaskDetails={getTaskDetails}
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
                    taskDetails={task}
                    getTaskDetails={getTaskDetails}
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
                    taskDetails={task}
                    getTaskDetails={getTaskDetails}
                />
            );

        case 'drop down':
            return (
                <Dropdown
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    taskDetails={task}
                />
            );

        case 'table':
            return (
                <Table
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    taskDetails={task}
                />
            );

        default:
            return <></>;
    }
};
