import ContinueImageWord from './resultDisplayTasks/ContinueImageWord';
import DescribeImages from './resultDisplayTasks/DescribeImages';
import { useTasks } from 'contexts/TasksContextProvider';
import ConnectWords from './resultDisplayTasks/ConnectWords';
import Inputs from './resultDisplayTasks/Inputs';
import {
    Dropdown,
    // Inputs,
    WriteSentences,
    Table,
    BuildDialog,
    BuildSentences,
} from 'components/tasks/tasksType';

const RenderTask = ({ task, id, task_id, displayDataType = null }) => {
    const { getTaskDetails, handleAnswer, caseInfo } = useTasks();

    if (
        task === null ||
        (task.right_answer === '' && displayDataType === 'teacher')
    )
        return <></>;
    if (!task.answers[task.answers.length - 1])
        return <h2>This task hasn't done yet</h2>;

    let component = null;

    switch (task?.implemented_case) {
        case 'missing word':
            component = (
                <Inputs
                    task={task}
                    answer={task.answers[task.answers.length - 1] || null}
                    displayDataType={displayDataType}
                />
            );
            break;

        case 'build sentence':
            component = (
                <BuildSentences
                    task={task}
                    answer={task.answers[task.answers.length - 1] || null}
                    displayDataType={displayDataType}
                />
            );
            break;

        case 'build dialog':
            component = (
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
            break;

        case 'connect words':
            component = (
                <ConnectWords
                    task={task}
                    answer={task.answers[task.answers.length - 1] || null}
                    displayDataType={displayDataType}
                />
            );
            break;

        case 'drop down':
            component = (
                <Dropdown
                    task_id={task_id}
                    handleAnswer={handleAnswer}
                    caseInfo={caseInfo}
                    taskDetails={task}
                />
            );
            break;

        case 'table':
            component = (
                <Table
                    task={task}
                    answer={task.answers[task.answers.length - 1] || null}
                    displayDataType={displayDataType}
                />
            );
            break;

        case 'describe image':
            component = (
                <DescribeImages
                    task={task}
                    answer={task.answers[task.answers.length - 1] || null}
                    displayDataType={displayDataType}
                />
            );
            break;
        case 'work with images':
            component = (
                <ContinueImageWord
                    task={task}
                    answer={task.answers[task.answers.length - 1] || null}
                    displayDataType={displayDataType}
                />
            );
            break;

        case 'write sentences with given info':
            component = (
                <WriteSentences
                    task={task}
                    answer={task.answers[task.answers.length - 1] || null}
                    displayDataType={displayDataType}
                />
            );
            break;

        default:
            component = null;
    }

    return (
        <div className={`hw-results-${displayDataType}`}>
            <div className="hw-results-task">
                {component}
                <p className="hw-results-accuracy">
                    {displayDataType === 'teacher' ? 'O' : 'X'}
                </p>
            </div>
        </div>
    );
};

export default RenderTask;
