import BuildSentences from './resultDisplayTasks/BuildSentences';
import { useTasks } from '../../contexts/TasksContextProvider';
import ConnectWords from './resultDisplayTasks/ConnectWords';
import BuildDialog from '../tasks/tasksType/BuildDialog';
import Dropdown from '../tasks/tasksType/DropDown';
import Inputs from './resultDisplayTasks/Inputs';
import Table from './resultDisplayTasks/Table';
import Images from './resultDisplayTasks/Images';

const RenderTask = ({ task, id, task_id, displayDataType = null }) => {
    const { handleCaseDetail, handleAnswer, caseInfo } = useTasks();

    if (task === null) return <></>;
    if (!task.answers[task.answers.length - 1])
        return <h2>This task hasn't done yet</h2>;

    switch (task?.implemented_case) {
        case 'missing word':
            return (
                <Inputs
                    task={task}
                    answer={task.answers[task.answers.length - 1] || null}
                    displayDataType={displayDataType}
                />
            );

        case 'build sentence':
            return (
                <BuildSentences
                    task={task}
                    answer={task.answers[task.answers.length - 1] || null}
                    displayDataType={displayDataType}
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
                <ConnectWords
                    task={task}
                    answer={task.answers[task.answers.length - 1] || null}
                    displayDataType={displayDataType}
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
                    task={task}
                    answer={task.answers[task.answers.length - 1] || null}
                    displayDataType={displayDataType}
                />
            );

        case 'work with images':
            return (
                <Images
                    task={task}
                    answer={task.answers[task.answers.length - 1] || null}
                    displayDataType={displayDataType}
                />
            );

        default:
            return <></>;
    }
};

export default RenderTask;
